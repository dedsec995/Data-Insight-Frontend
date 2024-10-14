import React, {useState, useCallback} from 'react';
import {Button, CircularProgress, Box, Typography} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleUpload = async () => {
        if (!file) {
            alert("Please choose a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData);
            const {session_id, image_paths} = response.data;
            localStorage.setItem('session_id', session_id);
            localStorage.setItem('image_paths', JSON.stringify(image_paths));
            navigate(`/graph/${session_id}`);
        } catch (error) {
            alert("Error uploading file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                sx={
                    {
                        border: '2px dashed #ccc',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: dragActive ? '#f0f0f0' : 'transparent'
                    }
            }>
                <input type="file"
                    onChange={handleFileChange}
                    style={
                        {display: 'none'}
                    }
                    id="file-input"/>
                <label htmlFor="file-input">
                    <Typography> {
                        file ? file.name : "Drag and drop a file here, or click to select a file"
                    } </Typography>
                </label>
            </Box>
            {
            loading ? (
                <Box sx={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }
                }>
                    <CircularProgress/>
                </Box>
            ) : (
                <Button variant="contained" color="primary"
                    onClick={handleUpload}
                    sx={
                        {marginTop: '20px'}
                    }
                    disabled={
                        !file
                }>
                    Upload File
                </Button>
            )
        } </Box>
    );
};

export default FileUpload;

