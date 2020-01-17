import React, { Component } from "react";
import { Layout, message } from "antd";
import { connect } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { getUserMessage, getWeather } from "../../redux/action";
import LeftNav from "../../components/left-nav/left-nav";
import Heade from "../../components/header/header";
import "./index.less";
import Home from "../home/home";
import Bar from "../chats/bar";
import Line from "../chats/line";
import Pie from "../chats/pie";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Category from "../category/category";

const { Content, Footer } = Layout;
class Admin extends Component {
  UNSAFE_componentWillMount() {
    const userid = Cookies.get("userid");
    if (userid) {
      this.props.getUserMessage();
    }
    this.props.getWeather();
  }
  componentDidMount() {
    const { user } = this.props;
    if (user) {
      message.success("登录成功");
    }
  }

  render() {
    const userid = Cookies.get("userid");
    if (!userid) {
      return <Redirect to="/login" />;
    }
    const { user, weather } = this.props;
    //console.log(weather);

    const username = user.username;
    //console.log(username);

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <LeftNav />
        <Layout>
          <Heade username={username} weather={weather} />
          <Content style={{ margin: "0 16px" }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb> */}
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/category" component={Category} />
                <Route path="/product" component={Product} />
                <Route path="/role" component={Role} />
                <Route path="/user" component={User} />
                <Route path="/charts/bar" component={Bar} />
                <Route path="/charts/line" component={Line} />
                <Route path="/charts/pie" component={Pie} />
                <Redirect to="home" />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Lychee Backstage ©2020 Created by cth
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect(
  state => ({ user: state.user, weather: state.weather }),
  { getUserMessage, getWeather }
)(Admin);
