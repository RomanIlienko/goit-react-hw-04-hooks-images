import React from 'react'
import s from './ImageGallery.module.css'
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={onClick}/>
      ))}
    </ul>
  )
};

ImageGallery.propTypes = {
   images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default ImageGallery;
