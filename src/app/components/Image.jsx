import React from 'react';
import PropTypes from 'prop-types';

export const Image = (props) => {
  return (
    <figure>
      {props.src && <img className='image' src={props.src}/>}
    </figure>
  )
}

Image.propTypes = {
  src: PropTypes.string
}

Image.defaultProps = {
  src: ''
}