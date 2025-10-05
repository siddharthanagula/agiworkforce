"use client";

import React, { useRef, useEffect, useState, createElement, useMemo, useCallback } from "react";

export const Component = () => {
    return (
        <div className='bg-black h-screen w-screen flex justify-center items-center'>
            <VaporizeTextCycle
                texts={["21st.dev", "Is", "Cool"]}
                font={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "70px",
                    fontWeight: 600
                }}
                color="rgb(255,255, 255)"
                spread={5}
                density={5}
                animation={{
                    vaporizeDuration: 2,
                    fadeInDuration: 1,
                    waitDuration: 1
                }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H1}
            />
        </div>
    );
};

export enum Tag {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    H6 = "h6",
    P = "p",
    SPAN = "span",
    DIV = "div"
}

export interface VaporizeTextCycleProps {
    texts: string[];
    font?: {
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: number;
    };
    color?: string;
    spread?: number;
    density?: number;
    animation?: {
        vaporizeDuration?: number;
        fadeInDuration?: number;
        waitDuration?: number;
    };
    direction?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top";
    alignment?: "left" | "center" | "right";
    tag?: Tag;
    className?: string;
    style?: React.CSSProperties;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    alpha: number;
}

const transformValue = (value: number, inputRange: [number, number], outputRange: [number, number], clamp: boolean = false): number => {
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    
    const normalizedValue = (value - inputMin) / (inputMax - inputMin);
    const transformedValue = outputMin + normalizedValue * (outputMax - outputMin);
    
    if (clamp) {
        return Math.max(outputMin, Math.min(outputMax, transformedValue));
    }
    
    return transformedValue;
};

const VaporizeTextCycle: React.FC<VaporizeTextCycleProps> = ({
    texts,
    font = {
        fontFamily: "Inter, sans-serif",
        fontSize: "70px",
        fontWeight: 600
    },
    color = "rgb(255,255, 255)",
    spread = 5,
    density = 5,
    animation = {
        vaporizeDuration: 2,
        fadeInDuration: 1,
        waitDuration: 1
    },
    direction = "left-to-right",
    alignment = "center",
    tag = Tag.H1,
    className = "",
    style = {}
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "waiting">("static");
    const vaporizeProgressRef = useRef(0);
    const fadeOpacityRef = useRef(0);
    const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

    // Calculate device pixel ratio
    const globalDpr = useMemo(() => {
        if (typeof window !== "undefined") {
            return window.devicePixelRatio * 1.5 || 1;
        }
        return 1;
    }, []);

    // Memoize static styles
    const wrapperStyle = useMemo(() => ({
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const,
        position: "relative" as const,
        display: "flex",
        alignItems: "center",
        justifyContent: alignment === "center" ? "center" : alignment === "left" ? "flex-start" : "flex-end"
    }), [alignment]);

    const canvasStyle = useMemo(() => ({
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none" as const
    }), []);

    // Memoize font configuration
    const fontConfig = useMemo(() => ({
        fontFamily: font.fontFamily || "Inter, sans-serif",
        fontSize: font.fontSize || "70px",
        fontWeight: font.fontWeight || 600,
        MULTIPLIED_VAPORIZE_SPREAD: spread * 2
    }), [font.fontFamily, font.fontSize, font.fontWeight, spread]);

    // Memoize animation durations
    const animationDurations = useMemo(() => ({
        VAPORIZE_DURATION: animation.vaporizeDuration || 2,
        FADE_IN_DURATION: animation.fadeInDuration || 1,
        WAIT_DURATION: animation.waitDuration || 1
    }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

    // Memoize text element
    const textElement = useMemo(() => {
        if (texts.length === 0) return null;
        
        const textProps = {
            style: {
                fontFamily: fontConfig.fontFamily,
                fontSize: fontConfig.fontSize,
                fontWeight: fontConfig.fontWeight,
                color: color,
                textAlign: alignment as any,
                whiteSpace: "nowrap" as const,
                opacity: animationState === "fadingIn" ? fadeOpacityRef.current : 1,
                transition: animationState === "fadingIn" ? `opacity ${animationDurations.FADE_IN_DURATION}s ease-in-out` : "none"
            },
            className: className
        };

        return createElement(tag, textProps, texts[currentTextIndex]);
    }, [texts, currentTextIndex, fontConfig, color, alignment, tag, className, animationState, animationDurations.FADE_IN_DURATION]);

    // Animation cycle effect
    useEffect(() => {
        if (texts.length <= 1) return;

        const cycleTexts = () => {
            setAnimationState("vaporizing");
            
            setTimeout(() => {
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                setAnimationState("fadingIn");
                
                setTimeout(() => {
                    setAnimationState("waiting");
                    
                    setTimeout(() => {
                        setAnimationState("static");
                        cycleTexts();
                    }, animationDurations.WAIT_DURATION * 1000);
                }, animationDurations.FADE_IN_DURATION * 1000);
            }, animationDurations.VAPORIZE_DURATION * 1000);
        };

        const timeoutId = setTimeout(cycleTexts, 2000);
        return () => clearTimeout(timeoutId);
    }, [texts.length, animationDurations.VAPORIZE_DURATION, animationDurations.FADE_IN_DURATION, animationDurations.WAIT_DURATION]);

    // Vaporize animation effect
    useEffect(() => {
        if (animationState !== "vaporizing") return;

        const startTime = Date.now();
        const duration = animationDurations.VAPORIZE_DURATION * 1000;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            vaporizeProgressRef.current = progress;
            
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [animationState, animationDurations.VAPORIZE_DURATION]);

    // Fade in animation effect
    useEffect(() => {
        if (animationState !== "fadingIn") return;

        const startTime = Date.now();
        const duration = animationDurations.FADE_IN_DURATION * 1000;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            fadeOpacityRef.current = progress;
            
            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [animationState, animationDurations.FADE_IN_DURATION]);

    // Resize observer
    useEffect(() => {
        if (!wrapperRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setWrapperSize({ width, height });
            }
        });

        resizeObserver.observe(wrapperRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Canvas rendering
    const renderCanvas = useCallback(({
        framerProps,
        canvasRef,
        wrapperSize,
        particlesRef,
        globalDpr,
        currentTextIndex,
        density
    }: {
        framerProps: VaporizeTextCycleProps;
        canvasRef: React.RefObject<HTMLCanvasElement | null>;
        wrapperSize: { width: number; height: number };
        particlesRef: React.MutableRefObject<Particle[]>;
        globalDpr: number;
        currentTextIndex: number;
        density: number;
    }) => {
        if (!canvasRef.current || !wrapperSize.width || !wrapperSize.height) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = globalDpr;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, rect.width, rect.height);

        if (framerProps.texts.length === 0) return;

        const currentText = framerProps.texts[currentTextIndex];
        if (!currentText) return;

        // Set font properties
        ctx.font = `${framerProps.font?.fontWeight || 600} ${framerProps.font?.fontSize || "70px"} ${framerProps.font?.fontFamily || "Inter, sans-serif"}`;
        ctx.textAlign = framerProps.alignment === "center" ? "center" : framerProps.alignment === "left" ? "left" : "right";
        ctx.textBaseline = "middle";

        // Get text metrics
        const textMetrics = ctx.measureText(currentText);
        const textWidth = textMetrics.width;
        const textHeight = parseInt(framerProps.font?.fontSize || "70px") * 0.8;
        
        const centerX = framerProps.alignment === "center" ? rect.width / 2 : 
                      framerProps.alignment === "left" ? textWidth / 2 : 
                      rect.width - textWidth / 2;
        const centerY = rect.height / 2;

        // Create particles from text
        if (particlesRef.current.length === 0 || vaporizeProgressRef.current > 0) {
            particlesRef.current = [];
            const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);
            
            for (let i = 0; i < textWidth * transformedDensity; i++) {
                const x = centerX - textWidth / 2 + (i / transformedDensity);
                const y = centerY + (Math.random() - 0.5) * textHeight * 0.5;
                
                particlesRef.current.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * framerProps.spread! * 2,
                    vy: (Math.random() - 0.5) * framerProps.spread! * 2,
                    life: 1,
                    maxLife: 1,
                    size: Math.random() * 3 + 1,
                    color: framerProps.color || "rgb(255,255, 255)",
                    alpha: 1
                });
            }
        }

        // Update and draw particles
        particlesRef.current.forEach((particle, index) => {
            if (particle.life <= 0) {
                particlesRef.current.splice(index, 1);
                return;
            }

            // Update particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= 0.02;
            particle.alpha = particle.life;

            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }, [density]);

    // Canvas effect
    useEffect(() => {
        if (!wrapperSize.width || !wrapperSize.height) return;

        const animate = () => {
            renderCanvas({
                framerProps: { texts, font, color, spread, density, animation, direction, alignment, tag },
                canvasRef,
                wrapperSize,
                particlesRef,
                globalDpr,
                currentTextIndex,
                density
            });
            
            if (animationState === "vaporizing" || particlesRef.current.length > 0) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animate();
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [texts, font, color, alignment, wrapperSize, currentTextIndex, globalDpr, density, renderCanvas, animationState]);

    return (
        <div ref={wrapperRef} style={{ ...wrapperStyle, ...style }}>
            {textElement}
            <canvas ref={canvasRef} style={canvasStyle} />
        </div>
    );
};

export const VaporizeTextEffect = VaporizeTextCycle;