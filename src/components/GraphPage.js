import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Graph from './Graph';
import CircularProgress from '@mui/material/CircularProgress';

const GraphPage = () => {
    const {sessionId} = useParams(); // No need to extract session ID again here
    const [graphData, setGraphData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/data/${sessionId}`);
                setGraphData(response.data.data);
            } catch (error) {
                alert("Error fetching graph data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sessionId]);

    if (loading) 
        return <CircularProgress/>;
    

    return <div>{
        graphData && <Graph data={graphData}/>
    }</div>;
};

export default GraphPage;

