import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Video from './component/Video';
import Home from './component/Home';

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
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
