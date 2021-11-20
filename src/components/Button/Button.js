import React from 'react'
import PropTypes from 'prop-types';
import s from './Button.module.css'

const Button = ({ loadMore }) => {
  return (
    <div className={s.Wrapper}>
     <button type="button" className={s.Button} onClick={loadMore}>
      Load more
     </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;