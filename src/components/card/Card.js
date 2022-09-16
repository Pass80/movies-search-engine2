import React from 'react';
import './Card.css';

const Card = ({ details }) => {
    {
        console.log(details);
    }
    return (
        <div className="poster-container">
            <img
                className="poster"
                src={
                    details.posterPaths.w342 ||
                    details.backdropPaths.w300 ||
                    'images/no-poster.png'
                }
                alt="movie-poster"
            />
            <div className="popularity">
                <img src="images/star.png" alt="star" />
                <p>
                    {details.vote_average}
                    <span>/10</span>
                </p>
            </div>
        </div>
    );
};

export default Card;
