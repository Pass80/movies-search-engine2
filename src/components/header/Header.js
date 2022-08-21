import React, { useState, useRef, useEffect } from 'react';
import autoComplete from '../../services/Api';
import './Header.css';

const Header = () => {
    let timer = null;

    const [state, setState] = useState({
        query: '',
        autoCompleteList: [],
    });

    const autoCompleteHandler = (query) => {
        autoComplete(query).then((list) => {
            setState((prevState) => ({
                ...prevState,
                query: query,
                autoCompleteList: list,
            }));
        });
    };
    const documentClickHandler = useRef((e) => {
        console.log(e.target);

        const listContainer = document.querySelector('.autocomplete-results');

        const searchInput = document.querySelector('.search-input');

        if (
            listContainer &&
            !listContainer.contains(e.target) &&
            searchInput !== e.target
        ) {
            setState((prevState) => ({ ...prevState, autoCompleteList: [] }));
        }
    });
    useEffect(() => {
        document.addEventListener('click', documentClickHandler.current);

        return () => {
            document.removeEventListener('click', documentClickHandler.current);
        };
    }, []);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <select>
                    <option value="movie">Movies</option>
                    <option value="tv">TV Shows</option>
                </select>
                <div className="query-container">
                    <input
                        className="search-input"
                        value={state.query}
                        type="text"
                        placeholder="Search"
                        onChange={(e) => {
                            setState({
                                ...state,
                                query: e.target.value,
                            });
                            // clear the previous timeout
                            clearTimeout(timer);

                            // set a timeout to prevent the form to send so many requests
                            timer = setTimeout(() => {
                                autoCompleteHandler(e.target.value);
                            }, 300);
                        }}
                        onFocus={(e) => {
                            console.log('focus started');

                            autoCompleteHandler(e.target.value);
                            console.log('focus ended');
                        }}
                    />
                    {state.autoCompleteList.length > 0 && (
                        <ul className="autocomplete-results">
                            {state.autoCompleteList.map((item) => (
                                <li
                                    key={item.id}
                                    dangerouslySetInnerHTML={{
                                        __html: item.styledName,
                                    }}
                                    onClick={(e) => {
                                        setState((prevState) => ({
                                            ...prevState,
                                            query: item.name,
                                            autoCompleteList: [],
                                        }));
                                    }}
                                ></li>
                            ))}
                        </ul>
                    )}
                </div>

                <input type="number" placeholder="Release year" />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Header;
