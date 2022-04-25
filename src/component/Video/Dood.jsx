import React from 'react';

export default function Dood({ videoId, height, width, onLoad }) {
  return (
    <div className='dood'>
      <iframe
        id='dood-element'
        src={`https://dood.so/e/${videoId}`}
        height={height}
        width={width}
        title='Doodstream'
        scrolling='no'
        frameBorder={0}
        allowFullScreen={true}
        onLoad={onLoad}
      />
    </div>
  );
}
