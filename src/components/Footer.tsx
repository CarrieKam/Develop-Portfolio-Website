"use client";
import React from 'react';
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision';
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const Footer = () => {
    const words = [
        { text: "Thank you for visiting my site!" },
        { text: "I hope you enjoyed it!" },
    ];

    return (
        <div className="relative w-full h-[40rem]">
            <BackgroundBeamsWithCollision className="absolute inset-0">
               <div className="absolute bottom-4 w-full text-center text-neutral-200 z-10">
            Copyright @Carrie Kam
            </div>
            </BackgroundBeamsWithCollision>
            <TypewriterEffectSmooth 
            words={words}
            className="absolute inset-0 z-10 text-neutral-200 break-words flex items-center justify-center text-2xl" 
            />
        </div>
    );
}

export default Footer