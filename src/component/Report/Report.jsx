import React, { useState } from 'react';
import './report.css';
import { useParams } from 'react-router-dom';

export default function Report() {
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
    <>
      <div
        class='report'
        onClick={() => {
          setshow(true);
        }}
      >
        <div class='warning'></div>
        <div class='label-report'>Report</div>
      </div>
      {show && (
        <div class='mxevt-report-modal' onClick={onClose}>
          <div class='main-body'>
            <div class='title'>
              Report video
              <div class='close' onClick={onClose}></div>
            </div>
            <div class='listItem' onClick={onClose.bind(this, 'spam')}>
              <div class='radio'></div>
              <span class='type'>Spam</span>
            </div>
            <div class='listItem' onClick={onClose.bind(this, 'violence')}>
              <div class='radio'></div>
              <span class='type'>Violence</span>
            </div>
            <div class='listItem' onClick={onClose.bind(this, 'pornography')}>
              <div class='radio'></div>
              <span class='type'>Pornography</span>
            </div>
            <div class='listItem' onClick={onClose.bind(this, 'child abuse')}>
              <div class='radio'></div>
              <span class='type'>Child Abuse</span>
            </div>
            <div class='listItem' onClick={onClose.bind(this, 'Copyright')}>
              <div class='radio'></div>
              <span class='type'>Copyright</span>
            </div>
            <div class='listItem' onClick={onClose.bind(this, 'other')}>
              <div class='radio'></div>
              <span class='type'>Other</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
