import React from 'react'

import PropTypes from 'prop-types'
import s from './Searchbar.module.css'

export default class Searchbar extends React.Component {
    state = {
        query: ''
    };

    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };

    handleChange = e => {
        this.setState({ query: e.currentTarget.value.toLowerCase() })
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            alert('Please enter a valid name')
            return;
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: ''})
    }

    render() {
        return (
         <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={this.handleSubmit}>
                <button type="submit" className={s.SearchFormButton}>
                    <span className={s.SearchFormButtonLabel}></span>
                </button>

                <input
                 className={s.SearchFormInput}
                 type="text"
                 autoComplete="off"
                 value={this.state.query}
                 onChange={this.handleChange}
                 autoFocus
                 placeholder="Search images and photos"
                />
            </form>
         </header>
        )
    }
}