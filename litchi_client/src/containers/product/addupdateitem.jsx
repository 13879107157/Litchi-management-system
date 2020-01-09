import React, { Component } from "react";
import { Card, Form, Icon, Input, Button, Cascader } from "antd";

import LinkButton from "../../components/link-button/link-button";
import { reqCategories } from "../../api/index";
import "./addupdateitem.less";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";
const { Item } = Form;
const { TextArea } = Input;
class AddUpdateItem extends Component {
  state = {
    options: []
  };
  constructor(props) {
    super(props);
    this.pw = React.createRef();
    this.editor = React.createRef();
  }
  //组件挂载完就获取商品列表
  componentDidMount() {
    this.getCategorys("0");
  }
  UNSAFE_componentWillMount() {
    //取出携带的prodcut
    const product = this.props.location.state;
    //保存是否是更新的标识 true/false
    this.isUpdate = !!product;
    //保存商品，如果没有保存的是{}
    this.product = product || {};
  }
  //初始化options
  initOptions = async categories => {
    const options = categories.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }));

    //如果是一个二级分类商品的更新
    const { isUpdate, product } = this;
    const {  pCategoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      //获取对应的二级分类列表
      const subcategories = await this.getCategorys(pCategoryId);
      //生成二级列表的options
      const chiildOptions = subcategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      const targetOption = options.find(option => option.value === pCategoryId);
      targetOption.children = chiildOptions;
    }
    this.setState({ options });
  };

  //异步获取一级或二级分类列表
  getCategorys = async parentId => {
    const result = await reqCategories(parentId);
    //debugger
    //如果parentId为0则创建分类列表
    if (result.status === 0) {
      const categories = result.data;
      //如果parentId为0是一级分类列表
      if (parentId === "0") {
        this.initOptions(categories);
      } else {
        //否则返回出一个普通分类列表
        return categories;
      }
    }
  };
  //点击一级分类就调用
  loadData = async selectedOptions => {
    //debugger
    //获取到当前选中的option
    const targetOption = selectedOptions[selectedOptions.length - 1];
    //显示loading效果
    targetOption.loading = true;
    //根据选中的分类，请求获取二级分类列表
    const subCategories = await this.getCategorys(targetOption.value);
    //获取到数据后loading效果消失
    targetOption.loading = false;
    //如果有子分类且长度大于0则创建子分类
    if (subCategories && subCategories.length > 0) {
      const childoptions = subCategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      //给选中的option添加一个子分类
      targetOption.children = childoptions;
    } else {
      //否则将当前option的isleaf设置为true,既没有子分类
      targetOption.isLeaf = true;
    }
    this.setState({ ...this.state.options });
  };
  //自定义验证价格
  validatorPrice = (rule, value, callback) => {
    if (value * 1 <= 0) {
      callback("价格必须大于0");
    } else {
      callback();
    }
  };
  //提交表单
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const imgs = this.pw.current.getImgs();
        const detail = this.editor.current.getDetail();
        console.log(imgs, detail);
      }
    });
  };
  render() {
    const { isUpdate, product } = this;
    const { categoryId, pCategoryId, imgs, detail } = product;
    //用来接收级联分类ID数组
    const categoryIds = [];
    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title={title} extra={isUpdate ? "修改商品" : "添加商品"}>
        <Form {...formItemLayout}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: product.name,
              rules: [{ required: true, message: "必须填写商品名称" }]
            })(<Input className="addInput" placeholder="请输入商品名称" />)}
          </Item>

          <Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: product.desc,
              rules: [{ required: true, message: "必须填写商品描述" }]
            })(<TextArea placeholder="请输入商品描述" autoSize={true} />)}
          </Item>

          <Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: product.price,
              rules: [
                { required: true, message: "必须填写商品价格" },
                { validator: this.validatorPrice }
              ]
            })(
              <Input
                placeholder="请输入商品价格"
                addonAfter="元"
                type="number"
              />
            )}
          </Item>

          <Item label="商品类型">
            {getFieldDecorator("categoryIds", {
              initialValue: categoryIds,
              rules: [{ required: true, message: "必须填写商品描述" }]
            })(
              <Cascader options={this.state.options} loadData={this.loadData} />
            )}
          </Item>

          <Item label="商品图片">
            <div>商品图片</div>
            <PicturesWall ref={this.pw} imgs={imgs} />
          </Item>
          <Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.editor} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(AddUpdateItem);
