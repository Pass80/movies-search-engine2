import React, { Component } from 'react';
import './App.css';
import SearchInput from './components/searchInput/SearchInput';
import SortSelector from './components/sortSelector/SortSelector';

export default class App extends Component {
    constructor() {
        super();
        this.timer = null;
        this.searchQueries = {
            sort: 'movie',
            query: '',
            year: '',
        };

        this.state = {};
    }

    render() {
        return (
            <>
                <header>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <SortSelector
                            onSortSelect={(sort) =>
                                (this.searchQueries.sort = sort)
                            }
                        />
                        <SearchInput
                            onQueryChange={(query) =>
                                (this.searchQueries.query = query)
                            }
                        />
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
