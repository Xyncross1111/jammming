import React, { useState, useCallback } from 'react';
import './searchbar.css'

function SearchBar(props) {

    const [term, setTerm] = useState("");

    const handleChange = (event) => {
        setTerm(event.target.value);
    }

    const search = useCallback(() => {
        props.onSearch(term);
      }, [props.onSearch, term]);

    return(
        <div className="search">
            <div className="searchbox" >
                <input
                    type="text"
                    name="search"
                    onChange={handleChange}
                />
            </div>
            <br />
            <div className="searchbutton">
                <button type="button" onClick={search} >Search 🔎</button>
            </div>

        </div>
    )
}

export default SearchBar;