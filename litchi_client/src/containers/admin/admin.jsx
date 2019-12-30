import React ,{Component} from 'react'
import { Layout,Icon ,message,Button,Modal} from 'antd'
import {connect} from 'react-redux'
import {Redirect,Switch,Route, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {getUserMessage} from '../../redux/action'
import LeftNav from '../../components/left-nav/left-nav'
import './index.less'
import Home from '../home/home'
import cetegory from '../category/category'
import Bar from '../chats/bar'
import Line from '../chats/line'
import Pie from '../chats/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Category from '../category/category'


const { Header, Content, Footer } = Layout;
class Admin extends Component{
    state = {
        collapsed: false,
        visible: false
    };
    showModal = () => {   //退出对话框
      this.setState({
        visible: true,
      });
    };
    handleOk = () => {
      Cookies.remove('userid')
      this.props.history.replace('/login')
      this.setState({
        visible: false,
      });
    };
    handleCancel = () => {
      this.setState({
        visible: false,
      });
    };
    componentWillMount(){
      const userid = Cookies.get('userid')
      if(userid){
        this.props.getUserMessage()
      }
      
    }
    componentDidMount(){
      const {user} = this.props
      if(user){
        message.success('登录成功')
      }
    }


    render(){
        const userid = Cookies.get('userid')
        if(!userid){
          return <Redirect to='/login' />
        }
        const {user} = this.props
       
        const username = user.username
        console.log(username);
        
        return (
            <Layout style={{ minHeight: '100vh' }}>
              <LeftNav />
              <Layout>
                <Header style={{ background: '#fff', padding: 0 ,marginBottom:16}} >
                  欢迎{username}
                  <Button onClick={this.showModal} type="danger">退出</Button>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                  {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb> */}
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Switch>
                      <Route path='/home' component={Home} />
                      <Route path='/category' component={Category} />
                      <Route path='/product' component={Product} />
                      <Route path='/role' component={Role} />
                      <Route path='/user' component={User} />
                      <Route path='/charts/bar' component={Bar} />
                      <Route path='/charts/line' component={Line} />
                      <Route path='/charts/pie' component={Pie} />
                      <Redirect to='home' />
                    </Switch>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
              </Layout>
              <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                centered={true}
                mask={true}  
              >
                <h1>确定要退出登陆吗</h1>
              </Modal>
            </Layout>
          );
    }
}
export default connect(
    state => ({user:state.user}),
    {getUserMessage}
)(Admin)