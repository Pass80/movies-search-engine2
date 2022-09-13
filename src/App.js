import React, { Component } from 'react';
import './App.css';
import Card from './components/card/Card';
import ReleaseYear from './components/releaseYear/ReleaseYear';
import SearchInput from './components/searchInput/SearchInput';
import SortSelector from './components/sortSelector/SortSelector';
import { getResults } from './services/Api';

export default class App extends Component {
    constructor() {
        super();
        this.timer = null;
        this.searchQueries = {
            sort: 'movie',
            query: '',
            year: '',
        };

        this.state = {
            results: [],
        };
    }

    render() {
        return (
            <>
                <header>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const { sort, query, year } = this.searchQueries;

                            getResults({ sort, query, year, page: 1 }).then(
                                (data) =>
                                    this.setState({
                                        results: data.results,
                                    })
                            );
                        }}
                    >
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
                        <ReleaseYear
                            onYearChange={(year) =>
                                (this.searchQueries.year = year)
                            }
                        />

                        <button type="submit">Search</button>
                    </form>
                </header>
                <section>
                    {this.state.results.map((card) => (
                        <Card key={card.id} details={card} />
                    ))}
                </section>
                <footer></footer>
            </>
        );
    }
}
