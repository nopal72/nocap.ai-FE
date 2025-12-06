export async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./browser');

  // `worker.start()` akan mendaftarkan Service Worker dan siap mencegat permintaan.
  return worker.start();
}