// src/Pages/ThirdPage.js
import React, {useEffect, useState, useRef} from 'react';

import {useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-image-gallery/styles/css/image-gallery.css';

const ResultPage = () => {
    const {sessionId} = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [confImage, setConfImage] = useState('');
    const [result, setResult] = useState(null);
    const [modelPath, setModelPath] = useState('');
    const fetchedRef = useRef(false);

    useEffect(() => {
        const fetchResult = async () => {
            if (fetchedRef.current) 
                return;
            fetchedRef.current = true;
            try {
                const response = await axios.post(`http://127.0.0.1:5000/api/result/${sessionId}`, {suggestion: location.state.suggestion});

                const {conf_image, result, model_path} = response.data;
                setConfImage(conf_image);
                setResult(result);
                setModelPath(model_path);
            } catch (error) {
                console.error("Error fetching result:", error);
                alert("Error fetching result");
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [sessionId, location.state.suggestion]);

    const handleDownloadModel = () => {
        window.open(`http://127.0.0.1:5000/api/download_model/${sessionId}`, '_blank');
    };

    if (loading) {
        return (<div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }
        }>
            <CircularProgress/>
        </div>);
    }

    return (<div>
        <Navbar />
        <h1>Result for: {
            location.state.suggestion
        }</h1>
        <img src={
                `data:image/png;base64,${confImage}`
            }
            alt="Confusion Matrix"/>
        <div style={
            {marginTop: '20px'}
        }>
            <h2>Model Results:</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
        <div style={
            {marginTop: '20px'}
        }>
            <h2>Model Path: {modelPath}</h2>
            <button onClick={handleDownloadModel}>Download Model</button>
        </div>
    </div>);
};

export default ResultPage;

