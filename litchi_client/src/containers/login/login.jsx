import React ,{Component} from 'react'
import {Input,Row,Col, Button,Icon,Form,message} from 'antd'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/action'
import './login.less'
 class Login extends Component{
    handlSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {username,password} = values
                this.props.login(username,password)
                message.success('登录成功')
                
            } else{
                console.log('校验失败')
            }
          });
    }
    componentDidCatch(){
        
    }
    validatorPwd = (rule, value, callback) => {
        if(!value){
            callback('必须填写密码')
        } else if(value.length < 4){
            callback('密码必须大于等于4位')
        } else if(value.length > 12){
            callback('密码必须大于等于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是字母或数字或下划线组成!')
        } else {
            callback()
        }
    }
    render(){
        
        const form = this.props.form
        const {getFieldDecorator} = form
        const {user} = this.props
        if(user.status === 0){
            return <Redirect to={this.props.user.path} />
        }
        
        
        return(
            <div className="login">
                <Row type="flex" align="middle" justify="space-around">
                    <Col type="flex" align="left"  className="form" span={6}>
                        <Form onSubmit={this.handlSubmit}>
                            <h1 className="login_text">Login</h1>
                            <Form.Item>
                                {
                                    getFieldDecorator('username',{
                                        rules:[
                                            { required: true, whitespace:true, message: '必须填写!' },
                                            { whitespace:true, message: '不能有空格！' },
                                            { min: 4, message: '最小四位！' },
                                            { max: 12, message: '最长12位!' },
                                            { pattern:/^[a-zA-Z0-9_]+$/, message: '必须是字母或数字或下划线!' },
                                        ]
                                    })(
                                        <Input className="Input"  size="large"  placeholder="用户名"  />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('password',{
                                        rules:[{
                                            validator:this.validatorPwd
                                        }]
                                    })(
                                        <Input className="Input" size="large"  type="password"  placeholder="密码" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" className="Button" type="default" size="large" shape="round"><Icon type="login" />登录</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="register">注册一个用户</span>
                            </Form.Item>
                           
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Wraplogin = Form.create()(Login)
export default connect(
    state => ({user:state.user}),
    {login}
)(Wraplogin)