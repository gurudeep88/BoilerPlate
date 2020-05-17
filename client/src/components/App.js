import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Login from './RegisterLogin/Login';
import Register from './RegisterLogin/Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
