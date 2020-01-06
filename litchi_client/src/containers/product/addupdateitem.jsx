import React, { Component } from "react";
import { Card, Form, Icon, Input, Button, Cascader, Upload } from "antd";
import { connect } from "react-redux";

import LinkButton from "../../components/link-button/link-button";
import { reqCategories } from "../../api/index";
const { Item } = Form;
const { TextArea } = Input;
class AddUpdateItem extends Component {
  state = {
    options: []
  };
  initOptions = (categories) => {
    const options = categories.map(c => ({
      value:c._id,
      label:c.name,
      isLeaf:false
    }))
    this.setState({options})
  };
  componentDidMount() {
    this.getCategorys("0");
  }
  //异步获取一级或二级分类列表
  getCategorys = async (parentId) => {
    const result = await reqCategories(parentId);
    //debugger
    //如果parentId为0则创建分类列表
    if (result.status === 0) {
      const categories = result.data;
      //如果parentId为0是一级分类列表
      if(parentId === '0'){
        this.initOptions(categories);
      } else {    //否则返回出一个普通分类列表
        return categories
      }
    }
  };
  loadData = async selectedOptions => {
    //debugger
    //获取到当前选中的option
    const targetOption = selectedOptions[selectedOptions.length - 1];
    //显示loading效果
    targetOption.loading = true
    //根据选中的分类，请求获取二级分类列表
    const subCategories = await this.getCategorys(targetOption.value)
    //获取到数据后loading效果消失
    targetOption.loading = false
    //如果有子分类且长度大于0则创建子分类
    if(subCategories && subCategories.length>0){
      const childoptions = subCategories.map(c => ({
        value:c._id,
        label:c.name,
        isLeaf:true
      }))
      //给选中的option添加一个子分类
      targetOption.children = childoptions;
    } else {
      //否则将当前option的isleaf设置为true,既没有子分类
      targetOption.isLeaf = true
    }
    this.setState({...this.state.options})
     
  }

  render() {
    const title = (
      <LinkButton onClick={() => this.props.history.goBack()}>
        <Icon type="rollback" />
        &nbsp;&nbsp;返回
      </LinkButton>
    );
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    };
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称">
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item label="商品描述">
            <TextArea placeholder="请输入商品描述" autoSize={true} />
          </Item>
          <Item label="商品价格">
            <Input placeholder="请输入商品价格" addonAfter="元" type="number" />
          </Item>
          <Item label="商品类型">
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
              //expandTrigger="hover"
              // onChange={this.onChange}
              // changeOnSelect
            />
          </Item>
        </Form>
      </Card>
    );
  }
}
export default AddUpdateItem;
