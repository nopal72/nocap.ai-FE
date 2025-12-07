/**
 * FITUR HISTORY DETAIL - DOKUMENTASI
 * ═══════════════════════════════════════════════════════════════
 * 
 * 
 * OVERVIEW:
 * ─────────
 * 
 * User dapat mengklik salah satu history card dari History Page,
 * kemudian akan di-redirect ke Result Page dengan menampilkan
 * detail analysis dari history entry tersebut.
 * 
 * 
 * FLOW:
 * ─────
 * 
 * 1. History Page (src/app/(dashboard)/history/page.tsx)
 *    ├─ User lihat list of history cards
 *    ├─ User click salah satu card
 *    └─ onClick: router.push(`/result?historyId=${item.id}`)
 * 
 * 2. Result Page (src/app/(dashboard)/result/page.tsx)
 *    ├─ Check query param historyId
 *    ├─ Fetch detail dari useHistoryDetail hook
 *    ├─ Convert detail ke AnalysisResult format
 *    └─ Render same UI seperti analyze flow
 * 
 * 3. API Flow
 *    ├─ useHistoryDetail hook → fetchDetail(historyId)
 *    ├─ apiClient.get('/generate/history/{id}')
 *    ├─ MSW Handler intercept & generate detail data
 *    └─ Return response dengan full analysis data
 * 
 * 
 * FILES YANG DIMODIFIKASI/DIBUAT:
 * ───────────────────────────────
 * 
 * 1. ✨ BARU: src/hooks/useHistoryDetail.ts
 *    └─ Hook untuk fetch detail history entry
 *    └─ Signature: useHistoryDetail(historyId?: string)
 *    └─ Return: { item, status, error, fetchDetail, loadDetail }
 * 
 * 2. ✏️ UPDATE: src/app/(dashboard)/history/page.tsx
 *    └─ Import useRouter dari next/navigation
 *    └─ Add onClick handler ke cards: router.push(`/result?historyId=${item.id}`)
 * 
 * 3. ✏️ UPDATE: src/app/(dashboard)/result/page.tsx
 *    └─ Import useSearchParams dari next/navigation
 *    └─ Import useHistoryDetail hook
 *    └─ Handle 2 flow: dari sessionStorage (analyze) atau query param (history)
 *    └─ Add "Back to History" button di navbar jika dari history
 *    └─ Add loading & error state untuk history detail
 *    └─ Convert DetailedHistoryItem ke AnalysisResult format
 * 
 * 4. ✏️ UPDATE: src/mock/handlers.ts
 *    └─ Add handler: http.get(`${API_BASE_URL}/generate/history/:id`, ...)
 *    └─ Generate detailed analysis data untuk history entry
 *    └─ Return format sesuai dengan spec endpoint
 * 
 * 
 * ENDPOINT DETAIL:
 * ────────────────
 * 
 * GET /generate/history/{id}
 * 
 * Headers:
 *   Authorization: Bearer {token}
 * 
 * Response Success (200):
 * {
 *   "item": {
 *     "id": "hist_001",
 *     "fileKey": "users/123/posts/foto-unik-1.jpg",
 *     "accessUrl": "https://my-bucket.s3.aws.com/users/123/posts/foto-unik-1.jpg",
 *     "tasks": ["curation", "caption", "songs", "topics", "engagement"],
 *     "curation": { ... },
 *     "caption": { ... },
 *     "songs": [ ... ],
 *     "topics": [ ... ],
 *     "engagement": { ... },
 *     "meta": { ... }
 *   }
 * }
 * 
 * Response Error (401):
 * {
 *   "message": "Unauthorized",
 *   "code": "AUTH_REQUIRED"
 * }
 * 
 * 
 * HOOK SIGNATURE:
 * ───────────────
 * 
 * export const useHistoryDetail = (historyId?: string) => {
 *   const [item, setItem] = useState<DetailedHistoryItem | null>(null)
 *   const [status, setStatus] = useState<FetchStatus>('idle')
 *   const [error, setError] = useState<string | null>(null)
 * 
 *   const fetchDetail = useCallback(async (id: string) => {
 *     // Fetch detail dari /generate/history/:id
 *   }, [])
 * 
 *   const loadDetail = useCallback(async () => {
 *     // Auto-fetch jika historyId di-provide
 *   }, [historyId, fetchDetail])
 * 
 *   return { item, status, error, fetchDetail, loadDetail }
 * }
 * 
 * 
 * IMPLEMENTASI DI RESULT PAGE:
 * ─────────────────────────────
 * 
 * const searchParams = useSearchParams()
 * const historyId = searchParams.get('historyId')
 * const { item: historyDetail, status, fetchDetail } = useHistoryDetail()
 * 
 * useEffect(() => {
 *   if (historyId) {
 *     setIsFromHistory(true)
 *     fetchDetail(historyId)
 *   } else {
 *     // Load dari sessionStorage (analyze flow)
 *   }
 * }, [historyId, fetchDetail])
 * 
 * // Convert historyDetail ke AnalysisResult
 * useEffect(() => {
 *   if (historyDetail && isFromHistory) {
 *     const converted: AnalysisResult = {
 *       accessUrl: historyDetail.accessUrl,
 *       curation: historyDetail.curation,
 *       caption: historyDetail.caption,
 *       // ... konversi properties lainnya
 *     }
 *     setResult(converted)
 *   }
 * }, [historyDetail, isFromHistory])
 * 
 * 
 * HISTORY CARDS - CLICK HANDLER:
 * ──────────────────────────────
 * 
 * <div
 *   onClick={() => router.push(`/result?historyId=${item.id}`)}
 *   className="group cursor-pointer transition-all"
 * >
 *   {/* Card content */}
 * </div>
 * 
 * Ketika user click card:
 * 1. router.push navigate ke /result?historyId=hist_001
 * 2. Result page detect query param historyId
 * 3. Fetch detail data dari /generate/history/hist_001
 * 4. Render sama seperti analyze flow
 * 
 * 
 * USER EXPERIENCE:
 * ────────────────
 * 
 * 1. User buka History page → lihat list of scanned images
 * 2. User click salah satu image card
 * 3. Loading spinner ditampilkan (Loading history details...)
 * 4. Detail page load dengan analysis hasil
 * 5. UI sama seperti Result page dari analyze flow
 * 6. "Back to History" button di navbar untuk kembali
 * 
 * 
 * ERROR HANDLING:
 * ───────────────
 * 
 * Jika fetch gagal:
 * - Tampilkan error message "Failed to load history details"
 * - Provide "Go Back" button untuk user
 * 
 * Jika historyId tidak valid:
 * - MSW handler return 400 atau 404
 * - UI tampilkan error state
 * 
 * 
 * TESTING:
 * ────────
 * 
 * 1. History page:
 *    - Click pada salah satu history card
 *    - Verify router.push dijalankan dengan correct historyId
 * 
 * 2. Result page:
 *    - Check query param historyId di-extract correctly
 *    - Verify loading state ditampilkan
 *    - Verify detail data di-fetch dan di-render
 * 
 * 3. API:
 *    - Verify /generate/history/{id} endpoint return correct data
 *    - Verify auth header di-check
 *    - Verify error handling untuk invalid ID
 * 
 * 4. Navigation:
 *    - Click "Back to History" button
 *    - Verify navigate back ke history page
 * 
 * 
 * CATATAN:
 * ────────
 * 
 * ✓ Menggunakan kembali Result page → lebih efisien, tidak perlu duplicate UI
 * ✓ Support 2 flow: analyze result (sessionStorage) & history detail (query param)
 * ✓ Proper loading & error states
 * ✓ Back button untuk convenience
 * ✓ Same UI untuk consistency
 * ✓ useSearchParams untuk extract query param (client-side)
 */
