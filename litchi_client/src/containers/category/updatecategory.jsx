import React, { Component } from "react";
import { Form, Input } from "antd";
const {Item } = Form;

class UpdateCategory extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
       
        <Item>
          {getFieldDecorator("parentId", {
            initialValue: ""
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateCategory);
