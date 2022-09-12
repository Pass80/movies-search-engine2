import React, { Component } from 'react';
import './App.css';
import autoComplete from './services/Api';

export default class App extends Component {
    constructor() {
        super();
        this.timer = null;

        this.state = {
            query: '',
            autoCompleteList: [],
        };
    }

    // documentClickHandler = (e) => {
    //     const listContainer = document.querySelector('.autocomplete-results');
    //     const queryInput = document.querySelector('query-container input');
    //     //  add a condition
    //     if (!listContainer.contains(e.target) && e.target !== queryInput) {
    //         this.setState({ autoCompleteList: [] });
    //         // put this keyword because we used the method as a callback function inside another function
    //         document.removeEventListener('click', this.documentClickHandler);
    //         // the eventlistener is removed
    //     }
    // };
    // create a function to use it in onChange and onBlur events in the input field
    // so the code block we not be repeated twice
    autoCompleteHandler = (query) => {
        autoComplete(query).then((list) => {
            this.setState({
                autoCompleteList: list,
            });
            // add an eventlistener to the document object to remove the list
            //  if the user clicks outside the list
            // if (list.length > 0) {
            //     document.addEventListener('click', this.documentClickHandler);
            // }
        });
    };

    // componentWillMount() {
    //     //we put this keyword because we used the method as a callback function inside another function
    //     document.removeEventListener('click', this.documentClickHandler);
    // }
    render() {
        return (
            <>
                <header>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <select value="movie">
                            <option value="movie">movie</option>
                            <option value="tv">tv show</option>
                        </select>

                        <div className="query-container">
                            <input
                                value={this.state.query}
                                placeholder="Search"
                                onChange={(e) => {
                                    // first the timer should be cleared
                                    clearTimeout(this.timer);
                                    // set the query value in the state to the entered value in the input
                                    // to show it in the input field again
                                    this.setState({ query: e.target.value });
                                    // set a timeout to prevent from sending a new request with every key stroke
                                    // so the request will be sent after 500 ms
                                    this.timer = setTimeout(() => {
                                        this.autoCompleteHandler(
                                            e.target.value
                                        );
                                    }, 300);
                                }}
                                onFocus={(e) => {
                                    this.autoCompleteHandler(e.target.value);
                                }}
                                onBlur={() => {
                                    // document.removeEventListener(
                                    //     'click',
                                    //     this.documentClickHandler
                                    // );
                                    // remove the list when the user leaves the input field by pressing tab
                                    // add time out to insert the content of clicked list item in the input field
                                    // before the list is removed
                                    setTimeout(() => {
                                        this.setState({ autoCompleteList: [] });
                                    }, 100);
                                }}
                            />
                            {this.state.autoCompleteList.length > 0 && (
                                <ul className="autocomplete-results">
                                    {this.state.autoCompleteList.map((item) => (
                                        <li
                                            key={item.id}
                                            // use this attribute to show the content without the span tag
                                            // just the span content will be displayed
                                            dangerouslySetInnerHTML={{
                                                __html: item.styledName,
                                            }}
                                            onClick={(e) => {
                                                // document.removeEventListener(
                                                //     'click',
                                                //     this.documentClickHandler
                                                // );
                                                // set the query value in the state to the li-element's inner-html value
                                                // which will be displayed also in the input field
                                                this.setState({
                                                    query: item.name,
                                                    // set the autoCompleteList to empty array to remove the list from the DOM
                                                    autoCompleteList: [],
                                                });
                                            }}
                                        ></li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <input type="number" placeholder="release year" />
                        <button type="submit">Search</button>
                    </form>
                </header>
                <section>Card list</section>
                <footer></footer>
            </>
        );
    }
}
