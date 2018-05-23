import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {

  constructor(props) {
    super(props)

    this.state.term = '' // could be wrong...
    this.search = this.search.bind(this)
    this.handleTermChange = this.handleTermChange.bind(this)
  }

  search() {

    this.props.onSearch(this.state.term)
  }

  handleTermChange(event) {

    this.setState({term: event.target.value})
  }

  render() {
    return (
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist" 
          onChange={event => this.handleTermChange(event)} // it could be that the method name is enough
        />
        <a>SEARCH</a>
      </div>
    );
  }
}
  
  export default SearchBar;
