import React from 'react';

export default function Mdisk({ videoId, height, width }) {
  return (
    <div className='mdisk'>
      <iframe
        id='mdisk-element'
        src={`https://mdisk.me/convertor/14x9/${videoId}`}
        height={height}
        width={Math.min(480, width)}
        title='Mdisk'
        scrolling='no'
        frameBorder={0}
        allowFullScreen={true}
      />
    </div>
  );
}
