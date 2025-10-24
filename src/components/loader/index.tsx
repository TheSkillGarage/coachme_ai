import React from 'react';
// import './CircleLoader.css'; // We'll create this CSS file next

interface CircleLoaderProps {
    numDots?: number; // Number of dots in the circle
    activeDotColor?: string; // Color of the active dot
    inactiveDotColor?: string; // Color of the inactive dots
    dotSize?: number; // Size of each dot in pixels
    circleRadius?: number; // Radius of the circle the dots form in pixels
    animationDuration?: string; // Duration of one full rotation (e.g., "1.5s")
    className?: string; // Optional class for additional styling
}

const CircleLoader: React.FC<CircleLoaderProps> = ({
    numDots = 8,
    activeDotColor = '#67005E', // A nice purple
    inactiveDotColor = '#FFDAFC', // A light grey/white
    dotSize = 10, // px
    circleRadius = 30, // px
    animationDuration = '1.5s',
    className,
}) => {
    const dots = Array.from({ length: numDots });

    return (
        <div
            className={`circle-loader-container ${className || ''}`}
            style={{
                width: (circleRadius * 2 + dotSize), // Ensure container is large enough
                height: (circleRadius * 2 + dotSize),
            }}
        >
            <div
                className="circle-loader-spinner"
                style={{
                    '--num-dots': numDots,
                    '--active-dot-color': activeDotColor,
                    '--inactive-dot-color': inactiveDotColor,
                    '--dot-size': `${dotSize}px`,
                    '--circle-radius': `${circleRadius}px`,
                    '--animation-duration': animationDuration,
                } as React.CSSProperties} // Type assertion for custom CSS properties
            >
                {dots.map((_, index) => (
                    <div
                        key={index}
                        className={`circle-loader-dot ${index === 0 ? 'active' : ''}`}
                        style={{
                            // Position dots evenly around the circle
                            transform: `rotate(${index * (360 / numDots)}deg) translate(${circleRadius}px) rotate(-${index * (360 / numDots)}deg)`,
                            backgroundColor: inactiveDotColor, // Default color for all dots
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CircleLoader;