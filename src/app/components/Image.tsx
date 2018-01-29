import * as React from 'react';

export const Image = (props: any) => {
  return (
    <figure>
      {props.src && <img className='image' src={props.src}/>}
    </figure>
  )
}
