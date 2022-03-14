import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { config, iHostname } from './config';

const COMPONENT_DELAY = 0;

const Header = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/Header');
});

const Footer = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/Footer');
});

const Home = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/Home');
});

const Video = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/Video');
});

const IframeRender = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/Iframe');
});

const Disclaimer = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/static/Disclaimer');
});

const Privacy = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/static/Privacy');
});

const Terms = React.lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, COMPONENT_DELAY));
  return import('./component/static/Terms');
});

const contactFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSdXoWMu2gTDcvUHWd_Jnd8AAvhDg2F-hNBcnV4lgcWkZiKHvA/viewform?embedded=true';

function App() {
  React.useEffect(() => {
    let activeId = '';
    let activeTagManagerId = '';
    switch (config.hostname) {
      case iHostname[0]:
        // UA-217866237-3
        activeId = 'G-W5SGDRRSJQ';
        activeTagManagerId = 'GTM-P9JHCQP';
        break;
      case iHostname[1]:
        // UA-217866237-2
        activeId = 'G-4T6KQT2X56';
        activeTagManagerId = 'GTM-N7K54DR';
        break;
      case iHostname[2]:
        // UA-217866237-1
        activeId = 'G-HCDP5N394E';
        activeTagManagerId = 'GTM-PVTZFTG';
        break;
      default:
        activeId = 'G-HCDP5N394E';
        activeTagManagerId = 'GTM-PVTZFTG';
        break;
    }

    if (activeId) {
      // <!-- Global site tag (gtag.js) - Google Analytics -->
      var jsElm1 = document.createElement('script');
      jsElm1.async = true;
      jsElm1.src = `https://www.googletagmanager.com/gtag/js?id=${activeId}`;
      document.head.appendChild(jsElm1);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', activeId);
    }
    if (activeTagManagerId) {
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js',
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l !== 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', activeTagManagerId);
    }
  }, []);
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/:type/:videoId'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Video {...pr} />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path='/privacy-policy'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Privacy {...pr} />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path='/term-and-condition'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Terms {...pr} />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path='/disclaimer'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Header />
                <Disclaimer {...pr} />
              </React.Suspense>
            )}
          />

          <Route
            exact
            path='/contact'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Header />
                <IframeRender {...pr} static={contactFormUrl} />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path='/:videoId'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Video {...pr} />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path='/'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Home {...pr} />
                <Footer />
              </React.Suspense>
            )}
          />
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
