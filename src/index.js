import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PlattegrondContainer from './containers/BlueprintContainer';
import HallContainer from './containers/SingleHallContainer';
import DeviceContainer from './containers/DeviceContainer';
import ActionContainer from './containers/ActionsContainer';
import 'bootstrap/dist/css/bootstrap.css';

import { Router, Route, IndexRoute,browserHistory } from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={PlattegrondContainer}/>
            <Route path='hall/:hallId'>
                <IndexRoute component={HallContainer}/>
                <Route path='apparaat/:deviceId' component={DeviceContainer}/>
            </Route>
            <Route path="acties" component={ActionContainer}/>
        </Route>
    </Router>
    , document.getElementById('root')
);
