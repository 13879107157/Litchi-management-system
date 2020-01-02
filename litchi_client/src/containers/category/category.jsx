import React, { Component } from "react";
import { Card, Table, Button, Icon, Modal} from "antd";
import { connect } from "react-redux";

import { getCategories,getaddCategory} from "../../redux/action";
import LinkButton from "../../components/link-button/link-button";
import AddCategory from "./addcategory";
import UpdateCategory from "./updatecategory";

//商品分类
class Category extends Component {
  state = {
    showModal: 0
  };
  //初始化表格
  UNSAFE_componentWillMount() {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        width: "65%"
      },
      {
        title: "操作",
        render: rowData => (
          <span>
            <LinkButton onClick={this.showUpdateCategory}>修改分类</LinkButton>
            {/* 如何向事件回调函数传递参数:先定义一个匿名函数，在函数里面调用处理函数并传入参数 */}
            <LinkButton
              onClick={() => {
                this.getSubcategory(rowData);
              }}
            >
              查看子分类
            </LinkButton>
          </span>
        )
      }
    ];
    this.loading = false;
  }
  //显示一级分类
  componentDidMount() {
    this.parentId = "0";
    //调用action来获取分类数组数据
    this.props.getCategories(this.parentId);
    this.parentName = "总分类";
  }
  //获取二级分类请求函数
  getSubcategory = rowData => {
    /* 
        rowData的返回值
        parentId: "0"
        _id: "5e0c0e206f3ce12cb090b20d"
        name: "玩具"
        __v: 0 
    */
    const parentId = rowData._id;
    this.parentId = parentId;
    this.parentName = rowData.name;
    //console.log(parentId);

    this.props.getCategories(parentId);
  };
  //对话框取消事件
  handleCancel = () => {
    this.setState({ showModal: 0 });
  };
  //显示添加分类对话框('修改分类'按钮事件)
  showAddCategory = () => {
    this.setState({ showModal: 1 });
    console.log(this.form);
    
  };
  //显示修改分类对话框;('添加'按钮事件)
  showUpdateCategory = () => {
    this.setState({ showModal: 2 });
  };

  //添加商品功能
  handleCreate = () => {
    //debugger
    
    const values = this.formRef.getItemsValue();  
    //console.log(this.formRef);
    this.props.getaddCategory(values);   //6、调用子组件的自定义方法getItemsValue。注意：通过  this.formRef 才能拿到数据
    this.props.getCategories(this.parentId)
    this.formRef.props.form.resetFields();
    this.setState({showModal:0})
}

  //更新商品功能

  render() {
    //debugger
    //从redux取出categories数据 数据结构:[{},{},{}]
    const { categories } = this.props;

    //Card左边的标题
    const title = this.parentId === "0" ? (this.parentName = "总分类") : this.parentName;

    const extra = (
      <span>
        {this.parentId !== "0" ? (
          <Button
            onClick={() => this.props.getCategories((this.parentId = "0"))}
            type="default"
          >
            <Icon type="rollback" />
            返回总分类
          </Button>
        ) : null}
        　　
        <Button type="primary" onClick={this.showAddCategory}>
          <Icon type="plus" />
          添加
        </Button>
      </span>
    );
    //如果categories没有值则显示loading
    if (!categories[0]) {
      this.loading = true;
    } else {
      this.loading = false;
    }
    const dataSource = categories;
    //console.log(this.form);
    
    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          bordered={true}
          rowKey="_id"
          pagination={{ defaultPageSize: 7, showQuickJumper: true }}
          loading={this.loading}
          defaultSortOrder='descend'
        />
        <Modal
          title="添加商品"
          visible={this.state.showModal === 1}
          
          centered={true}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
        >
          <AddCategory parentId={this.parentId} parentName={this.parentName} addCategory={this.addCategory} wrappedComponentRef={(form) => this.formRef = form} />
        </Modal>
        <Modal
          title="修改分类"
          visible={this.state.showModal === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateCategory />
        </Modal>
      </Card>
    );
  }
}
export default connect(state => ({ categories: state.categories,addsuccessmsg:state.addsuccessmsg }), {
  getCategories,getaddCategory
})(Category);
