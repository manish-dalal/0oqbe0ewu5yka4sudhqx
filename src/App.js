import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Video from './component/Video';
import Home from './component/Home';
import IframeRender from './component/Iframe';

const COMPONENT_DELAY = 0;

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
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <div />
        </header>
        <Switch>
          <Route exact path='/:type/:videoId' component={Video} />

          <Route
            exact
            path='/privacy-policy'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Privacy {...pr} />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path='/term-and-condition'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Terms {...pr} />
              </React.Suspense>
            )}
          />
          <Route
            exact
            path='/disclaimer'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <Disclaimer {...pr} />
              </React.Suspense>
            )}
          />

          <Route
            exact
            path='/contact'
            render={(pr) => (
              <React.Suspense fallback={<div>Loading...</div>}>
                <IframeRender {...pr} static={contactFormUrl} />
              </React.Suspense>
            )}
          />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
