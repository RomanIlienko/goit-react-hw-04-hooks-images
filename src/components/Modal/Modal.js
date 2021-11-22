import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css'
import PropTypes from 'prop-types'

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children}) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('click', handleBackdropClick)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('click', handleBackdropClick)
        }
    })

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    
    return (
        createPortal(
            <div className={s.Overlay} onClick={handleBackdropClick}>
                <div className={s.Modal}>{children}</div>
            </div>,
            modalRoot,
        )
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImgUrl: PropTypes.string.isRequired,
}

export default Modal

// export default class Modals extends React.Component {
//     static propTypes = {
//         onClose: PropTypes.func.isRequired,
//         largeImgUrl: PropTypes.string.isRequired,
//     }

//     componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown)
//     }

//     handleKeyDown = e => {
//         if (e.code === 'Escape') {
//             this.props.onClose();
//         }
//     }

//     handleBackdropClick = e => {
//         if (e.target === e.currentTarget) {
//             this.props.onClose();
//         }
//     }

//     render() {
//         const { largeImgUrl } = this.props;

//         return createPortal(
//             <div className={s.Overlay} onClick={this.handleBackdropClick}>
//                 <div className={s.Modal}>
//                     <img src={largeImgUrl} alt='Gallery item' />
//                 </div>
//             </div>,
//             modalRoot,
//         );
//     }
// }