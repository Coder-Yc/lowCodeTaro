import React, { useState } from "react";
import message from "../message/index";
import axios from 'axios';
import { Button } from "@tarojs/components";
import Taro from '@tarojs/taro';
export default function MyButton(props) {
  // 在这里编写 Button 组件的渲染逻辑
  const [username, setUsernameValue] = useState('ycyc');
  const [password, setPasswordValue] = useState('123456');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userinfo, setUserInfo] = useState('');

  const handleLogin = () => {
    Taro.request({
      url: props.props.url,
      method: 'POST', // This value for demonstration purposes only is not a real API URL.
      data: {
        username: username,
        password: password
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == '200') {

          console.log(res.data);
          setUserInfo(res.data)
          setLoggedIn(true);
          message.publish('loggedIn', { a: true })
        }
      }
    })

  }
  const handleConsole = () => {
    console.log('按钮事件触发');
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
    case 'handleConsole':
      handle = handleConsole
      break;
    default:
      handle = null;
  }
  let { type, size, text } = props.props
  if (type === 'success') {
    type = 'primary'
  }

  return (
    <view>
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
          <view style={{ marginLeft: '60px', position: "absolute", zIndex: '1000' }}>
            <view>Welcome! You are logged in.</view>
            <view >
              <view> username: {userinfo.username}</view>
              <view> email: {userinfo.email}</view>
              <view>created Time: {formatTime(userinfo.created_at)}</view>
            </view>
          </view>
        )
      }
    </view>
  );
}
