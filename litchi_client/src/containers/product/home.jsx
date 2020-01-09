import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table } from "antd";
import { connect } from "react-redux";

import LinkButton from "../../components/link-button/link-button";
import { getProducts, getUpdateStatus } from "../../redux/action";
import { PAGESIZE } from "../../utils/constants";
const Option = Select.Option;
class Home extends Component {
  state = {
    current: "1",
    searchType: "productName",
    searchName: ""
  };
  //挂在前创建Table的行分类
  UNSAFE_componentWillMount() {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => "￥" + price
      },
      {
        title: "状态",
        //dataIndex: "status",
        width: "5%",
        render: product => {
          //从product中取出状态（status）和商品ID（_id）
          const { status, _id } = product;
          //这里存一个新状态是为了发送ajax请求，例：商品为在售时status时等于1,要下架就需要将status改为2，反之改成1
          const newState = status === 1 ? 2 : 1;
          
          return (
            <span>
              {/* 按钮点击后，进心上架或下架*/}
              <Button
                onClick={() =>
                  this.props.getUpdateStatus(
                    _id,
                    newState,
                    this.pageNum,
                    PAGESIZE
                  )
                }
                type="default"
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <span>{status === 1 ? "在售" : "已下架"}</span>
            </span>
          );
        }
      },
      {
        title: "操作",
        width: "10%",
        render: product => {
          return (
            <span>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/product/detail", { product })
                }
              >
                详情
              </LinkButton>
              <br />
              {/* 如何向事件回调函数传递参数:先定义一个匿名函数，在函数里面调用处理函数并传入参数 */}
              <LinkButton
                onClick={() =>
                  this.props.history.push("/product/addupdateitem", product )
                }
              >
                修改
              </LinkButton>
            </span>
          );
        }
      }
    ];
  }
  //页面加载完发送获取商品请求
  componentDidMount() {
    const initpageNum = this.pageNum === undefined ? 1 : this.pageNum;
    console.log(this.pageNum);
    this.props.getProducts(initpageNum, PAGESIZE);
  }
  //Table发生变化触发
  changePage = page => {
    //page就是当前页，发生改变的时候就获取当前页商品信息
    this.props.getProducts(page, PAGESIZE);
    //将当前页存到组件里
    this.pageNum = page;
  };

  /* ---------------------------------------------------------- */
  render() {
    //render
    const { searchType, searchName } = this.state;
    const title = (
      <span>
        <Select
          value={searchType}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="输入关键字，如果没有内容则搜索全部。"
          value={searchName}
          style={{ width: 300, margin: "0 10px" }}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button
          type="primary"
          onClick={() => {
            this.props.getProducts(1, PAGESIZE, searchType, searchName);
          }}
        >
          <Icon type="file-search" />
          搜索
        </Button>
      </span>
    );
    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/addupdateitem")}
      >
        <Icon type="plus" />
        添加
      </Button>
    );
    const { products } = this.props;
    //console.log(products);

    if (products.status === 1) {
      this.loading = true;
      return null;
    } else {
      this.loading = false;
    }
    const { list, total } = products.data;
    const dataSource = list;
    /* ---------------------------------------------------------- */
    //标签
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          loading={this.loading}
          dataSource={dataSource}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize: PAGESIZE,
            showQuickJumper: true,
            onChange: this.changePage
          }}
        />
      </Card>
    );
  }
}

export default connect(state => ({ products: state.products }), {
  getProducts,
  getUpdateStatus
})(Home);
