import React ,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom';

import Home from './home'
import Detail from './detail'
import AddUpdateItem from './addupdateitem'
//商品路由
export default class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path='/product' component={Home} exact />
                <Route path='/product/detail' component={Detail} />
                <Route path='/product/addupdateitem' component={AddUpdateItem} />
                <Redirect to='/home/' />
            </Switch>
        )
    }
}