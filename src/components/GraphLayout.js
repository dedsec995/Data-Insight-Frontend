// src/components/GraphLayout.js
import React from 'react';
import GraphPage from './GraphPage';

const GraphLayout = () => {
    return (
        <div style={
            {
                textAlign: 'center',
                marginTop: '50px'
            }
        }>
            <h1>Graph</h1>
            <GraphPage/>
        </div>
    );
};

export default GraphLayout;

