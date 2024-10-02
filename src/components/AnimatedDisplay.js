// src/components/AnimatedDisplay.js
import React from 'react';

const AnimatedDisplay = ({ src }) => {
    return (
        <img src={src} alt="Animated Gif" style={{ width: '300px', margin: '20px 0' }} />
    );
};

export default AnimatedDisplay;
