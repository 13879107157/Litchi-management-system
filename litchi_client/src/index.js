import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch,} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './containers/login/login'
import Admin from  './containers/admin/admin'
import store from './redux/store'

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/admin' component={Admin}></Route>
                <Route component={Admin} />
            </Switch>
        </BrowserRouter>
    </Provider>
),document.getElementById('root'))


