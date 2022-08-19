import React, { useState } from 'react';
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
            setState({
                query: query,
                autoCompleteList: list,
            });
            // to remove the droped list when the user clicks outside the list .
            if (list.length > 0) {
                document.addEventListener('click', documentClickHandler);
            }
        });
    };

    const documentClickHandler = (e) => {
        console.log(e);

        setState((prevState) => ({ ...prevState, autoCompleteList: [] }));
        document.removeEventListener('click', documentClickHandler);
        console.log('removed');
    };
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('hi');
                }}
            >
                <select>
                    <option value="movie">Movies</option>
                    <option value="tv">TV Shows</option>
                </select>
                <div className="query-container">
                    <input
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
                        // onFocus={(e) => {
                        //     autoCompleteHandler(e.target.value);
                        // }}
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
                                        setState({
                                            query: item.name,
                                            autoCompleteList: [],
                                        });
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
