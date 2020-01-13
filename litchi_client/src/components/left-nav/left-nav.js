import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import menuList from "../../config/menuConfig";
import storage from "../../utils/storage";
const { Sider } = Layout;
const { SubMenu } = Menu;

class LeftNav extends Component {
  state = {
    collapsed: false
  };
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  //根据menu的数据数组生成对应的标签数组  map()+递归调用
  getMenuNodes = menuList => {
    return menuList.map(item => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          const path = this.props.location.pathname;
          const cItem = item.children.find(
            cItem => path.indexOf(cItem.key) === 0
          );
          if (cItem) {
            this.openKey = item.key;
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
    });
  };
  hasAuth = item => {
    const { key, isPublic } = item;

    const menus = storage.getUser().role.menus;
    const username = storage.getUser().username;
    /*
    1. 如果当前用户是admin
    2. 如果当前item是公开的
    3. 当前用户有此item的权限: key有没有menus中
     */
    if (username === "admin" || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key) !== -1);
    }

    return false;
  };

  render() {
    //console.log(storage.getUser());
    let path = this.props.location.pathname;
    if (path.indexOf("/product") === 0) {
      path = "/product";
    }
    const { openKey } = this;
    //console.log(typeof(path));

    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
        >
          {this.menuNodes}
        </Menu>
      </Sider>
    );
  }
}
export default withRouter(LeftNav);
