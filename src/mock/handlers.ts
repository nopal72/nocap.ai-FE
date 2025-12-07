import { http, HttpResponse } from 'msw';

import user from './data/userData.json';
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;

export const handlers = [

  // mockung sign-in endpoint
  http.post(`${API_BASE_URL}/auth/sign-in/email`, () => {
    console.log("Mocked sign-in endpoint called");
    return HttpResponse.json(user);
  }),

  // mocking sign-up endpoint
  http.post(`${API_BASE_URL}/auth/sign-up/email`, async ({ request }) => {    
    const newUserRequest = await request.json() as { email: string; name: string; image?: string };
    console.log("Mocked sign-up endpoint called with data:", newUserRequest);

    // Simulate an error case if the email is already "in use"
    if (newUserRequest.email === 'used@example.com') {
      return HttpResponse.json(
        { message: 'Email already in use' },
        { status: 409 } // 409 Conflict is a common status for this error
      );
    }

    // Simulate a successful registration
    const now = new Date().toISOString();
    const successResponse = {
      token: "MOCK_SESSION_JWT_TOKEN", // Session token is issued upon successful signup
      user: {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`, // Generate a random user ID
        email: newUserRequest.email,
        name: newUserRequest.name,
        image: newUserRequest.image || null,
        emailVerified: false, // Email is not verified right after signup
        createdAt: now,
        updatedAt: now,
      }
    };

    return HttpResponse.json(successResponse, { status: 201 }); // 201 Created
  }),

  // mocking sign-out endpoint
  http.post(`${API_BASE_URL}/auth/sign-out`, () => {
    console.log("Mocked sign-out endpoint called");
    return HttpResponse.json({ message: 'Signed out successfully' });
  }),

  // =================================================================
  // == IMAGE PROCESSING HANDLERS
  // =================================================================

  /**
   * Handler for getting a pre-signed URL to upload an image.
   * Simulates creating a temporary, secure URL for direct client-side uploads.
   */
  http.post(`${API_BASE_URL}/image/get-presign-url`, async ({ request }) => {
    console.log("Mocked get-presign-url endpoint called");

    // 1. Check for authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse('Unauthorized', { status: 401 });
    }

    const { contentType, fileName } = await request.json() as { contentType: string, fileName: string };

    // 2. Simulate an error for unsupported content types
    if (contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/webp') {
      return HttpResponse.json({ message: 'Unsupported content type' }, { status: 400 });
    }

    // 3. Simulate a successful response
    const randomKey = `users/usr_123/posts/${Date.now()}-${fileName}`;
    const successResponse = {
      uploadUrl: `https://mock-bucket.s3.amazonaws.com/${randomKey}?is-upload-url=true&Signature=...`,
      fileKey: randomKey,
      accessUrl: `https://mock-bucket.s3.amazonaws.com/${randomKey}?is-access-url=true&Signature=...`,
      expiresIn: 300, // 5 minutes
      maxSize: 5242880, // 5 MB
    };

    return HttpResponse.json(successResponse);
  }),

  /**
   * Handler for generating insights from an uploaded image.
   * Simulates AI analysis for curation, captions, songs, etc.
   */
  http.post(`${API_BASE_URL}/generate/from-image`, async ({ request }) => {
    console.log("Mocked generate-from-image endpoint called");

    // 1. Check for authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse('Unauthorized', { status: 401 });
    }

    const { fileKey } = await request.json() as { fileKey: string };

    // 2. Simulate an error if the image key is invalid/not found
    if (fileKey.includes('not-found')) {
      return HttpResponse.json({
        message: "Image URL not accessible",
        code: "IMAGE_FETCH_FAILED",
        hint: "Ensure the image is publicly accessible or provide a valid signed URL."
      }, { status: 404 });
    }

    // 3. Simulate a successful analysis response
    const successResponse = {
      curation: { isAppropriate: true, labels: ["outdoor", "landscape", "nature"], risk: "low", notes: "No sensitive content detected." },
      caption: { text: "Sunset hues over the quiet coastline.", alternatives: ["Golden hour by the sea.", "A calm evening embracing the shore."] },
      songs: [
        { title: "WHAT THE FUCK IS THISSSS", artist: "Billie Eilish", reason: "Calm coastal vibe" },
        { title: "Sunset Lover", artist: "Petit Biscuit", reason: "Warm sunset mood" }
      ],
      topics: [
        { topic: "Travel", confidence: 0.94 }, { topic: "Photography", confidence: 0.89 }, { topic: "Nature", confidence: 0.87 }
      ],
      engagement: { estimatedScore: 0.78, drivers: ["color palette", "subject clarity"], suggestions: ["Add a human subject", "Include location tag"] },
      meta: { language: "en", generatedAt: new Date().toISOString() }
    };

    return HttpResponse.json(successResponse);
  }),

  /**
   * Handler to intercept the actual file upload to the mock S3 URL.
   * This prevents the CORS error by simulating a successful upload.
   */
  http.put('https://mock-bucket.s3.amazonaws.com/*', async () => {
    console.log("Mocked S3 upload endpoint called, simulating successful upload.");
    // Simulate a delay to make the upload progress feel real
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return new HttpResponse(null, { status: 200 });
  }),

  /**
   * Handler for fetching generation history with cursor-based pagination.
   * Simulates retrieving a list of previously generated image analyses.
   */
  http.get(`${API_BASE_URL}/generate/history`, ({ request }) => {
    console.log("Mocked get-generation-history endpoint called");

    // 1. Check for authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: "Unauthorized", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    // 2. Parse query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const cursor = url.searchParams.get('cursor');

    // 3. Generate mock data
    const allItems = Array.from({ length: 50 }, (_, i) => ({
      id: `hist_${String(i + 1).padStart(3, "0")}`,
      fileKey: `users/123/posts/foto-unik-${i + 1}.jpg`,
      accessUrl: `https://my-bucket.s3.aws.com/users/123/posts/foto-unik-${i + 1}.jpg`,
      createdAt: new Date(new Date('2025-12-03T10:00:00Z').getTime() - i * 60 * 60 * 1000).toISOString(),
    }));

    // 4. Simulate pagination logic
    let startIndex = 0;
    if (cursor) {
      const cursorIndex = allItems.findIndex(item => item.id === cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const paginatedItems = allItems.slice(startIndex, startIndex + limit);
    const hasNextPage = startIndex + limit < allItems.length;
    const nextCursor = hasNextPage ? paginatedItems[paginatedItems.length - 1]?.id : null;

    // 5. Build and return the response
    const response = {
      items: paginatedItems,
      pageInfo: {
        limit: limit,
        nextCursor: nextCursor,
        hasNextPage: hasNextPage,
      },
    };

    return HttpResponse.json(response);
  }),

  /**
   * Handler for fetching detailed generation history.
   * Fetch a specific history entry with all analysis results.
   */
  http.get(`${API_BASE_URL}/generate/history/:id`, ({ params, request }) => {
    console.log("Mocked get-generation-history-detail endpoint called");

    // 1. Check for authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: "Unauthorized", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    // 2. Get history ID from params
    const { id } = params;

    // 3. Validate history ID format
    if (!id || typeof id !== 'string' || !id.startsWith('hist_')) {
      return HttpResponse.json(
        { message: "Invalid history ID", code: "INVALID_ID" },
        { status: 400 }
      );
    }

    // 4. Generate detailed data for this history entry
    // Parse the ID to get the item number (hist_001 → 1)
    const itemNumber = parseInt(id.replace('hist_', ''), 10);
    if (isNaN(itemNumber) || itemNumber < 1 || itemNumber > 50) {
      return HttpResponse.json(
        { message: "History entry not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    // 5. Generate base date for this item (same as in history list)
    const baseDate = new Date('2025-12-03T10:00:00Z');
    const itemDate = new Date(baseDate.getTime() - (itemNumber - 1) * 60 * 60 * 1000);

    // 6. Build detailed response based on the analysis type
    const detailedItem = {
      id: id,
      fileKey: `users/123/posts/foto-unik-${itemNumber}.jpg`,
      accessUrl: `https://my-bucket.s3.aws.com/users/123/posts/foto-unik-${itemNumber}.jpg`,
      tasks: ["curation", "caption", "songs", "topics", "engagement"],
      curation: {
        isAppropriate: true,
        labels: ["outdoor", "landscape", "nature"],
        risk: "low",
        notes: "No sensitive content detected."
      },
      caption: {
        text: `Sunset hues over the quiet coastline - Image ${itemNumber}.`,
        alternatives: [
          `Golden hour by the sea - Image ${itemNumber}.`,
          `A calm evening embracing the shore - Image ${itemNumber}.`
        ]
      },
      songs: [
        {
          title: "Ocean Eyes",
          artist: "Billie Eilish",
          reason: "Calm coastal vibe"
        },
        {
          title: "Sunset Lover",
          artist: "Petit Biscuit",
          reason: "Warm sunset mood"
        }
      ],
      topics: [
        { topic: "Travel", confidence: 0.94 },
        { topic: "Photography", confidence: 0.89 },
        { topic: "Nature", confidence: 0.87 }
      ],
      engagement: {
        estimatedScore: 0.75 + (itemNumber % 20) * 0.01, // Vary score based on item number
        drivers: ["color palette", "subject clarity", "composition"],
        suggestions: ["Add a human subject", "Include location tag", "Use relevant hashtags"]
      },
      meta: {
        language: "en",
        generatedAt: itemDate.toISOString()
      }
    };

    // 7. Build and return the response
    const response = {
      item: detailedItem
    };

    return HttpResponse.json(response);
  }),
];