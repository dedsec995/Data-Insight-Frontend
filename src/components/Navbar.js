// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleStartOver = () => {
        localStorage.removeItem('session_id');
        navigate('/');
    };

    return (<AppBar position="fixed"
        style={
            { top: 0 }
        }>
        <Toolbar>
            <Typography variant="h6"
                style={
                    {
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }

                }>
                Data Insight
            </Typography>
            <Button color="inherit"
                onClick={handleStartOver}>
                New
            </Button>
        </Toolbar>
    </AppBar>);
};

export default Navbar;

