import React from 'react';
import autoComplete from '../../services/Api';

const Header = () => {
    let timer = null;
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('hi');
                }}
            >
                <select value="movie">
                    <option value="movie">Movies</option>
                    <option value="tv">TV Shows</option>
                </select>

                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => {
                        // clear the previous timeout
                        clearTimeout(timer);
                        // set a timeout to prevent the form to send so many requests
                        timer = setTimeout(() => {
                            autoComplete(e.target.value).then((list) =>
                                console.log(list)
                            );
                        }, 2000);
                    }}
                />

                <input type="number" placeholder="Release year" />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Header;
