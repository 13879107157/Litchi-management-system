import React, { Component } from "react";
import { Card, Table, Button, Icon } from "antd";
import { connect } from "react-redux";

import { getCategories } from "../../redux/action";
import LinkButton from "../../components/link-button/link-button";
//商品分类
class Category extends Component {
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
        render: Rowinfo => (
          <span>
            <LinkButton>修改分类</LinkButton>
            {/* 如何向事件回调函数传递参数:先定义一个匿名函数，在函数里面调用处理函数并传入参数 */}
            <LinkButton
              onClick={() => {
                this.getSubcategory(Rowinfo);
              }}
            >
              查看子分类
            </LinkButton>
          </span>
        )
      }
    ];
    this.loding = false;
  }
  //显示一级分类
  componentDidMount() {
    this.parentId = "0";
    this.props.getCategories(this.parentId);
    this.parentName = "总分类";
  }
  //获取二级分类请求函数
  getSubcategory = Rowinfo => {
    /* 
        Rowinfo的返回值
        parentId: "0"
        _id: "5e0c0e206f3ce12cb090b20d"
        name: "玩具"
        __v: 0 
        */
    const parentId = Rowinfo._id;
    this.parentId = parentId;
    this.parentName = Rowinfo.name;
    //console.log(parentId);

    this.props.getCategories(parentId);
  };
  render() {
    //debugger
    //从redux取出categories数据 数据结构:[{},{},{}]
    const { categories } = this.props;
    //console.log(categories);
    //Card左边的标题
    const title =
      this.parentId === "0" ? (this.parentName = "总分类") : this.parentName;

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
        　　
        <Button type="primary">
          <Icon type="plus" />
          添加
        </Button>
      </span>
    );
    //如果categories没有值则显示loding
    if (!categories[0]) {
      this.loding = true;
      //return 'meiyoushuju'
    } else {
      this.loding = false;
    }
    const dataSource = categories;

    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          bordered={true}
          rowKey="_id"
          pagination={{ defaultPageSize: 7, showQuickJumper: true }}
          loading={this.loding}
        />
      </Card>
    );
  }
}
export default connect(state => ({ categories: state.categories }), {
  getCategories
})(Category);
