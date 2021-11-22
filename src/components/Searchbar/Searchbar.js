import { useState } from 'react'

import PropTypes from 'prop-types'
import s from './Searchbar.module.css'

const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('')
    
    const handleChange = e => {
        setQuery(e.currentTarget.value.toLowerCase())
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (query.trim() === '') {
            alert('Please enter a valid name')
            return;
        }

        onSubmit(query);
        setQuery('')
    }
    
    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={s.SearchFormButton}>
                    <span className={s.SearchFormButtonLabel}></span>
                </button>

                <input
                 className={s.SearchFormInput}
                 type="text"
                 autoComplete="off"
                 value={query}
                 onChange={handleChange}
                 autoFocus
                 placeholder="Search images and photos"
                />
            </form>
         </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar