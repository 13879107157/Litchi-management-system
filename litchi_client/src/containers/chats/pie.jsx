import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";
/*后台管理的柱状图路由组件
 */
export default class Pie extends Component {
  
  getOption = () => {
   
    return {
        backgroundColor: '#2c343c',
    
        title: {
            text: '饼图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
    
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
    
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: 250, name: '衬衫'},
                    {value: 200, name: '羊毛衫'},
                    {value: 360, name: '雪纺衫'},
                    {value: 300, name: '裤子'},
                    {value: 200, name: '高跟鞋'},
                    {value: 200, name: '袜子'},
                    
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
  };
 
  render() {
    return (
      <div>
        <Card >
          <ReactEcharts option={this.getOption()} style={{ height: 300 }} />
        </Card>
      </div>
    );
  }
}
