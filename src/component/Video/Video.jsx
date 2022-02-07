import React from 'react';
import { useParams } from 'react-router-dom';
import Dood from './Dood';
import Mdisk from './Mdisk';
import './video.css';

// function useQuery() {
//   const { search } = useLocation();
//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }
export default function Video() {
  let { type = '', videoId = '' } = useParams();
  // let query = useQuery();
  if (videoId) {
    document.title = type === 'd' ? 'Doodstream' : 'Mdisk';
  }
  const height =
    window.innerHeight < 780 ? window.innerHeight : window.innerHeight - 10;

  const epWidth =
    window.innerWidth < 480 ? window.innerWidth : window.innerWidth - 20;
  const width = epWidth >= height ? epWidth - (epWidth - height) / 3 : epWidth;
  const props = { width, height };

  const frameWidthStyle = type === 'm' ? { width: Math.min(480, width) } : {};

  React.useEffect(() => {
    window.dataLayer.push({ event: 'video_open', id: videoId || '' });
    // const adsbygoogle = window.adsbygoogle || [];
    // adsbygoogle.push({});
    // if (query.get('name') === 'adsterra') {
    //   var jsElm = document.createElement('script');
    //   jsElm.type = 'text/javascript';
    //   jsElm.src = `http${
    //     window.location.protocol === 'https:' ? 's' : ''
    //   }://www.effectivedisplaycontent.com/6634c8b1f09e21894be3b2fdfb266a45/invoke.js`;
    //   document.head.appendChild(jsElm);
    // }
    // var jsElm1 = document.createElement('script');
    // jsElm1.type = 'text/javascript';
    // jsElm1['data-cfasync'] = false;
    // jsElm1.src = '//neon.today/native/script/70082/19696';
    // document.head.appendChild(jsElm1);
    // window.adsbyjuicy = window?.adsbyjuicy || [];
    // window.adsbyjuicy.push({ adzone: 965364 });
    // window.adsbyjuicy.push({ adzone: 965365 });
    // window.adsbyjuicy.push({ adzone: 965366 });
    // window.adsbyjuicy.push({ adzone: 965610 });
    // var jsElm1 = document.createElement('script');
    // jsElm1.async = true;
    // jsElm1.type = 'text/javascript';
    // jsElm1['data-cfasync'] = false;
    // jsElm1.src = 'https://poweredby.jads.co/js/jads.js';
    // document.head.appendChild(jsElm1);
    // window.adsbygoogle = window?.adsbygoogle || [];
    // window.adsbygoogle.push({});
    // var jsElm1 = document.createElement('script');
    // jsElm1.async = true;
    // jsElm1.type = 'text/javascript';
    // jsElm1.crossorigin = 'anonymous';
    // jsElm1.src =
    //   'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4392956658341040';
    // document.head.appendChild(jsElm1);
    // var jsElm1 = document.createElement('script');
    // jsElm1.type = 'application/javascript';
    // jsElm1.src = '//a.realsrv.com/ad-provider.js';
    // document.head.appendChild(jsElm1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='video-app'>
      {type === 'd' ? (
        <Dood videoId={videoId} {...props} />
      ) : (
        <Mdisk videoId={videoId} width={epWidth} height={1000} />
      )}
      <div className='ad-header' style={frameWidthStyle}>
        {/* <ins id='965364' data-width='300' data-height='100'></ins> */}
        {/* <script data-cfasync='false' type='text/javascript' src='//neon.today/native/script/70082/19696/'></script> */}

        <div
          className='ad-overlay'
          onClick={() => {
            window.open('https://t.me/premium_stocks', '_blank');
            window.dataLayer.push({ event: 'click_header_ad' });
          }}
        />
      </div>
      {/* {type !== 'd' && (
        <div className='ad-footer-1' style={frameWidthStyle}>
          <ins id='965366' data-width='728' data-height='90'></ins>
          <ins id='965610' data-width='300' data-height='50'></ins>
        </div>
      )} */}
      {/* <div className='ad-footer'>
        <ins
          className='adsbygoogle'
          style={{
            display: 'inline-block',
            width: 480,
            height: 180,
            position: 'absolute',
          }}
          data-ad-client='ca-pub-4392956658341040'
          data-ad-slot='6430092690'
        ></ins>
        <ins id='965365' data-width='300' data-height='250'></ins>
        <iframe
          title='exo-iframe'
          src={`//a.exdynsrv.com/iframe.php?idzone=${
            width > 500 ? '4577194&size=900x250' : '4577102&size=300x250'
          }`}
          width={width > 500 ? '900' : '300'}
          height='250'
          scrolling='no'
          marginWidth='0'
          marginHeight='0'
          frameBorder='0'
        ></iframe>
      </div> */}
    </div>
  );
}
