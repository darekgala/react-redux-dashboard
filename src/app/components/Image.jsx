import React from 'react';

export const Image = (props) => {
  return (
    <figure>
      {props.src && <img className='image' src={props.src}/>}
    </figure>
  )
}
