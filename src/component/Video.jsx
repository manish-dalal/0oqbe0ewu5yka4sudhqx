import React from 'react';
import { useParams } from 'react-router-dom';

export default function Video() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { type, videoId = '' } = useParams();

  return (
    <div>
      Video
      <h3>videoId: {videoId}</h3>
      <h3>type: {type}</h3>
    </div>
  );
}
