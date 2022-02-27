import React, { useEffect, useState } from 'react';
import './MdiskInfo.css';
import moment from 'moment';

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

export default function MdiskInfo({ videoId }) {
  const [videoData, setvideoData] = useState({
    display_name: 'Ano91',
    ts: moment(),
  });
  useEffect(() => {
    window.AdProvider = window?.AdProvider || [];
    window.AdProvider.push({ serve: {} });
    var jsElm1 = document.createElement('script');
    jsElm1.async = true;
    jsElm1.type = 'application/javascript';
    jsElm1.src = 'https://a.exdynsrv.com/ad-provider.js';
    document.head.appendChild(jsElm1);
  }, []);

  useEffect(() => {
    let params = {
      url: `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${videoId}`,
    };
    const url = new URL(`https://diskuploader.glitch.me/api/msc/get`);
    url.search = new URLSearchParams(params);
    fetch(url.href)
      .then((response) => response.json())
      .then(({ data }) => {
        const newData = { ...data, ts: moment() };
        setvideoData(newData);
      });
  }, [videoId]);

  const {
    display_name = '',
    ts,
    width = 0,
    height = 0,
    size: fileSize = 0,
  } = videoData;
  return (
    <div className='MdiskInfo'>
      <div class='disk-details'>
        <div class='t-12'>
          <div class='info-title'>Video Information</div>
          {display_name && (
            <span class='info-user'>{`${display_name.substr(
              0,
              2
            )}***${display_name.substr(-2, 2)} · `}</span>
          )}
          <span class='info-time'>{` ${ts.format('D MMM YYYY')} · `}</span>
          {(width || height) && (
            <span class='info-resolution'>{`${width}*${height} · `}</span>
          )}
          {fileSize && <span class='info-size'>{videoSize(fileSize)}</span>}
        </div>
      </div>
      <ins class='adsbyexoclick' data-zoneid='4577190'></ins>
      <ins class='adsbyexoclick' data-zoneid='4577194'></ins>
      <ins class='adsbyexoclick' data-zoneid='4615354'></ins>
      <ins class='adsbyexoclick' data-zoneid='4577184'></ins>
      <ins class='adsbyexoclick' data-zoneid='4577102'></ins>
      <ins class='adsbyexoclick' data-zoneid='4615360'></ins>
    </div>
  );
}
