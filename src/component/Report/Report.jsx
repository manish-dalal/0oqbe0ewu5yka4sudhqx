import React, { useState } from 'react';
import './report.css';
import { useParams } from 'react-router-dom';

export default function Report({ videoData }) {
  let { videoId = '' } = useParams();
  const [show, setshow] = useState(false);

  const onClose = (reason = '') => {
    setshow(false);
    if (reason && typeof reason === 'string') {
      window.dataLayer.push({
        event: 'video_report',
        id: videoId || '',
        reason,
      });
    }
  };
  return (
    <div className='report-box'>
      <div className='t-ellipsis'>{videoData.name}</div>
      <div
        className='report'
        onClick={() => {
          setshow(true);
        }}
      >
        <div className='warning'></div>
        <div className='label-report'>Report</div>
      </div>
      {show && (
        <div className='mxevt-report-modal' onClick={onClose}>
          <div className='main-body'>
            <div className='title'>
              Report video
              <div className='close' onClick={onClose}></div>
            </div>
            <div className='listItem' onClick={onClose.bind(this, 'spam')}>
              <div className='radio'></div>
              <span className='type'>Spam</span>
            </div>
            <div className='listItem' onClick={onClose.bind(this, 'violence')}>
              <div className='radio'></div>
              <span className='type'>Violence</span>
            </div>
            <div
              className='listItem'
              onClick={onClose.bind(this, 'pornography')}
            >
              <div className='radio'></div>
              <span className='type'>Pornography</span>
            </div>
            <div
              className='listItem'
              onClick={onClose.bind(this, 'child abuse')}
            >
              <div className='radio'></div>
              <span className='type'>Child Abuse</span>
            </div>
            <div className='listItem' onClick={onClose.bind(this, 'Copyright')}>
              <div className='radio'></div>
              <span className='type'>Copyright</span>
            </div>
            <div className='listItem' onClick={onClose.bind(this, 'other')}>
              <div className='radio'></div>
              <span className='type'>Other</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
