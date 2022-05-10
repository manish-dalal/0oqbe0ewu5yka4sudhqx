import React, { useState } from 'react';
import './Play.css';
import {
  onPlay,
  convertToMMSS,
  isIOS,
  onSimplePlay,
  onDownload,
  onSimpleDownload,
} from '../../utils/mdisk';

export default function Play({ videoData }) {
  const [showOtherOptions, setshowOtherOptions] = useState(false);
  return (
    <div className='play'>
      <div
        className='disk-video'
        style={{
          height: Math.min(window.innerWidth, 480) * 0.6428571428571429,
        }}
        onClick={() => onPlay('playButtonClickedSp', videoData)}
      >
        <div className='video-cover'>
          <div className='videoplay'></div>
          <div className='videotext'>Click to play</div>
        </div>
        <div className='video-duration t-14 t-white'>
          {convertToMMSS(videoData ? videoData.duration : 0)}
        </div>
      </div>
      <ul className='disk-btns'>
        <li>
          <div
            className='btn-item t-white t-12'
            onClick={() => onDownload(videoData)}
          >
            <span className='btn-txt btn-download'>Download Video</span>
          </div>
        </li>
        <li>
          <div
            className='btn-item t-white t-12'
            onClick={() => onPlay('playonlineClickedSp', videoData)}
          >
            <span className='btn-txt btn-play'>Play Online</span>
          </div>
        </li>
      </ul>
      {showOtherOptions && (
        <div className='simple-player-2'>
          <div className='option-title'>Option2</div>
          <ul className='disk-btns'>
            <li>
              <div
                className='btn-item t-white t-12'
                onClick={() => onSimpleDownload(videoData)}
              >
                <span className='btn-txt btn-download'>Download Video</span>
              </div>
            </li>
            <li>
              <div
                className='btn-item t-white t-12'
                onClick={() => onSimplePlay('splayonlineClickedSp', videoData)}
              >
                <span className='btn-txt btn-play'>Play Online</span>
              </div>
            </li>
          </ul>
        </div>
      )}
      {!isIOS && !showOtherOptions && (
        <div
          className='option-toggle'
          onClick={() => setshowOtherOptions(true)}
        >
          MORE PLAYER
        </div>
      )}
    </div>
  );
}
