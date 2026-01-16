"use client";

import GameEngine from '../components/GameEngine';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">BEAR SKI GAME</h1>
          <p className="text-slate-400">Eagle Hill Downhill • v4.0</p>
        </div>

        <GameEngine />

        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Made by Bear & Dad</p>
        </div>
      </div>
    </main>
  );
}
