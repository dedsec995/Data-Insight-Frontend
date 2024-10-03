// src/App.js
import React from 'react';
import {Container} from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FirstPage from './Pages/FirstPage';
import SecondPage from './Pages/SecondPage';

function App() {
    return (<Router>
        <Container maxWidth="sm"
            style={
                {
                    textAlign: 'center',
                    marginTop: '100px'
                }
        }>
            <Routes>
                <Route path="/"
                    element={<FirstPage/>}/>
                <Route path="/graph/:sessionId"
                    element={<SecondPage/>}/>
            </Routes>
        </Container>
    </Router>);
}

export default App;
