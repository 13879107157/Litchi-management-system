import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Layout,Modal} from 'antd';

import './index.less'
import {getWeather} from '../../redux/action'
const { Header } = Layout;
class Heade extends Component {
    state = {
        visible: false
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
      showModal = () => {   //退出对话框
        this.setState({
          visible: true,
        });
      };
      UNSAFE_componentWillMount(){
        this.props.getWeather()
      }

    render() {
        const {weather} = this.props
        if(weather === 0){
            return null
        }
        //console.log(weather);
        
        const {wea,wea_img} = weather
        
        return (
            <Header className="header">
                <div className="header-top">
                    欢迎{this.props.username}
                    &nbsp;&nbsp;&nbsp;
                    <span onClick={this.showModal} type="danger">退出</span>
                </div>
                <hr/>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2019-12-31 9:50:00</span>
                        <img src={require(`../../assets/imges/weather/${wea_img}.png`)} alt=""/>
                        <span>{wea}</span>
                    </div>
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
    state => ({weather:state.weather}),
    {getWeather}
)(withRouter(Heade)) 