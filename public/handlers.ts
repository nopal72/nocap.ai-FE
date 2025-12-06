import { http, HttpResponse, type PathParams } from 'msw';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface SignInRequestBody {
  email?: string;
  password?: string;
  callbackURL?: string | null;
  rememberMe?: boolean | null;
}

export const handlers = [
  // Intercept (cegat) permintaan POST ke endpoint login
  http.post(`${baseURL}/auth/sign-in/email`, async ({ request }) => {
    const body = (await request.json()) as SignInRequestBody;

    // --- Skenario Gagal: Kredensial tidak valid ---
    if (body.email !== 'user@example.com' || body.password !== 'StrongP@ssw0rd!') {
      console.log('[MSW] Login failed for:', body.email);
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 } // 401 Unauthorized
      );
    }

    // --- Skenario Sukses: Redirect (jika callbackURL diberikan) ---
    if (body.callbackURL) {
      console.log('[MSW] Login successful (redirect flow) for:', body.email);
      return HttpResponse.json(
        {
          redirect: true,
          token: null,
          user: null,
          url: body.callbackURL,
        },
        { status: 200 }
      );
    }

    // --- Skenario Sukses: Sesi (default) ---
    console.log('[MSW] Login successful (session flow) for:', body.email);
    const now = new Date().toISOString();
    return HttpResponse.json(
      {
        redirect: false,
        token: 'SESSION_JWT_TOKEN_FROM_MSW',
        user: {
          id: 'usr_123',
          name: 'Jane Doe',
          email: 'user@example.com',
          emailVerified: false,
          image: 'https://i.pravatar.cc/150?u=usr_123',
          createdAt: now,
          updatedAt: now,
        },
        url: null,
      },
      { status: 200 }
    );
  }),
];