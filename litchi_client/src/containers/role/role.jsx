import React, { Component } from "react";
import { Card, Table, Button, Modal, Input, Tree } from "antd";
import { connect } from "react-redux";

import {
  getRoleList,
  getAddRoleStatus,
  getUpdateRoleAuthStatus
} from "../../redux/action";
import { PAGESIZE } from "../../utils/constants";
import { formateDate } from "../../utils/index";
import menuList from "../../config/menuConfig.js";
const { TreeNode } = Tree;
//角色路由
class Role extends Component {
  state = {
    role: {},
    AddVisible: false,
    AuthVisible: false,
    roleNameValue: "",
    checkedKeys: []
  };
  //组件挂在前初始化Table和Tree数据
  UNSAFE_componentWillMount() {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: create_time => formateDate(create_time)
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: auth_time => formateDate(auth_time)
      },
      {
        title: "授权人",
        dataIndex: "auth_name"
      }
    ];

    this.treeNodes = this.getTreeNode(menuList);
  }
  componentDidMount() {
    this.props.getRoleList();
  }
  //点击行将role传入state
  onRow = role => {
    return {
      onClick: value => {
        //console.log(role);
        this.setState({ role, checkedKeys: role.menus });
      }
    };
  };
/* --------------------------------------------------------------------------------------------------------------------- */
  //显示添加角色modal
  showAddModal = () => {
    this.setState({
      AddVisible: true
    });
  };

  //添加角色按钮
  handleAddRole = () => {
    const { roleNameValue } = this.state;
    this.props.getAddRoleStatus(roleNameValue);
    this.setState({
      roleNameValue: "",
      AddVisible: false
    });
  };

  //关闭添加角色modal
  handleCancel = () => {
    this.setState({
      AddVisible: false
    });
  };

  //添加角色Input(受控)
  roleNameInput = e => {
    this.setState({ roleNameValue: e.target.value });
  };
/* --------------------------------------------------------------------------------------------------------------------- */
  //显示角色权限modal
  showAuthModal = () => {
    this.setState({ AuthVisible: true });
  };
  //修改权限按钮
  handleAuthRole = () => {
    const now = Date.now();
    const { role, checkedKeys } = this.state;
    const username = this.props.user.username;
    this.props.getUpdateRoleAuthStatus(role._id, checkedKeys, now, username);
    this.setState({ AuthVisible: false });
    this.props.history.replace('/login')
  };
  //关闭角色权限modal
  handleAuthCancel = () => {
    this.setState({ AuthVisible: false });
  };

  //获取树节点
  getTreeNode = menuList => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNode(item.children) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  };

  //选择复选框触发
  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };
  /* ----------------------------------------------------------------------------------------------------------------- */

  render() {
    //从redux获取到roles(角色列表)
    const { roles } = this.props;
    //取出单个角色对象
    const { role, checkedKeys } = this.state;
    //如果角色列表为空则返回空
    if (roles.length <= 0) {
      return null;
    }
    //console.log(roles)
    //Card标题
    const title = (
      <span>
        <Button type="primary" onClick={this.showAddModal}>
          创建角色
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;
        <Button onClick={this.showAuthModal} disabled={!role._id}>
          设置角色权限
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          rowKey="_id"
          loading={this.state.loading}
          dataSource={roles}
          columns={this.columns}
          onRow={this.onRow}
          rowSelection={{ type: "radio", selectedRowKeys: [role._id] }}
          pagination={{ defaultPageSize: PAGESIZE }}
        />

        {/* 添加角色Modal */}
        <Modal
          title="添加角色"
          visible={this.state.AddVisible}
          onOk={this.handleAddRole}
          onCancel={this.handleCancel}
          cancelText="关闭"
          okText="添加"
        >
          <span>角色名：</span>
          <Input
            style={{ width: "80%" }}
            value={this.state.roleNameValue}
            onChange={this.roleNameInput}
          />
        </Modal>

        {/* 修改角色权限Modal */}
        <Modal
          title="角色权限修改"
          visible={this.state.AuthVisible}
          onOk={this.handleAuthRole}
          onCancel={this.handleAuthCancel}
          cancelText="关闭"
          okText="修改权限"
        >
          <span>角色名：</span>
          <Input
            style={{ width: "80%" }}
            value={this.state.role.name}
            disabled
          />
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
          >
            <TreeNode title="权限管理" key="all">
              {this.treeNodes}
            </TreeNode>
          </Tree>
        </Modal>
      </Card>
    );
  }
}
export default connect(state => ({ roles: state.roles, user: state.user }), {
  getRoleList,    //获取角色列表
  getAddRoleStatus,     //获取添加角色
  getUpdateRoleAuthStatus
})(Role);
