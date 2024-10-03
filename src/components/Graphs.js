import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {useParams} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';


const Graphs = () => {
    const {sessionId} = useParams();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/data/${sessionId}`);
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
                alert("Error fetching graph data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sessionId]);

    if (loading) {
        return <CircularProgress />;
    }

    return <ImageGallery items={images} />;
};

export default Graphs;

