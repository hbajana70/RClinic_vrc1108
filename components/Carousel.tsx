// Fix: Provide content for Carousel.tsx to resolve module not found errors.
import React, { useRef, ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CarouselProps {
    children: ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.querySelector(':scope > div')?.clientWidth || 0;
            const scrollAmount = direction === 'left' ? -(cardWidth + 32) : (cardWidth + 32); // card width + gap
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    return (
        <div className="relative">
            <div className="absolute -top-16 right-0 hidden sm:flex items-center gap-3">
                 <button 
                    onClick={() => scroll('left')} 
                    className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors" 
                    aria-label="Anterior"
                >
                     <ChevronLeftIcon className="h-6 w-6 text-dark-blue"/>
                 </button>
                 <button 
                    onClick={() => scroll('right')} 
                    className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors" 
                    aria-label="Siguiente"
                >
                     <ChevronRightIcon className="h-6 w-6 text-dark-blue"/>
                 </button>
            </div>
            <div 
                ref={scrollContainerRef} 
                className="flex gap-8 pb-4 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
                {children}
            </div>
        </div>
    );
};