import React from 'react';

export default function Mdisk({ videoId, height, width }) {
  return (
    <div className='mdisk'>
      <iframe
        id='mdisk-element'
        src={`https://mdisk.me/convertor/14x9/${videoId}`}
        height={height}
        width={width}
        scrolling='no'
        frameborder='0'
        allowfullscreen='true'
      />
    </div>
  );
}
