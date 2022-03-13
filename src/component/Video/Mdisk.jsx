import React from 'react';
import Iframe from '../CustomIframe';

export default function Mdisk({ videoId, height, width, onClick, onLoad }) {
  return (
    <div className='mdisk'>
      <Iframe
        id='mdisk-element'
        src={`https://mdisk.me/convertor/14x9/${videoId}`}
        height={height}
        width={Math.min(480, width)}
        title='Mdisk'
        scrolling='no'
        frameBorder={0}
        allowFullScreen={true}
        onInferredClick={onClick}
        onLoad={onLoad}
      />
    </div>
  );
}
