import Loader from 'react-loader-spinner'
import React, { Component } from 'react'
import s from './Loader.module.css';

export default class MyLoader extends Component {
     render() {
        return (
            <Loader
             className={s.FallbackContainer}
             type="Puff"
             color="#00BFFF"
             height={100}
             width={100}
             timeout={3000}
            />
        );
    }
}