import React ,{Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon ,message,Button,Modal} from 'antd'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {getUserMessage} from '../../redux/action'
//import Login from '../login/login'
import './index.less'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu
class Admin extends Component{
    state = {
        collapsed: false,
        visible: false
    };
    onCollapse = collapsed => {
    //console.log(collapsed);
    this.setState({ collapsed });
    };
    showModal = () => {
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
      //debugger
      const userid = Cookies.get('userid')
      //console.log(userid);
      //const _id = user.data._id
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
/*     componentDidMount(){
      this.props.getUser()
    } */

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
              <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="user" />
                        <span>User</span>
                      </span>
                    }
                  >
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="team" />
                        <span>Team</span>
                      </span>
                    }
                  >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9">
                    <Icon type="file" />
                    <span>File</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }} >
                    欢迎{username}
                    <Button onClick={this.showModal} type="danger">退出</Button>
                    <Modal
                    
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      centered={true}
                      mask={true}
                      
                  >
                    <h1>确定要退出登陆吗</h1>
                  </Modal>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
              </Layout>
            </Layout>
          );
    }
}
export default connect(
    state => ({user:state.user}),
    {getUserMessage}
)(Admin)