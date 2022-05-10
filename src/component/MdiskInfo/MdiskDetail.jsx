import React from 'react';
import moment from 'moment';
import './MdiskDetail.css';

const videoSize = (sizeArg) => {
  let size = null;
  let s = sizeArg;
  let map = ['B', 'KB', 'M', 'G'];
  let count = 0;
  while (s > 1024) {
    s /= 1024;
    count++;
  }
  size = s.toFixed(1) + map[count];
  return size;
};

export default function MdiskInfo({ videoData }) {
  const {
    owner = '',
    publishTime,
    width = 0,
    height = 0,
    size: fileSize = 0,
  } = videoData;

  return (
    <div className='MdiskDetail'>
      <div className='disk-details'>
        <div className='t-12'>
          <div className='info-title'>Video Information</div>
          {owner && (
            <span className='info-user'>{`${owner.substr(
              0,
              2
            )}***${owner.substr(-2, 2)} · `}</span>
          )}
          {publishTime && (
            <span className='info-time'>{` ${moment().format(
              'D MMM YYYY'
            )} · `}</span>
          )}
          {!!(width || height) && (
            <span className='info-resolution'>{`${width}*${height} · `}</span>
          )}
          {!!fileSize && (
            <span className='info-size'>{videoSize(fileSize)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
