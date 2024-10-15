// src/components/Graphs.js
import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imagePaths = JSON.parse(localStorage.getItem('image_paths') || '[]');
                const response = await axios.post(`http://127.0.0.1:5000/data/${sessionId}`, {imagePaths: imagePaths});

                const {images: imageSrcs} = response.data;
                const formattedImages = imageSrcs.map((image, index) => ({
                        original: `data:image/png;base64,${image}`, thumbnail: `data:image/png;base64,${image}`, description: `Image ${
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
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/suggestions');
                setSuggestions(response.data.suggestions);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                alert("Error fetching suggestions");
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
