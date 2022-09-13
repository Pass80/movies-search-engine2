import React from 'react';
import './Card.css';

const Card = ({ details }) => {
    return (
        <div>
            <img
                src={
                    details.posterPaths.w342 ||
                    details.backdropPaths.w300 ||
                    'images/no-poster.png'
                }
                alt="movie-poster"
                width="300px"
                height="auto"
            />
        </div>
    );
};

export default Card;
