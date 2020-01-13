import React, { Component } from "react";
import { Card, Table, Button, Modal, Form, Input, Select } from "antd";
import { connect } from "react-redux";
import {
  getRoleList,
  getUserList,
  getAddOrUpdateStatus,
  getDelUserStatus
} from "../../redux/action";
import LinkButton from "../../components/link-button/link-button";
import { formateDate } from "../../utils/index.js";
import { PAGESIZE } from "../../utils/constants";
import './index.less'
const Item = Form.Item;
//角色路由
class User extends Component {
  state = {
    addupdatevisible: false,
    delvisible:false
  };
  UNSAFE_componentWillMount() {
    this.columns = [
      {
        title: "用户Id",
        dataIndex: "_id",
        className:'hidden_lie'
      },
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "电话",
        dataIndex: "phone"
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: create_time => formateDate(create_time)
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: role_id => {
          const { roles } = this.props.users;
          //找到与role_id相匹配的role
          const roleName = roles.find(role => role._id === role_id);
          //返回出去role的名字
          return roleName === undefined ? "" : roleName.name;
        }
      },
      {
        title: "操作",
        render: rowData => (
          <span>
            <LinkButton onClick={() => this.handleUpdateBtn(rowData)}>
              修改
            </LinkButton>
            <LinkButton onClick={() => this.handleDeleteBtn(rowData)}>删除</LinkButton>
          </span>
        )
      }
    ];
    this.rowData = {};
  }
  componentDidMount() {
    this.props.getUserList();
    this.props.getRoleList();
  }
  //点击添加按钮
  handleAddBtn = () => {
    this.isAddOrUpdate = true;
    this.rowData = {};
    this.setState({ addupdatevisible: true });
  };
  //点击更新按钮
  handleUpdateBtn = rowData => {
    this.isAddOrUpdate = false;
    this.setState({ addupdatevisible: true });
    console.log(rowData);
    this.rowData = rowData;
  };
  //点击删除按钮
  handleDeleteBtn = rowData => {
    
    this.setState({ delvisible: true });
    this.rowData = rowData;
    console.log(rowData);
  };

  //更新或删除用户
  AddOrUpdateUser = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let user = values;
        user._id = this.rowData._id;
        this.props.getAddOrUpdateStatus(user);
        this.setState({ addupdatevisible: false });
        this.props.form.resetFields();
      }
    });
  };
  //删除用户
  deleteUser = () => {
    const _id = this.rowData._id;
    this.props.getDelUserStatus(_id)
    this.setState({delvisible:false})
  }
  getRoleList = roles => {
    return roles.map(role => (
      <Select.Option key={role._id} value={role._id}>
        {role.name}
      </Select.Option>
    ));
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    const { roles, users } = this.props;
    return (
      <Card
        title={
          <Button onClick={this.handleAddBtn} type="primary">
            创建用户
          </Button>
        }
      >
        <Table
          dataSource={users.users}
          columns={this.columns}
          rowKey="_id"
          pagination={{ defaultPageSize: PAGESIZE }}
        />
        <Modal
          title="Basic Modal"
          visible={this.state.addupdatevisible}
          onOk={this.AddOrUpdateUser}
          onCancel={() => this.setState({ addupdatevisible: false })}
          okText={this.isAddOrUpdate === true ? '添加' :'更新'}
          cancelText = "取消"
        >
          <Form {...formItemLayout}>
            <Item label="用户名">
              {getFieldDecorator("username", {
                initialValue: this.rowData.username,
                rules: [{ required: true, message: "必须填入用户名" }]
              })(<Input placeholder="请输入用户名" />)}
            </Item>

            {this.isAddOrUpdate === true ? (
              <Item label="密码">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "必须填入密码" }]
                })(<Input placeholder="请输入密码" />)}
              </Item>
            ) : null}

            <Item label="手机号">
              {getFieldDecorator("phone", {
                initialValue: this.rowData.phone,
                rules: [
                  { required: true, message: "必须填入用户名" },
                  { len: 11, message: "手机号必须为11位" }
                ]
              })(<Input placeholder="请输入手机号" />)}
            </Item>

            <Item label="邮箱">
              {getFieldDecorator("email", {
                initialValue: this.rowData.email,
                rules: [{ required: true, message: "必须填入用户名" }]
              })(<Input placeholder="请输入邮箱" />)}
            </Item>

            <Item label="所属角色">
              {getFieldDecorator("role_id", {
                initialValue: this.rowData.role_id || "请选择所属角色",
                rules: [{ required: true, message: "必须选择用户名" }]
              })(<Select>{this.getRoleList(roles)}</Select>)}
            </Item>
          </Form>
        </Modal>
        <Modal
          title="Basic Modal"
          visible={this.state.delvisible}
          onOk={this.deleteUser}
          onCancel={() => this.setState({ delvisible: false })}
          okText="删除"
          cancelText = "取消"
        >是否删除</Modal>
      </Card>
    );
  }
}
export default connect(state => ({ roles: state.roles, users: state.users }), {
  getRoleList,
  getUserList,
  getAddOrUpdateStatus,
  getDelUserStatus
})(Form.create()(User));
