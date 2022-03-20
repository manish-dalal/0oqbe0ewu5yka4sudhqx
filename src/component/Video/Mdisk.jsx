import React from 'react';
import Iframe from '../CustomIframe';

export default function Mdisk({
  videoId,
  height,
  width,
  onClick,
  onLoad,
  topHeight,
}) {
  return (
    <div className='mdisk' style={{ height }}>
      <Iframe
        id='mdisk-element'
        src={`https://mdisk.me/convertor/14x9/${videoId}`}
        height={topHeight}
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
