import React ,{Component} from 'react'
import { Layout, Menu, Icon} from 'antd'
import {Link,withRouter} from 'react-router-dom'

import menuList from '../../config/menuConfig'
const {  Sider } = Layout;
const { SubMenu } = Menu

class LeftNav extends Component{
    state = {
        collapsed: false,
    };
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    //根据menu的数据数组生成对应的标签数组  map()+递归调用
    getMenuNodes = (menuList) => {
        return  menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key} >
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const path = this.props.location.pathname
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    this.openKey = item.key
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
                )
            }
         })
    }
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render(){
        const path = this.props.location.pathname
        const {openKey} = this
        console.log(typeof(path));
        
        return(
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]} mode="inline">
                {this.menuNodes}
                </Menu>
              </Sider>
        )
    }
}
export default withRouter(LeftNav)