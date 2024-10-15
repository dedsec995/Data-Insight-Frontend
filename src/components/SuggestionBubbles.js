// src/components/SuggestionBubbles.js
import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';

const SuggestionBubbles = ({suggestions, loading, sessionId}) => {
    const navigate = useNavigate();

    const handleSuggestionClick = (suggestion) => {
        navigate(`/result/${sessionId}`, {state: {
                suggestion
            }});
    };

    return (
        <div style={
            {marginTop: '20px'}
        }>
            <h3>Suggestions</h3>
            {
            loading ? (
                <CircularProgress size={24}/>
            ) : (
                <Stack direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    justifyContent="center">
                    {
                    suggestions.map((suggestion, index) => (
                        <Chip key={index}
                            label={suggestion}
                            variant="outlined"
                            style={
                                {
                                    margin: '5px',
                                    cursor: 'pointer'
                                }
                            }
                            onClick={
                                () => handleSuggestionClick(suggestion)
                            }/>
                    ))
                } </Stack>
            )
        } </div>
    );
};

export default SuggestionBubbles;

