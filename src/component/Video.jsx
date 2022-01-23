import React from 'react';
import { useParams } from 'react-router-dom';
import Dood from './Dood';
import Mdisk from './Mdisk';

export default function Video() {
  let { type, videoId = '' } = useParams();
  if (videoId) {
    document.title = type === 'd' ? 'Doodstream' : 'Mdisk';
  }
  const height =
    window.innerHeight < 780 ? window.innerHeight : window.innerHeight - 10;

  const epWidth =
    window.innerWidth < 480 ? window.innerWidth : window.innerWidth - 20;
  const width = epWidth >= height ? epWidth - (epWidth - height) / 3 : epWidth;
  const props = { width, height };
  if (type === 'd') {
    return <Dood videoId={videoId} {...props} />;
  }
  return <Mdisk videoId={videoId} width={epWidth} height={1000} />;
}
