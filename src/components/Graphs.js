import React, {useEffect, useState, useRef} from 'react';

import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SuggestionBubbles from './SuggestionBubbles';

const Graphs = () => {
    const {sessionId} = useParams();
    const [images, setImages] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [suggestionsLoading, setSuggestionsLoading] = useState(true);
    const fetchedRef = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imagePaths = JSON.parse(localStorage.getItem('image_paths') || '[]');
                const response = await axios.post(`http://127.0.0.1:5000/data/${sessionId}`, {imagePaths: imagePaths});

                const {images: imageSrcs} = response.data;
                const formattedImages = imageSrcs.map((image, index) => ({
                        original: `data:image/png;base64,${image}`,
                        thumbnail: `data:image/png;base64,${image}`,
                        description: `Image ${
                        index + 1
                    }`
                }));
                setImages(formattedImages);
            } catch (error) {
                console.error("Error fetching graph data:", error);
                alert("Error fetching graph data");
            } finally {
                setLoading(false);
            }
        };

        const fetchSuggestions = async () => {
            if (fetchedRef.current) 
                return;
            fetchedRef.current = true;
            try {
                setSuggestionsLoading(true);
                const response = await axios.get(`http://127.0.0.1:5000/api/suggestions/${sessionId}`);
                console.log('API response:', response.data);

                if (response.data && Array.isArray(response.data.suggestions)) {
                    const cleanedSuggestions = response.data.suggestions.map(suggestion => ({model: suggestion.model, reason: suggestion.reason}));
                    console.log('Setting suggestions:', cleanedSuggestions);
                    setSuggestions(cleanedSuggestions);
                } else {
                    console.log('Unexpected response format:', response.data);
                    if (response.data && typeof response.data === 'object') {
                        console.log('Response keys:', Object.keys(response.data));
                    }
                    if (typeof response.data === 'string') {
                        try {
                            const parsedData = JSON.parse(response.data.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']'));
                            if (parsedData && Array.isArray(parsedData.suggestions)) {
                                console.log('Parsed suggestions:', parsedData.suggestions);
                                setSuggestions(parsedData.suggestions);
                                return;
                            }
                        } catch (parseError) {
                            console.error('Error parsing response:', parseError);
                        }
                    }
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                if (error.response) {
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
                setSuggestions([]);
            } finally {
                setSuggestionsLoading(false);
            }
        };

        fetchData();
        fetchSuggestions();
    }, [sessionId]);

    return (
        <div> {
            loading ? (
                <CircularProgress/>) : (
                <ImageGallery items={images}/>
            )
        }
            <SuggestionBubbles suggestions={suggestions}
                loading={suggestionsLoading}
                sessionId={sessionId}/>
        </div>
    );
};

export default Graphs;

