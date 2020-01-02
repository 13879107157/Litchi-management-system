import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import { connect } from "react-redux";
import { getCategories, getaddCategory } from "../../redux/action";
const { Item } = Form;
const { Option } = Select;
class AddCategory extends Component {
  getItemsValue = () => {
    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values = this.props.form.getFieldsValue(); //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return values;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categories } = this.props;

    return (
      <Form>
        <Item>
          {getFieldDecorator("parentId", {
            initialValue: this.props.parentId
          })(
            <Select>
              <Option value={this.props.parentId}>
                {this.props.parentName}
              </Option>
              {categories.map(item => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Item>
        <Item>
          {getFieldDecorator("categoryName", {
            initialValue: "",
            
          })(<Input placeholder="请输入分类名称" />)}
        </Item>
       
      </Form>
    );
  }
}

const WrappedAddCategory = Form.create()(AddCategory);
export default connect(state => ({ categories: state.categories }), {
  getCategories,
  getaddCategory
})(WrappedAddCategory);
