"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
  onReady?: () => void;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
  onReady
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const animationId = React.useRef<number>();

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let lastTime = performance.now();
    let morph = 0;
    let cooldown = cooldownTime;
    let isReady = false;

    const setMorph = (fraction: number) => {
      const text1 = text1Ref.current;
      const text2 = text2Ref.current;
      
      if (text1 && text2) {
        const blurValue = Math.min(8 / fraction - 8, 100);
        const opacityValue = Math.pow(fraction, 0.4);
        
        text2.style.filter = `blur(${blurValue}px)`;
        text2.style.opacity = `${opacityValue}`;

        const reverseFraction = 1 - fraction;
        const reverseBlurValue = Math.min(8 / reverseFraction - 8, 100);
        const reverseOpacityValue = Math.pow(reverseFraction, 0.4);
        
        text1.style.filter = `blur(${reverseBlurValue}px)`;
        text1.style.opacity = `${reverseOpacityValue}`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      const text1 = text1Ref.current;
      const text2 = text2Ref.current;
      
      if (text1 && text2) {
        text2.style.filter = "";
        text2.style.opacity = "1";
        text1.style.filter = "";
        text1.style.opacity = "0";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate(currentTime: number) {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (morph === 0) {
          textIndex = (textIndex + 1) % texts.length;
          const text1 = text1Ref.current;
          const text2 = text2Ref.current;
          
          if (text1 && text2) {
            text1.textContent = texts[textIndex % texts.length];
            text2.textContent = texts[(textIndex + 1) % texts.length];
            
            // Signal ready after first text is set
            if (!isReady && onReady) {
              isReady = true;
              setTimeout(onReady, 100); // Small delay to ensure text is rendered
            }
          }
        }
        doMorph();
      } else {
        doCooldown();
      }

      animationId.current = requestAnimationFrame(animate);
    }

    animationId.current = requestAnimationFrame(animate);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [texts, morphTime, cooldownTime, onReady]);

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-secondary dark:text-white",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-secondary dark:text-white",
            textClassName
          )}
        />
      </div>
    </div>
  );
}