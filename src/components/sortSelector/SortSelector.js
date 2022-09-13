import React, { Component } from 'react';
import './SortSelector.css';

class SortSelector extends Component {
    render() {
        return (
            <select onChange={(e) => this.props.onSortSelect(e.target.value)}>
                <option value="movie">movie</option>
                <option value="tv">tv show</option>
            </select>
        );
    }
}

export default SortSelector;
