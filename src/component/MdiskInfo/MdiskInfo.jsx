import React, { useEffect, useState } from 'react';
import './MdiskInfo.css';
import moment from 'moment';
import { config, iHostname } from '../../config';

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

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

export default function MdiskInfo({
  videoId,
  type,
  isLoading,
  setvideoData: propSetvideoData,
}) {
  const [videoData, setvideoData] = useState({
    display_name: '***',
    ts: '',
  });
  useEffect(() => {
    if (!isLoading) {
      window.AdProvider = window?.AdProvider || [];
      window.AdProvider.push({ serve: {} });
      var jsElm1 = document.createElement('script');
      jsElm1.async = true;
      jsElm1.type = 'application/javascript';
      jsElm1.src = 'https://a.exdynsrv.com/ad-provider.js';
      document.head.appendChild(jsElm1);
    }
  }, [isLoading]);

  useEffect(() => {
    if (type === 'm') {
      let params = {
        url: `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${videoId}`,
      };
      const url = new URL(`https://diskuploader.glitch.me/api/msc/get`);
      url.search = new URLSearchParams(params);
      fetch(url.href)
        .then((response) => response.json())
        .then(({ data }) => {
          const newData = { ...data };
          setvideoData(newData);
          propSetvideoData(newData);
        });
    }
  }, [videoId, type, propSetvideoData]);

  const {
    display_name = '',
    ts,
    width = 0,
    height = 0,
    size: fileSize = 0,
  } = videoData;

  let exoAdsArr = [
    '4577102',
    '4577184',
    '4577190',
    '4577194',
    '4615354',
    '4615360',
    '4616324',
  ];
  switch (config.hostname) {
    case iHostname[0]:
      exoAdsArr = [
        '4629292',
        '4629294',
        '4629296',
        '4629298',
        '4629300',
        '4629302',
        '4629382',
        '4668708',
        '4668712',
        '4668714',
        '4668716',
        '4668718',
      ];
      break;
    case iHostname[1]:
      exoAdsArr = [
        '4629384',
        '4629386',
        '4629388',
        '4629390',
        '4629392',
        '4629394',
        '4629398',
        '4668694',
        '4668696',
        '4668700',
        '4668702',
        '4668704',
      ];
      break;
    case iHostname[2]:
      break;
    case iHostname[3]:
      exoAdsArr = [
        '4679752',
        '4679754',
        '4679756',
        '4679758',
        '4679760',
        '4679764',
        '4679766',
        '4679768',
        '4679772',
        '4679774',
        '4679778',
        '4679780',
      ];
      break;
    default:
      break;
  }
  return (
    <div className='MdiskInfo'>
      {type === 'm' && (
        <div className='disk-details'>
          <div className='t-12'>
            <div className='info-title'>Video Information</div>
            {display_name && (
              <span className='info-user'>{`${display_name.substr(
                0,
                2
              )}***${display_name.substr(-2, 2)} · `}</span>
            )}
            {ts && (
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
      )}
      {!isLoading && (
        <div className='MdiskInfo-ads'>
          {shuffle(exoAdsArr).map((el, index) => (
            <ins
              className='adsbyexoclick'
              data-zoneid={el}
              key={`ad-${index}`}
            ></ins>
          ))}
        </div>
      )}
    </div>
  );
}
