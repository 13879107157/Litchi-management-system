import React, { Component } from "react";
import { Card, List, Icon } from "antd";

import LinkButton from "../../components/link-button/link-button";
import "./detail.less";
import { reqCategory } from "../../api/index";
const Item = List.Item;
class Detail extends Component {
  state = {
    categoryName1: "",
    categoryName2: ""
  };
  async componentDidMount() {
    const { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      /* 
      "status": 0,
      "data": {
          "parentId": "0",
          "_id": "5e0bfcba6f3ce12cb090b203",
          "name": "数码产品",
          "__v": 0
      }
      */
      const result = await reqCategory(categoryId);
      const categoryName1 = result.data.name;
      this.setState({ categoryName1 });
    } else {
      /* const result1 = await reqCategory(pCategoryId);
      const result2 = await reqCategory(categoryId); */
      //debugger
      //一次性发多个请求，只有成功了，才正常处理
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      const categoryName1 = results[0].data.name;
      const categoryName2 = results[1].data.name;
      this.setState({ categoryName1, categoryName2 });
    }
  }
  render() {
    const title = (
      <LinkButton onClick={() => this.props.history.goBack()}>
        <Icon type="rollback" />
        &nbsp;&nbsp;返回商品列表
      </LinkButton>
    );
    //这里的数据是home组件传过来的，通过push方法
    const { imgs, name, desc, price, detail } = this.props.location.state.product
    //console.log(this.props.location.state);
    
    
    const {categoryName1,categoryName2} = this.state
    //console.log(this.props.location.state);
    return (
      <Card title={title}>
        <List>
          <Item>
            <span className="title">商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="title">商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="title">商品价格：</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span className="title">所属分类：</span>
            <span>{categoryName1} {categoryName2 ? '-->' + categoryName2 : ''}</span>
          </Item>
          <Item>
            <span className="title">商品图片：</span>
            <span>
              {imgs.map(img => (
                <img key={img} src={img} alt="" />
              ))}
            </span>
          </Item>
          <Item>
            <span className="title">商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}

export default Detail;
