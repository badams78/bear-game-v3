"use client";

import { useState } from 'react';

const IMAGES = [
    { name: 'Easton Profile 1', path: '/images/new_assets/easton-profile-1.jpg' },
    { name: 'Easton Profile 2', path: '/images/new_assets/easton-profile-2.jpg' },
    { name: 'Easton Profile 3', path: '/images/new_assets/easton-profile-3.jpg' },
    { name: 'Easton Profile 4', path: '/images/new_assets/easton-profile-4.jpg' },
    { name: 'Easton Profile 5', path: '/images/new_assets/easton-profile-5.jpg' },
    { name: 'Aerial View', path: '/images/new_assets/easton-aerial.jpg' },
    { name: 'Ski Hill A', path: '/images/new_assets/easton-ski-hill-a.jpg' },
    { name: 'Ski Hill B', path: '/images/new_assets/easton-ski-hill-b.jpg' },
    { name: 'Double Chair', path: '/images/new_assets/double-chair.jpg' },
    { name: 'T-Bar', path: '/images/new_assets/t-bar.jpg' },
    { name: 'Map 2017', path: '/images/new_assets/easton-map-2017.jpg' },
    { name: 'Map 2020', path: '/images/new_assets/easton-map-2020.jpg' },
    { name: 'Photo 01', path: '/images/new_assets/photo_01.jpg' },
    { name: 'Photo 02', path: '/images/new_assets/photo_02.jpg' },
    { name: 'Photo 03', path: '/images/new_assets/photo_03.jpg' },
    { name: 'Photo 04', path: '/images/new_assets/photo_04.jpg' },
    { name: 'Photo 05', path: '/images/new_assets/photo_05.jpg' },
    { name: 'Photo 06', path: '/images/new_assets/photo_06.jpg' },
    { name: 'Photo 07', path: '/images/new_assets/photo_07.jpg' },
    { name: 'Photo 08', path: '/images/new_assets/photo_08.jpg' },
    { name: 'Photo 09', path: '/images/new_assets/photo_09.jpg' },
    { name: 'Photo 10', path: '/images/new_assets/photo_10.jpg' },
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-slate-950 p-8 text-white">
            <h1 className="text-3xl font-bold mb-8 text-center text-yellow-500">Asset Gallery</h1>
            <p className="text-center text-slate-400 mb-8">
                Review these images to decide which ones map to game locations (Dorm, Lodge, The Rock, etc.)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {IMAGES.map((img) => (
                    <div key={img.path} className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-lg hover:border-yellow-500 transition-colors">
                        <div className="h-64 overflow-hidden relative group">
                            <img
                                src={img.path}
                                alt={img.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-slate-200">{img.name}</h3>
                            <code className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded block mt-2 mt-2 break-all">
                                {img.path}
                            </code>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-crimson hover:bg-red-700 text-white rounded font-bold transition-colors"
                >
                    Back to Game
                </a>
            </div>
        </div>
    );
}
