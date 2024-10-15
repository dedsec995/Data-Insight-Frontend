// src/Pages/SecondPage.js
import React from 'react';
import GraphPage from '../components/Graphs';
import Navbar from '../components/Navbar';

const SecondPage = () => {
    return (
        <div style={
            {
                textAlign: 'center',
                marginTop: '70px',
                padding: '0 20px' // Add some horizontal padding
            }
        }>
            <Navbar/>
            <h1 style={
                {marginTop: '20px'}
            }>Graph</h1>
            <GraphPage/>
        </div>
    );
};

export default SecondPage;

