import React from 'react';
import './Home.css';

export default function Home() {
  // React.useEffect(() => {
  //   var jsElm1 = document.createElement('script');
  //   jsElm1.crossorigin = 'anonymous';
  //   jsElm1.async = true;
  //   jsElm1.src =
  //     'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4392956658341040';
  //   document.head.appendChild(jsElm1);
  // }, []);
  return (
    <div className='home'>
      <div className='bg-image'></div>
      <div className='main-body container'>
        <img
          src='https://res.cloudinary.com/ddvaiwvwr/image/upload/v1647776300/fdisk.in/play_ygqo5c_mmlo5w.webp'
          alt='logo'
          className='main-logo'
        />
        <h4>The most reliable video streaming solution that helps you</h4>
        <h3>Deliver Video Content Anywhere</h3>
        <h5>
          A simplified video watching platform to watch and download your in
          minutes
        </h5>
      </div>
    </div>
  );
}
