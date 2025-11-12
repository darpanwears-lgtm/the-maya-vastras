
'use client';

import { cn } from '@/lib/utils';
import Logo from './logo';

const WelcomeAnimation = ({ isVisible }: { isVisible: boolean }) => {
  const message = "WELCOME TO";

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-1000",
        "animate-fade-out"
      )}
    >
        <div className="text-center p-8 z-10">
            <h1 className="text-lg md:text-2xl font-body tracking-widest text-muted-foreground mb-4 animate-fade-in-slow">
              {message.split('').map((char, index) => (
                <span
                  key={index}
                  className="animate-char-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>
            <div 
              className="animate-logo-in" 
              style={{ animationDelay: '1.5s' }}
            >
              <Logo className="text-4xl md:text-6xl" />
            </div>
        </div>

      <div className="absolute inset-0 grid grid-cols-20 grid-rows-10 opacity-20">
          {Array.from({ length: 400 }).map((_, i) => (
              <div 
                key={i} 
                className="w-full h-full border border-primary/10 animate-grid-flash"
                style={{
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
          ))}
      </div>


      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-slow {
          animation: fadeIn 1s ease-in forwards;
          opacity: 0;
          animation-delay: 0.5s;
        }
        @keyframes charIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-char-in {
          display: inline-block;
          opacity: 0;
          animation: charIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes logoIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-logo-in {
            opacity: 0;
            animation: logoIn 1s ease-out forwards;
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
        .animate-fade-out {
          animation: fadeOut 5s ease-in-out forwards;
        }

        @keyframes gridFlash {
            0%, 100% { background-color: transparent; }
            50% { background-color: hsl(var(--primary) / 0.1); }
        }
        .animate-grid-flash {
            animation-name: gridFlash;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeAnimation;
