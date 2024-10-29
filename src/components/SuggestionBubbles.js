import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const SuggestionBubbles = ({suggestions, loading, sessionId}) => {
    const navigate = useNavigate();
    const handleSuggestionClick = (suggestion) => {
        console.log('Clicked suggestion:', suggestion);
        navigate(`/result/${sessionId}`, {
            state: {
                suggestion: suggestion.model
            }
        });
    };

    if (loading) {
        return (
            <div style={
                {marginTop: '20px'}
            }>
                <h3>Suggested Models</h3>
                <CircularProgress size={24}/>
            </div>
        );
    }

    if (!suggestions || suggestions.length === 0) {
        return (
            <div style={
                {marginTop: '20px'}
            }>
                <h3>Suggested Models</h3>
                <p>No suggestions available, try refreshing</p>
            </div>
        );
    }

    return (
        <div style={
            {marginTop: '20px'}
        }>
            <h3>Suggested Models</h3>
            <Stack direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent="center">
                {
                suggestions.map((suggestion, index) => (
                    <Tooltip key={index}
                        title={
                            suggestion.reason
                        }
                        arrow>
                        <Chip label={
                                suggestion.model
                            }
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
                    </Tooltip>
                ))
            } </Stack>
        </div>
    );
};

export default SuggestionBubbles;
