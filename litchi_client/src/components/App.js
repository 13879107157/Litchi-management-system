import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import Myself from './Myself'

function Index() {
    useEffect(()=>{
        console.log('useEffect=>老弟你来了！Index')
        return ()=>{
            console.log('useEffect=>你走了！Index')
        }
    },[])
  return <h1>cth.com</h1>;
}
function List() {
    useEffect(()=>{
        console.log('useEffect=>老弟你来了！List')
    })
  return <h2>List page</h2>;
}
export default function App() {
  const [count, handleClick] = useState(0);
//   useEffect(() => {
//     console.log(`useEffect=> you clicked ${count}`);
//   });
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => handleClick(count + 1)}>+1</button>
      {/* //<Myself /> */}
      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/list/">列表</Link>
          </li>
        </ul>
        <Route path="/" exact component={Index} />
        <Route path="/list/" exact component={List} />
      </Router>
    </div>
  );
}

/* export default class App extends Component{
    constructor(props){
        super(props)
        this.state={
            count:0
        }
    }
    componentDidMount(){
        console.log(`componentDidMount=> you clicked ${this.state.count}`)
    }
    componentDidUpdate(){
        console.log(`componentDidUpdate=> you clicked ${this.state.count}`)
    }
    render(){
        return(
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.handleClick.bind(this)}>+</button>
            </div>
        )
    }
    handleClick(){
        this.setState({count:this.state.count+1})
    }
}
 */
