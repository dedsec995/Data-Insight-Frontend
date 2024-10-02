import React, {useState} from 'react';
import {Button, CircularProgress} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    try {
        const response = await axios.post("http://127.0.0.1:5000/upload", formData);
        const sessionId = response.data.session_id;
        localStorage.setItem('session_id', sessionId);
        navigate(`/graph/${sessionId}`);
    } catch (error) {
        alert("Error uploading file");
    } finally {
        setLoading(false);
    }
};


    return (
        <div>
            <input type="file"
                onChange={handleFileChange}/>
            <Button variant="contained" color="primary"
                onClick={handleUpload}
                style={
                    {marginTop: '20px'}
            }>
                Upload File
            </Button>
            {
            loading && <CircularProgress style={
                {marginTop: '20px'}
            }/>
        } </div>
    );
};

export default FileUpload;

