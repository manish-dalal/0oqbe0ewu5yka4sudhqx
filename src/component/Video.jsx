import React from 'react';
import { useParams } from 'react-router-dom';
import Dood from './Dood';
import Mdisk from './Mdisk';

export default function Video() {
  let { type, videoId = '' } = useParams();
  const width =
    window.innerWidth < 480 ? window.innerWidth : window.innerWidth - 20;

  const height =
    window.innerHeight < 780 ? window.innerHeight : window.innerHeight - 10;
  const props = { width, height };
  if (type === 'd') {
    return <Dood videoId={videoId} {...props} />;
  }
  return <Mdisk videoId={videoId} width={480} height={1000} />;
}
