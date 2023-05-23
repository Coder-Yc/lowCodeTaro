import React, { useState } from "react";
import message from "../message/index";
import axios from 'axios'
import { Button } from "@tarojs/components";
export default function MyButton(props) {
  // 在这里编写 Button 组件的渲染逻辑
  const [username, setUsernameValue] = useState('ycyc');
  const [password, setPasswordValue] = useState('123456');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userinfo, setUserInfo] = useState('');


  const handleLogin = () => {
    console.log('111111--', username, password);
    const { url } = props.props
    axios
      .post(url, { username, password })
      .then((res) => {
        if (res.status == '200') {
          console.log(res.data);
          setUserInfo(res.data)
          setLoggedIn(true);
          message.publish('loggedIn', {a: true}  )
        }
      })
      
  }
  message.subscribe('userinfo', (data) => {
    let { mode, inputValue } = data
    console.log(data);
    if (mode == 'username') {
      setUsernameValue(inputValue)
    } else if (mode == 'password') {
      setPasswordValue(inputValue)
    }
  })
  const handleRegister = () => {
    console.log('111111--');
  }
  function formatTime(oriDate) {
    const date = new Date(oriDate);

    // 获取年、月、日、小时、分钟、秒
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 注意月份从 0 开始，所以需要加 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    // 格式化日期和时间
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedTime
  }
  let handle
  switch (props.props.onClick) {
    case 'handleLogin':
      handle = handleLogin
      break;
    case 'handleRegister':
      handle = handleRegister
      break;
    default:
      handle = null;
  }
  let {type, size, text} = props.props 
  if(type === 'success') {
    type = 'primary'
  }

  console.log(type, size);
  return (
    <div>
      {
        !loggedIn && (
          <Button
            className={props.className}
            style={{
              ...props.style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // writingMode: "vertical-lr",
              width: "80px"
            }}
            size={props.props.size || "default"}
            type={props.props.type || "default"}
            onClick={handle}
          >
            {text}
          </Button>
        )
      }
      {
        loggedIn && (
          <div style={{marginLeft: '60px',position: "absolute", zIndex: '1000'}}>
            <div>Welcome! You are logged in.</div>
            <div >
             <div> username: {userinfo.username}</div>
             <div> email: {userinfo.email}</div>
              <div>created Time: {formatTime(userinfo.created_at)}</div>
            </div>
          </div>
        )
      }
    </div>
  );
}
