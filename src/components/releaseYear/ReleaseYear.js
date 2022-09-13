import React from 'react';
import './ReleaseYear.css';

const ReleaseYear = ({ onYearChange }) => {
    return (
        <input
            type="number"
            placeholder="release year"
            onChange={(e) => onYearChange(e.target.value)}
        />
    );
};

export default ReleaseYear;
