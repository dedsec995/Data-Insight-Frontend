// src/components/FirstPage.js
import React from 'react';
import Header from '../components/Header';
import Title from '../components/Title';
import AnimatedDisplay from '../components/AnimatedDisplay';
import FileUpload from '../components/FileUpload';
import loadingAnimation from '../assets/loading-animation-cd-v2.gif'; // Adjust path if necessary

const FirstPage = () => {
    return (<div>
        <Header/>
        <Title/>
        <AnimatedDisplay src={loadingAnimation}/>
        <FileUpload/>
    </div>);
};

export default FirstPage;
