// src/Pages/SecondPage.js
import React from 'react';
import GraphPage from '../components/Graphs';
import Navbar from '../components/Navbar';

const SecondPage = () => {
    return (<div style={
        {
            textAlign: 'center',
            marginTop: '70px'
        }
    }> {/* Adjust margin to accommodate the navbar height */}
        <Navbar/>
        <h1 style={
            {marginTop: '20px'}
        }>Graph</h1>
        {/* Added margin for spacing */}
        <GraphPage/>
    </div>);
};

export default SecondPage;
