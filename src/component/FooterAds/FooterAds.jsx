import React, { useEffect, useState, useRef } from 'react';
import './FooterAds.css';
import { config, iHostname } from '../../config';

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

const adPageSize = 5;
const getExoAdsArr = () => {
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
        '4685640',
        '4685642',
        '4685644',
        '4685646',
        '4685648',
        '4685650',
        '4685652',
        '4685654',
        '4685656',
        '4685658',
        '4685660',
        '4685662',
      ];
      break;
    default:
      break;
  }
  return exoAdsArr;
};

export default function MdiskInfo({ isLoading }) {
  const exoAdsArr = getExoAdsArr();
  const [count, setcount] = useState(adPageSize);
  const timerRef = useRef(null);

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
    if (!isLoading) {
      timerRef.current = setTimeout(() => {
        const nextCount = count + adPageSize;
        if (count < exoAdsArr.length) {
          setcount(nextCount);
          window.AdProvider.push({ serve: {} });
        } else {
          timerRef.current && clearTimeout(timerRef.current);
        }
      }, 1000);
      return () => timerRef.current && clearTimeout(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, count]);

  const paginateArr = exoAdsArr.slice(
    0,
    count > exoAdsArr.length ? exoAdsArr.length : count
  );
  return (
    <div className='MdiskInfo'>
      {!isLoading && (
        <div className='MdiskInfo-ads'>
          {shuffle(paginateArr).map((el, index) => (
            <ins
              className='adsbyexoclick'
              data-zoneid={el}
              key={`ad-${el}`}
            ></ins>
          ))}
        </div>
      )}
    </div>
  );
}
