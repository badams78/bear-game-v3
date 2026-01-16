"use client";

import { useEffect, useState } from 'react';
import { GameStatus } from '../hooks/useGamePhysics';

interface ResultOverlayProps {
    status: GameStatus;
    onRestart: () => void;
    onStart: () => void;
}

export default function ResultOverlay({ status, onRestart, onStart }: ResultOverlayProps) {
    if (status === 'RACING') return null;

    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in">
            <div className="bg-slate-900 border-2 border-slate-700 p-8 rounded-xl max-w-md text-center shadow-2xl transform transition-all scale-100 relative">

                {status === 'START_SCREEN' && (
                    <>
                        <h1 className="text-5xl font-bold text-white mb-2 tracking-tighter italic">EAGLE HILL<br /><span className="text-green-500">DOWNHILL</span></h1>
                        <p className="text-slate-400 mb-8 mt-4 text-lg">Race the Cardigan Kid to the Lodge.</p>

                        <div className="space-y-4">
                            <button
                                onClick={onStart}
                                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded text-xl transition-colors shadow-lg shadow-green-900/20"
                            >
                                START RACE
                            </button>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">
                                Controls: Arrows to Steer • Down to Tuck
                            </p>
                        </div>
                    </>
                )}
                {status === 'FINISHED' && (
                    <>
                        <div className="text-yellow-500 text-6xl mb-4">🏆</div>
                        <h2 className="text-4xl font-bold text-white mb-2 uppercase tracking-tighter">Finished!</h2>
                        <p className="text-slate-400 mb-8">You survived Eagle Hill.</p>

                        <button
                            onClick={onRestart}
                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded text-lg transition-colors"
                        >
                            RACE AGAIN
                        </button>
                    </>
                )}

                {status === 'CRASHED' && (
                    <>
                        <div className="text-red-500 text-6xl mb-4">💥</div>
                        <h2 className="text-4xl font-bold text-white mb-2 uppercase tracking-tighter">WIPEOUT!</h2>
                        <p className="text-slate-400 mb-8">You hit a tree. Use Down Arrow to tuck safely on straights only.</p>

                        <button
                            onClick={onRestart}
                            className="w-full py-4 bg-crimson hover:bg-red-800 text-white font-bold rounded text-lg transition-colors"
                        >
                            TRY AGAIN
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
