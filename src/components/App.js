import React from 'react';
import '../styles/App.css';

// Custom Components
import Header from './Header'
import LinkList from './LinkList'
import CreateLink from './CreateLink'

// Routing Components
import { Switch, Route } from 'react-router-dom'

function App(props) {
  return (
    <div className="center w85">
      <Header />
      
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path='/' component={() => <LinkList client={props.client} />} />
          <Route exact path='/create' component={() => <CreateLink client={props.client} />} />
        </Switch>
      </div>
    </div>
  )
}

export default App;
