/**
 * ⚡ QUICK REFERENCE - JAWABAN CEPAT
 * ═════════════════════════════════════════════════════════════
 * 
 * 
 * Q: Kenapa data list historynya bisa generate secara otomatis?
 * ─────────────────────────────────────────────────────────────
 * 
 * A: Karena ada MSW Handler yang intercept request dan generate data.
 * 
 * 
 * Q: Dimana fungsi yang menangani hal itu?
 * ─────────────────────────────────────────
 * 
 * A: Di src/mock/handlers.ts, baris 145-196
 *    Tepatnya baris 163 adalah generator-nya:
 * 
 *    const allItems = Array.from({ length: 50 }, (_, i) => ({
 *      id: `hist_${String(i + 1).padStart(3, "0")}`,
 *      fileKey: `users/123/posts/foto-unik-${i + 1}.jpg`,
 *      accessUrl: `https://my-bucket.s3.aws.com/users/123/posts/foto-unik-${i + 1}.jpg`,
 *      createdAt: new Date(base_time - i hours).toISOString(),
 *    }));
 * 
 * 
 * Q: Bagaimana cara kerjanya?
 * ────────────────────────────
 * 
 * A: Langkah-langkah:
 *    1. User buka history page
 *    2. Hook (use-history) call apiClient.get('/generate/history')
 *    3. MSW Handler intercept request
 *    4. Handler generate 50 items dengan Array.from()
 *    5. Handler slice 20 items dari 50 items
 *    6. Handler return 20 items + pagination info
 *    7. Hook update state dengan items
 *    8. UI render 20 items sebagai cards
 * 
 * 
 * Q: Kenapa di-generate otomatis?
 * ────────────────────────────────
 * 
 * A: Karena ini MOCK DATA untuk development/testing.
 *    Tidak ada real backend, jadi MSW simulator generate data.
 * 
 * 
 * Q: Dari mana data 50 items itu?
 * ────────────────────────────────
 * 
 * A: Array.from() membuat array dengan 50 element.
 *    Setiap element adalah object dengan 4 properties:
 *    - id (hist_001, hist_002, ..., hist_050)
 *    - fileKey (path ke file)
 *    - accessUrl (URL untuk fetch image)
 *    - createdAt (timestamp)
 * 
 * 
 * Q: Terus, kenapa hanya 20 items yang ditampilkan?
 * ──────────────────────────────────────────────────
 * 
 * A: Karena limit=20 (default value).
 *    Handler slice() 50 items menjadi 20 items per request.
 *    Ini adalah pagination mechanism.
 * 
 * 
 * Q: Gimana kalau user click "Load More"?
 * ───────────────────────────────────────
 * 
 * A: Langkah-langkah:
 *    1. UI kirim request dengan cursor=hist_020
 *    2. Handler cari index hist_020 → 19
 *    3. Handler slice dari index 20 sampai 40
 *    4. Handler return 20 items berikutnya
 *    5. UI append 20 items ke existing items
 *    6. Total items sekarang 40
 *    Repeat sampai semua 50 items habis
 * 
 * 
 * Q: Ini real data atau mock data?
 * ────────────────────────────────
 * 
 * A: MOCK DATA untuk development.
 *    Production akan connect ke real backend API.
 * 
 * 
 * Q: File-file yang penting?
 * ──────────────────────────
 * 
 * A: 1. src/mock/handlers.ts (baris 145-196)    ← GENERATOR
 *    2. src/hooks/use-history.ts                ← FETCH & STATE MANAGEMENT
 *    3. src/lib/api-client.ts                   ← HTTP CLIENT
 *    4. src/app/(dashboard)/history/page.tsx    ← UI
 * 
 * 
 * Q: Apa yang menjadi "generator" tepatnya?
 * ──────────────────────────────────────────
 * 
 * A: Baris 163 di src/mock/handlers.ts:
 * 
 *    const allItems = Array.from(
 *      { length: 50 },              ← Generate 50 items
 *      (_, i) => ({                 ← Loop i = 0 sampai 49
 *        id: `hist_${i+1}`,         ← Create ID
 *        fileKey: `...${i+1}.jpg`,  ← Create fileKey
 *        accessUrl: `...${i+1}.jpg`,← Create accessUrl
 *        createdAt: ...             ← Create timestamp
 *      })
 *    )
 * 
 * 
 * Q: Berapa kali data di-generate?
 * ────────────────────────────────
 * 
 * A: Setiap kali request ke /generate/history endpoint.
 *    - First page load: 1x (generate 50, return 20)
 *    - Click "Load More": 1x lagi (generate 50 baru, return next 20)
 *    - Click "Load More" again: 1x lagi (dan seterusnya)
 * 
 * 
 * Q: Jadi data selalu baru setiap request?
 * ────────────────────────────────────────
 * 
 * A: Ya, data fresh 50 items di-generate setiap request.
 *    Tapi ID selalu sama (hist_001...hist_050) karena deterministic.
 * 
 * 
 * RINGKASAN:
 * ═════════════════════════════════════════════════════════════
 * 
 * Lokasi: src/mock/handlers.ts (baris 163)
 * 
 * Generator: Array.from({ length: 50 }, (_, i) => ({...}))
 * 
 * Cara kerja:
 * 1. Generate 50 fake items
 * 2. Slice 20 items untuk setiap request
 * 3. Handle pagination dengan cursor
 * 4. Return response JSON ke client
 * 
 * Flow: UI → Hook → apiClient → MSW Handler → Generate → Return → UI
 * 
 * Ini mock data untuk development/testing saja.
 */
