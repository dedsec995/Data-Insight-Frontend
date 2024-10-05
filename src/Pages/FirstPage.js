// src/Pages/FirstPage.js
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import AnimatedDisplay from '../components/AnimatedDisplay';
import FileUpload from '../components/FileUpload';
import loadingAnimation from '../assets/loading-animation-cd-v2.gif';

const FirstPage = () => {
    return (<div>
        <Navbar />
        <Header/>
        <Title/>
        <AnimatedDisplay src={loadingAnimation}/>
        <FileUpload/>
    </div>);
};

export default FirstPage;
