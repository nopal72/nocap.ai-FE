import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Konfigurasi worker dengan handler yang sudah ada
export const worker = setupWorker(...handlers);