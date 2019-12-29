import React ,{Component} from 'react'
import {BrowserRouter,Route,Switch,} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './containers/login/login'
import Admin from  './containers/admin/admin'
import store from './redux/store'

export default class App extends Component{
    render(){
        return(
            <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' component={Admin}></Route>
                    <Route component={Admin} />
                </Switch>
            </BrowserRouter>
        </Provider>
        )
    }
}