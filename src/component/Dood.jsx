import React from 'react';

export default function Dood({ videoId, height, width }) {
  return (
    <div className='dood'>
      <iframe
        id='dood-element'
        src={`https://dood.so/d/${videoId}`}
        height={height}
        width={width}
        scrolling='no'
        frameborder='0'
        allowfullscreen='true'
      />
    </div>
  );
}
