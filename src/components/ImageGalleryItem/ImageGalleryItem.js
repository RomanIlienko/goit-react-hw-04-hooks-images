import React from 'react'
import s from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'


const ImageGalleryItem = ({ hit, setLargeImg }) => {
  const { webformatURL, tags } = hit;

  return (
    <li className={s.ImageGalleryItem} onClick={() => setLargeImg(hit)}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  setLargeImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;