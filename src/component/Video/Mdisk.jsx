import React, { useEffect } from 'react';
import './mdisk.css';
import Report from '../Report';
import Play from '../MdiskInfo/Play';
import MdiskDetail from '../MdiskInfo/MdiskDetail';
import { transformMdiskGet } from '../../utils/mdisk';

export default function Mdisk({
  videoId,
  height,
  onLoad,
  videoData,
  setvideoData: propSetvideoData,
}) {
  useEffect(() => {
    if (videoId) {
      let params = {
        url: `https://diskuploader.entertainvideo.com/v1/file/cdnurl?param=${videoId}`,
      };
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
  }, [videoId, propSetvideoData]);

  return (
    <div className='mdisk-cp' style={{ height }}>
      <Report videoData={videoData} />
      <Play videoData={videoData} />
      <MdiskDetail videoData={videoData} />
    </div>
  );
}
