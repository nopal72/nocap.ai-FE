import { Suspense } from 'react';
import ParticleCanvas from '@/components/ui/particlecanvas';
import AuthCallbackContent from './AuthCallbackContent';

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen w-full bg-[#06060A] relative overflow-hidden flex items-center justify-center">
      <ParticleCanvas />
      <main className="relative z-20 w-full max-w-md mx-6 text-center">
        <Suspense fallback={<LoadingState />}>
          <AuthCallbackContent />
        </Suspense>
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-gradient-to-br from-[#1a2332] to-[#0f1419] rounded-3xl p-12 border border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
      <h1 className="text-2xl font-bold text-white mb-4">Authenticating...</h1>
      <p className="text-gray-400">Please wait while we securely log you in.</p>
    </div>
  );
}
