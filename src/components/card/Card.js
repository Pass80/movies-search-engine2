import React, { useState } from 'react';
import './Card.css';

const Card = ({ details }) => {
    const [modal, setModal] = useState(false);

    const handleClick = (event) => {
        setModal(true);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setModal((prev) => !prev);
    };

    return (
        <div className="poster-container" onClick={handleClick}>
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
            {modal && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div className="left-content">
                            <h3>{details.name || details.title}</h3>
                            <img
                                src={
                                    details.posterPaths.w342 ||
                                    details.backdropPaths.w300 ||
                                    'images/no-poster.png'
                                }
                                alt="poster"
                                width="200px"
                            />
                        </div>

                        <span className="close" onClick={handleClose}>
                            &times;
                        </span>
                        <div className="right-content">
                            <div className="heading">
                                {(details.release_date && (
                                    <p>
                                        <span className="titles">
                                            Release date:
                                        </span>
                                        {details.release_date}
                                    </p>
                                )) ||
                                    (details.first_air_date && (
                                        <p>
                                            <span className="titles">
                                                First air date:
                                            </span>
                                            {details.first_air_date}
                                        </p>
                                    ))}

                                <p>
                                    <span className="titles">Rating:</span>
                                    {details.vote_average}
                                    <span>/10</span>
                                    <img
                                        src="images/star.png"
                                        alt="star"
                                        width="12px"
                                    />
                                </p>
                                <p>
                                    <span className="titles">Votes:</span>
                                    {details.vote_count}
                                </p>
                            </div>

                            <p>
                                <span className="review">Review : </span>
                                {details.overview || details.overview}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
