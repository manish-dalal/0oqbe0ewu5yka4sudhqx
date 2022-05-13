import React, { useState, useRef } from 'react';
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
  const Ref = useRef(null);

  const handleWaitFunction = (fun = () => {}) => {
    if (videoData) {
      fun();
      if (Ref.current) clearInterval(Ref.current);
    } else {
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        handleWaitFunction(fun);
      }, 400);
      Ref.current = id;
    }
  };
  return (
    <div className='play'>
      <div
        className='disk-video'
        style={{
          height: Math.min(window.innerWidth, 480) * 0.6428571428571429,
        }}
        onClick={() =>
          handleWaitFunction(() => onPlay('playButtonClickedSp', videoData))
        }
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
            onClick={() => handleWaitFunction(() => onDownload(videoData))}
          >
            <span className='btn-txt btn-download'>Download Video</span>
          </div>
        </li>
        <li>
          <div
            className='btn-item t-white t-12'
            onClick={() =>
              handleWaitFunction(() => onPlay('playonlineClickedSp', videoData))
            }
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
                onClick={() =>
                  handleWaitFunction(() => onSimpleDownload(videoData))
                }
              >
                <span className='btn-txt btn-download'>Download Video</span>
              </div>
            </li>
            <li>
              <div
                className='btn-item t-white t-12'
                onClick={() =>
                  handleWaitFunction(() =>
                    onSimplePlay('splayonlineClickedSp', videoData)
                  )
                }
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
