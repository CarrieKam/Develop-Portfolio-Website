"use client";
import React from 'react';
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision';
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
    const { data } = usePortfolio();

    return (
        <div className="relative w-full h-[40rem]">
            <BackgroundBeamsWithCollision className="absolute inset-0 h-full">
                <div className="absolute bottom-4 w-full text-center dark:text-neutral-200 z-10">
                    Copyright @Carrie Kam
                </div>
            </BackgroundBeamsWithCollision>
            <TypewriterEffectSmooth 
                words={[{ text: data.ending.text }]}
                className="absolute inset-0 z-10 break-words flex items-center justify-center" 
            />
        </div>
    );
}

export default Footer;
