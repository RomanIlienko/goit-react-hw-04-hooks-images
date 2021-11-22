import React from 'react'
import s from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'


const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, id, tags, largeImageURL } = image;

  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        data-url={largeImageURL}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired
};

export default ImageGalleryItem;