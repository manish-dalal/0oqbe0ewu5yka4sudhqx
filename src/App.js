import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Video from './component/Video';
import Home from './component/Home';
import IframeRender from './component/Iframe';

const footerRoute = [
  {
    key: 'disclaimer',
    path: '/disclaimer',
    static: '/static/disclaimer.html',
  },
  {
    key: 'term-and-condition',
    path: '/term-and-condition',
    static: '/static/terms_conditions.html',
  },
  {
    key: 'privacy-policy',
    path: '/privacy-policy',
    static: '/static/privacy_policy.html',
  },
  {
    key: 'contact',
    path: '/contact',
    static:
      'https://docs.google.com/forms/d/e/1FAIpQLSdXoWMu2gTDcvUHWd_Jnd8AAvhDg2F-hNBcnV4lgcWkZiKHvA/viewform?embedded=true',
  },
];
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <div />
        </header>
        <Switch>
          <Route exact path='/:type/:videoId' component={Video} />
          <Route exact path='/' component={Home} />
          {footerRoute.map((e) => (
            <Route
              exact
              key={e.key}
              path={e.path}
              render={() => <IframeRender static={e.static} />}
            />
          ))}

          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
