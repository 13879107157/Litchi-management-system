import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout,Modal,Button} from 'antd';

import './index.less'
import {getWeather} from '../../redux/action'
import menuList  from '../../config/menuConfig'
const { Header } = Layout;
class Head extends Component {
  state = {
      visible: false
  };
  UNSAFE_componentWillMount(){
   // this.props.getWeather()
  }
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
  showModal = () => {   //退出对话框
    this.setState({
      visible: true,
    });
  };
  getTitle = () => {
    const path = this.props.history.location.pathname   //当前路径
    let title
    menuList.forEach(item => {
      if(item.key === path){
        title = item.title
      } else if(item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title
  }
  render() {
      //天气调试接口出错了暂时用不了，如果解开注释会导致head不显示
      //const {weather} = this.props
      // if(weather === 0){
      //     return null
      // }
      //console.log(weather);
      // const {wea,wea_img,date} = weather
      const title = this.getTitle()
      //console.log(title);
      
      return (
          <Header className="header">
              <div className="header-top">
                  <span>
                    欢迎{this.props.username}
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <Button className="logout"  type="danger" onClick={this.showModal}>退出</Button>
              </div>
              <hr/>
              <div className="header-bottom">
                  <div className="header-bottom-left">{title}</div>
                  {/* <div className="header-bottom-right">
                      <span>{date}</span>
                      <img src={require(`../../assets/imges/weather/${wea_img}.png`)} alt=""/>
                      <span>{wea}</span>
                  </div> */}
              </div>

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
          
      );
  }
}

export default connect(
    //state => ({weather:state.weather}),
    //{getWeather}
)(withRouter(Head)) 