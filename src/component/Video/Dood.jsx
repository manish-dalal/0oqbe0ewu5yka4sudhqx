import React from 'react';

export default function Dood({ videoId, height, width }) {
  return (
    <div className='dood'>
      <iframe
        id='dood-element'
        src={`https://dood.so/d/${videoId}`}
        height={Math.min(height, width)}
        width={width}
        title='Doodstream'
        scrolling='no'
        frameBorder={0}
        allowFullScreen={true}
      />
    </div>
  );
}
