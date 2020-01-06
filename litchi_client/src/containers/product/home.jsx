import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table } from "antd";
import { connect } from "react-redux";

import LinkButton from "../../components/link-button/link-button";
import { getProducts } from "../../redux/action";
import { PAGESIZE } from "../../utils/constants";
const Option = Select.Option;
class Home extends Component {
  state = {
    searchType: "productName",
    searchName: ""
  };
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
        dataIndex: "status",
        width: "5%",
        render: status => {
          return (
            <span>
              <Button type="default">下架</Button>
              <span>在售</span>
            </span>
          );
        }
      },
      {
        title: "操作",
        width: "10%",
        render: product => (
          <span>
            <LinkButton>详情</LinkButton>
            <br />
            {/* 如何向事件回调函数传递参数:先定义一个匿名函数，在函数里面调用处理函数并传入参数 */}
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ];
  }
  componentDidMount() {
    this.props.getProducts(1, PAGESIZE);
  }
  render() {
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
      <Button type="primary" onClick={() => this.props.history.push('/product/addupdateitem')}>
        <Icon type="plus" />
        添加
      </Button>
    );
    const { products } = this.props;
    console.log(products);

    if (products.status === 1) {
      this.loading = true;
      return null;
    } else {
      this.loading = false;
    }
    const { list, total } = products.data;
    const dataSource = list;
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
            onChange: this.props.getProducts
          }}
        />
      </Card>
    );
  }
}

export default connect(state => ({ products: state.products }), {
  getProducts
})(Home);
