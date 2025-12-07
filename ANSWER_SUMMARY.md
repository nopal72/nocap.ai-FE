/**
 * 🎯 JAWABAN SINGKAT
 * ═════════════════
 * 
 * PERTANYAAN: "Kenapa data list historynya bisa generate secara otomatis? 
 *              Dimana fungsi yang menangani hal itu?"
 * 
 * JAWABAN:
 * ────────
 * 
 * Data di-GENERATE OTOMATIS oleh MSW Handler di:
 * 📁 File: src/mock/handlers.ts
 * 📍 Baris: 145-196 (tepatnya baris 163-169)
 * 
 * Fungsi generator:
 * ┌─────────────────────────────────────────────────────────────┐
 * │ const allItems = Array.from({ length: 50 }, (_, i) => ({   │
 * │   id: `hist_${String(i + 1).padStart(3, "0")}`,            │
 * │   fileKey: `users/123/posts/foto-unik-${i + 1}.jpg`,       │
 * │   accessUrl: `https://my-bucket.s3.aws.com/.../...jpg`,    │
 * │   createdAt: new Date(baseTime - i * 60 * 60 * 1000)...,   │
 * │ }));                                                         │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * Apa yang terjadi:
 * 1. Setiap kali user buka history page atau click "Load More"
 * 2. Frontend kirim request: GET /generate/history?limit=20
 * 3. MSW Handler intercept request
 * 4. Handler jalankan Array.from() → generate 50 items
 * 5. Handler ambil 20 items dari 50 items
 * 6. Handler kirim 20 items ke frontend
 * 7. Frontend tampilkan 20 items sebagai cards
 * 
 * 
 * ❓ KENAPA OTOMATIS?
 * ══════════════════
 * 
 * Karena:
 * 1. Ini adalah MOCK DATA untuk development/testing
 * 2. Tidak ada real backend database
 * 3. MSW interceptor setiap request dan langsung generate data
 * 4. User tidak perlu input data manual
 * 5. Simulator menjawab setiap request dengan data yang reasonable
 * 
 * 
 * 🔄 FLOW LENGKAP:
 * ════════════════
 * 
 * UI (history/page.tsx)
 *  │
 *  ↓
 * Hook (use-history.ts) → apiClient.get('/generate/history')
 *  │
 *  ↓
 * API Client (api-client.ts) → Add auth header
 *  │
 *  ↓
 * HTTP Request (GET /generate/history?limit=20)
 *  │
 *  ↓
 * MSW Handler (handlers.ts) ← INTERCEPT & GENERATE DATA HERE
 *  │
 *  ├─ Check auth header ✓
 *  ├─ Parse limit & cursor
 *  ├─ Array.from({ length: 50 }, ...) ← GENERATE 50 items
 *  ├─ slice(0, 20) ← Ambil 20 items
 *  ├─ Setup pagination info
 *  └─ Return response JSON
 *  │
 *  ↓
 * Hook (use-history.ts) → setItems(newItems)
 *  │
 *  ↓
 * UI (history/page.tsx) → displayItems.map() → Render 20 cards
 * 
 * 
 * 📊 DATA STRUKTUR:
 * ════════════════
 * 
 * Setiap item:
 * {
 *   id: "hist_001",                              // Unique identifier
 *   fileKey: "users/123/posts/foto-unik-1.jpg", // File path
 *   accessUrl: "https://my-bucket.s3.aws.com/...", // Image URL
 *   createdAt: "2025-12-03T10:00:00.000Z"       // Timestamp
 * }
 * 
 * Total di-generate sekaligus: 50 items
 * Return per request: 20 items (default, configurable)
 * Pagination method: Cursor-based (nextCursor)
 * 
 * 
 * 📝 KODE YANG PENTING:
 * ════════════════════
 * 
 * 1. GENERATOR (handlers.ts baris 163):
 *    Array.from({ length: 50 }, (_, i) => ({...}))
 *    └─ Buat 50 items dengan Array.from()
 * 
 * 2. PAGINATION (handlers.ts baris 175):
 *    const paginatedItems = allItems.slice(startIndex, startIndex + limit)
 *    └─ Ambil subset dari 50 items
 * 
 * 3. PAGINATION INFO (handlers.ts baris 179):
 *    const hasNextPage = startIndex + limit < allItems.length
 *    const nextCursor = hasNextPage ? paginatedItems[...].id : null
 *    └─ Info untuk UI apakah ada page berikutnya
 * 
 * 4. RETURN RESPONSE (handlers.ts baris 186):
 *    return HttpResponse.json({ items, pageInfo })
 *    └─ Kirim response ke client
 * 
 * 
 * 💡 ANALOGI SEDERHANA:
 * ════════════════════
 * 
 * Bayangkan ada database dengan 50 items:
 * [hist_001, hist_002, hist_003, ..., hist_050]
 * 
 * Ketika user buka history:
 * 1. Request: "Ambil history, limit 20"
 * 2. Handler: "Baik, ambil dari index 0-19"
 * 3. Return: [hist_001...hist_020]
 * 4. UI: Tampilkan 20 items, "Load More" button visible
 * 
 * Ketika user click "Load More":
 * 1. Request: "Ambil history, limit 20, cursor hist_020"
 * 2. Handler: "Baik, ambil dari index 20-39"
 * 3. Return: [hist_021...hist_040]
 * 4. UI: Append 20 items lagi, "Load More" button still visible
 * 
 * Ketika user click "Load More" lagi:
 * 1. Request: "Ambil history, limit 20, cursor hist_040"
 * 2. Handler: "Baik, ambil dari index 40-49" (hanya 10 items)
 * 3. Return: [hist_041...hist_050]
 * 4. UI: Append 10 items, "Load More" button hidden (sudah end)
 * 
 * 
 * 📂 FILES YANG PERLU DIPAHAMI:
 * ════════════════════════════
 * 
 * 1. src/mock/handlers.ts (baris 145-196)
 *    └─ Handler yang generate data
 * 
 * 2. src/hooks/use-history.ts
 *    └─ Hook yang manage state & fetch
 * 
 * 3. src/lib/api-client.ts
 *    └─ Axios instance dengan auth header
 * 
 * 4. src/app/(dashboard)/history/page.tsx
 *    └─ UI yang menampilkan data
 * 
 * 
 * ✅ CHECKLIST:
 * ═════════════
 * 
 * ✓ Data di-generate di MSW Handler (handlers.ts)
 * ✓ Generator: Array.from({ length: 50 }, ...)
 * ✓ Setiap request, 50 items fresh di-generate
 * ✓ Pagination: slice() based on cursor
 * ✓ Return: 20 items per request + pagination info
 * ✓ Flow: UI → Hook → apiClient → Handler → Generate → Return → UI
 * ✓ Ini MOCK DATA, bukan real database
 * ✓ Production akan ganti dengan real backend API
 */
