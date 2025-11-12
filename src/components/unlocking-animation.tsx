'use client';

import { cn } from "@/lib/utils";

const ChakraIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin-slow", className)}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="50" cy="50" r="48" />
    <path d="M50,2 a48,48 0 1,1 0,96 a48,48 0 1,1 0,-96" />
    <path d="M25,25 a35.35,35.35 0 0,1 50,0" />
    <path d="M25,75 a35.35,35.35 0 0,0 50,0" />
    <path d="M75,25 a35.35,35.35 0 0,1 0,50" />
    <path d="M25,25 a35.35,35.35 0 0,0 0,50" />
    <circle cx="50" cy="50" r="10" />
  </svg>
);

const UnlockingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center text-primary p-8 w-full max-w-md">
      <ChakraIcon className="w-24 h-24 text-primary/70" />
      <div className="overflow-hidden h-14">
        <div className="animate-text-scroll flex flex-col items-center">
            <h2 className="text-2xl font-bold font-headline leading-tight tracking-wider h-14 flex items-center justify-center">
                DECRYPTING TRANSMISSION...
            </h2>
            <h2 className="text-2xl font-bold font-headline leading-tight tracking-wider h-14 flex items-center justify-center">
                ACCESS GRANTED
            </h2>
        </div>
      </div>
       <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }
        @keyframes text-scroll {
          0% { transform: translateY(0); }
          45% { transform: translateY(0); }
          55% { transform: translateY(-3.5rem); }
          100% { transform: translateY(-3.5rem); }
        }
        .animate-text-scroll {
          animation: text-scroll 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UnlockingAnimation;
