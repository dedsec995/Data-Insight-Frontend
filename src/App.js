// src/App.js
import React from 'react';
import { Container } from '@mui/material';
import Header from './components/Header';
import AnimatedDisplay from './components/AnimatedDisplay';
import FileUpload from './components/FileUpload';
import loadingAnimation from './assets/loading-animation-cd-v2.gif';

function App() {
    return (
        <Container
            maxWidth="sm"
            style={{ textAlign: 'center', marginTop: '100px' }}
        >
            <Header />
            <AnimatedDisplay src={loadingAnimation} /> {/* Use the imported GIF */}
            <FileUpload />
        </Container>
    );
}

export default App;
