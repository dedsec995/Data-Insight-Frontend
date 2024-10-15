// src/Pages/ThirdPage.js
import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ResultPage = () => {
    const {sessionId} = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.post(`http://127.0.0.1:5000/api/result/${sessionId}`, {suggestion: location.state.suggestion});

                const {images: imageSrcs, json_data} = response.data;
                const formattedImages = imageSrcs.map((image, index) => ({
                        original: `data:image/png;base64,${image}`,
                        thumbnail: `data:image/png;base64,${image}`,
                        description: `Result Image ${
                        index + 1
                    }`
                }));

                setImages(formattedImages);
                setJsonData(json_data);
            } catch (error) {
                console.error("Error fetching result:", error);
                alert("Error fetching result");
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [sessionId, location.state.suggestion]);

    if (loading) {
        return (
            <div style={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }
            }>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <div>
            <h1>Result for: {
                location.state.suggestion
            }</h1>
            <ImageGallery items={images}/>
            <div style={
                {marginTop: '20px'}
            }>
                <h2>Additional Data:</h2>
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
        </div>
    );
};

export default ResultPage;

