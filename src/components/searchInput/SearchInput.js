import React, { Component } from 'react';
import autoComplete from '../../services/Api';
import './SearchInput.css';

class SearchInput extends Component {
    constructor() {
        super();
        this.timer = null;
        this.timer2 = null;

        this.state = {
            query: '',
            autoCompleteList: [],
            autoCompleteListIndex: 0,
        };
    }

    // create a function to get the data from the api and use it in onChange and onBlur events in the input field
    // so the code block will not be repeated twice
    autoCompleteHandler = (query) => {
        autoComplete(query).then((list) => {
            this.setState({
                autoCompleteList: list,
                autoCompleteListIndex: 0,
            });
        });
    };
    render() {
        return (
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
                        // this function send the entered value in the input to the App component
                        this.props.onQueryChange(e.target.value);
                        // set a timeout to prevent from sending a new request with every key stroke
                        // so the request will be sent after 300 ms
                        this.timer = setTimeout(() => {
                            this.autoCompleteHandler(e.target.value);
                        }, 300);
                    }}
                    onFocus={(e) => {
                        this.autoCompleteHandler(e.target.value);
                    }}
                    onBlur={() => {
                        // first the timer should be cleared
                        clearTimeout(this.timer2);
                        // add time out to insert the content of clicked list item in the input field
                        // before the list is removed
                        this.timer2 = setTimeout(() => {
                            this.setState({ autoCompleteList: [] });
                        }, 100);
                    }}
                    onKeyUp={(e) => {
                        if (this.state.autoCompleteList.length > 0) {
                            const key = e.key;
                            if (
                                key === 'Escape' ||
                                key === 'Esc' ||
                                key === 27
                            ) {
                                this.setState({
                                    autoCompleteList: [],
                                });
                            } else if (
                                key === 'Enter' ||
                                key === 'Ent' ||
                                key === 13
                            ) {
                                this.setState({
                                    autoCompleteList: [],
                                    query: this.state.autoCompleteList[
                                        this.state.autoCompleteListIndex
                                    ].name,
                                });
                                // this function send the entered value in the input to the App component
                                this.props.onQueryChange(
                                    this.state.autoCompleteList[
                                        this.state.autoCompleteListIndex
                                    ].name
                                );
                            } else if (
                                key === 'ArrowDown' ||
                                key === 'ArrowDown' ||
                                key === 40
                            ) {
                                let newIdex =
                                    this.state.autoCompleteListIndex + 1;
                                // set a condition to check if the autoCompleteListIndex + 1 >
                                // autoCompleteList.length if so then newIndex will be set to 0;
                                if (
                                    newIdex >
                                    this.state.autoCompleteList.length - 1
                                ) {
                                    newIdex = 0;
                                }
                                this.setState({
                                    autoCompleteListIndex: newIdex,
                                });
                            } else if (
                                key === 'ArrowUp' ||
                                key === 'ArrowUp' ||
                                key === 38
                            ) {
                                let newIdex =
                                    this.state.autoCompleteListIndex - 1;
                                // set a condition to check if the newIndex ===  -1
                                //  if so then newIndex will be set to = this.state.autoCompleteList.length - 1;

                                if (newIdex < 0) {
                                    newIdex =
                                        this.state.autoCompleteList.length - 1;
                                }
                                this.setState({
                                    autoCompleteListIndex: newIdex,
                                });
                            }
                        }
                    }}
                />
                {this.state.autoCompleteList.length > 0 && (
                    <ul className="autocomplete-results">
                        {this.state.autoCompleteList.map((item, index) => (
                            <li
                                className={
                                    index === this.state.autoCompleteListIndex
                                        ? 'active'
                                        : ''
                                }
                                key={item.id}
                                // use this attribute to show the content without the span tag
                                // just the span content will be displayed
                                dangerouslySetInnerHTML={{
                                    __html: item.styledName,
                                }}
                                onClick={(e) => {
                                    // set the query value in the state to the li-element's inner-html value
                                    // which will be displayed also in the input field
                                    this.setState({
                                        query: item.name,
                                        // set the autoCompleteList to empty array to remove the list from the DOM
                                        autoCompleteList: [],
                                    });
                                    this.props.onQueryChange(this.state.query);

                                    console.log('hi');
                                }}
                            ></li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default SearchInput;
