import React, { useEffect, useState, useRef } from 'react';
import './FooterAds.css';
import { config, iHostname } from '../../config';

const adPageSize = 8;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

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
        // '4668718',
        // '4687228',
        // '4687230',
        // '4687232',
        // '4687234',
        // '4687236',
        // '4687238',
        // '4687240',
        // '4687242',
        // '4687244',
        // '4687246',
        // '4687248',
        // '4687250',
        // '4687252',
        // '4687254',
        // '4687256',
        // '4687258',
        // '4687260',
        // '4687262',
        // '4687264',
        // '4687266',
        // '4687274',
        // '4687276',
        // '4687278',
        // '4687280',
        // '4687282',
        // '4687284',
        // '4687286',
        // '4687288',
        // '4687290',
        // '4687292',
        // '4687294',
        // '4687296',
        // '4687298',
        // '4687300',
        // '4687304',
        // '4687306',
        // '4687308',
        // '4687310',
        // '4687312',
        // '4687314',
        // '4687316',
        // '4687318',
        // '4687320',
        // '4687322',
        // '4687324',
        // '4687326',
        // '4687328',
        // '4687330',
        // '4687332',
        // '4687334',
        // '4687336',
        // '4687338',
        // '4687340',
        // '4687342',
        // '4687344',
        // '4687346',
        // '4687348',
        // '4687350',
        // '4687352',
        // '4687354',
        // '4687416',
        // '4687418',
        // '4687420',
        // '4687422',
        // '4687424',
        // '4687428',
        // '4687430',
        // '4687432',
        // '4687434',
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
        // '4679772',
        // '4679774',
        // '4679778',
        // '4679780',
        // '4685640',
        // '4685642',
        // '4685644',
        // '4685646',
        // '4685648',
        // '4685650',
        // '4685652',
        // '4685654',
        // '4685656',
        // '4685658',
        // '4685660',
        // '4685662',
        // '4685670',
        // '4685672',
        // '4685674',
        // '4685676',
        // '4685678',
        // '4685680',
        // '4685682',
        // '4685684',
        // '4685686',
        // '4685688',
        // '4685690',
        // '4685692',
        // '4685694',
        // '4685696',
        // '4685698',
        // '4685700',
        // '4687102',
        // '4687104',
        // '4687106',
        // '4687108',
        // '4687112',
        // '4687114',
        // '4687116',
        // '4687118',
        // '4687120',
        // '4687122',
        // '4687124',
        // '4687126',
        // '4687140',
        // '4687144',
        // '4687146',
        // '4687148',
        // '4687152',
        // '4687154',
        // '4687156',
        // '4687158',
        // '4687160',
        // '4687162',
        // '4687164',
        // '4687166',
        // '4687168',
        // '4687170',
        // '4687172',
        // '4687174',
        // '4687176',
        // '4687178',
        // '4687180',
        // '4687182',
        // '4687184',
        // '4687186',
        // '4687188',
        // '4687190',
        // '4687192',
        // '4687194',
        // '4687196',
        // '4687198',
      ];
      break;
    default:
      break;
  }
  return shuffle(exoAdsArr);
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
      }, 2000);
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
          {paginateArr.map((el, index) => (
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
