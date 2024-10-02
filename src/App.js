// src/App.js
import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Title from './components/Title';
import AnimatedDisplay from './components/AnimatedDisplay';
import FileUpload from './components/FileUpload';
import GraphLayout from './components/GraphLayout'; // Import the new layout
import loadingAnimation from './assets/loading-animation-cd-v2.gif';

function App() {
    return (
        <Router>
            <Container
                maxWidth="sm"
                style={{ textAlign: 'center', marginTop: '100px' }}
            >
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header />
                            <Title />
                            <AnimatedDisplay src={loadingAnimation} />
                            <FileUpload />
                        </>
                    } />
                    <Route path="/graph/:sessionId" element={<GraphLayout />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
