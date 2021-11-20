import React from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css'
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        largeImgUrl: PropTypes.string.isRequired,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        const { largeImgUrl } = this.props;

        return createPortal(
            <div className={s.Overlay} onClick={this.handleBackdropClick}>
                <div className={s.Modal}>
                    <img src={largeImgUrl} alt='Gallery item' />
                </div>
            </div>,
            modalRoot,
        );
    }
}