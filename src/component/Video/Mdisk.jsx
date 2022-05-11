import React, { useEffect } from 'react';
import './mdisk.css';
import Report from '../Report';
import Play from '../MdiskInfo/Play';
import MdiskDetail from '../MdiskInfo/MdiskDetail';
import { transformMdiskGet, isIOS } from '../../utils/mdisk';

export default function Mdisk({
  videoId,
  height,
  onLoad,
  videoData,
  setvideoData: propSetvideoData,
}) {
  useEffect(() => {
    if (videoId) {
      let apiUrl = `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${videoId}`;
      if (isIOS) apiUrl = apiUrl + '&sys=ios';
      let params = { url: apiUrl };
      const url = new URL(`https://diskuploader.glitch.me/api/msc/get`);
      url.search = new URLSearchParams(params);
      fetch(url.href)
        .then((response) => response.json())
        .then(({ data }) => {
          onLoad();
          const newData = transformMdiskGet(data);
          propSetvideoData(newData);
        });
    }
  }, []);

  return (
    <div className='mdisk-cp' style={{ height }}>
      <Report videoData={videoData} />
      <Play videoData={videoData} />
      <MdiskDetail videoData={videoData} />
    </div>
  );
}

{
  // height={3660}
  /* <Iframe
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
      /> */
}
