import React, { Component } from "react";
import { Form, Input } from "antd";
const {Item } = Form;

class UpdateCategory extends Component {
  getItemsValue = () => {
    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values = this.props.form.getFieldsValue(); //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return values;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
       
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: ""
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateCategory);
