// src/components/FileUpload.js
import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import Graph from './Graph';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [graphData, setGraphData] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please choose a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setGraphData(null); // Reset graph data

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData);
            setGraphData(response.data.data); // Set the processed data
        } catch (error) {
            alert("Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpload} style={{ marginTop: '20px' }}>
                Upload File
            </Button>
            {loading && <CircularProgress style={{ marginTop: '20px' }} />}
            {graphData && <Graph data={graphData} />}
        </div>
    );
};

export default FileUpload;
