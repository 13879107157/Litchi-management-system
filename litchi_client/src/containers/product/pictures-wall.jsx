import React, { Component } from "react";
import { Upload, Icon, Modal, message } from "antd";
import PropTypes from 'prop-types'

import {reqDeleteImg} from '../../api/index'
import {BASE_IMG_URL} from '../../utils/constants'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  static propTypes = {
    imgs:PropTypes.array
  }
  constructor(props){
    super(props)
    
    let fileList = []
    //debugger
    const {imgs} = this.props
    if(imgs && imgs.length > 0){
      fileList = imgs.map((img,index) => ({
        uid:-index,
        name:img,
        status:'done',
        url:BASE_IMG_URL + img
      }))
    }
    this.state = {
      previewVisible: false, //是否显示预览
      previewImage: "", //预览img
      fileList
    }
  }
  //隐藏对话框
  handleCancel = () => this.setState({ previewVisible: false });
  //点击文件链接或预览图标时的回调
  handlePreview = async file => {
    console.log("handlPreview()", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  //upload发生改变时触发
  handleChange = async ({ file, fileList }) => {
    //console.log(fileList);
    console.log("status" + file.status);
    if (file.status === "done") {
      const response = file.response;
      if (response.status === 0) {
        message.success("上传成功");
        const { name, url } = response.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("上传失败");
      }
    } else if(file.status === 'removed'){
      const result = await reqDeleteImg(file.name)
      if(result.status === 0){
        message.success('删除成功')
      } else {
        message.error('删除图片失败')
      }
    }
    this.setState({ fileList });
  };
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" //上传地址
          accept="image/*" //只接受图片格式
          name="image" //发到后台的文件参数名
          listType="picture-card" //卡片样式
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
