import React, { useState, useEffect } from "react";
import message from "../message/index";
import { Input } from "@tarojs/components";
export default function MyInput(props) {
  const oridata = {
    username: 'ycyc',
    password: '123456',
    test: '123',
    test2: '456',
    start: 0,
    end: 100,
  }

  const [inputValue, setInputValue] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  const { model } = props;

  useEffect(() => {
    setInputValue(oridata[model.default]);
  }, [model.default]);

  message.subscribe('first', (data) => {
    const { mode, inputValue } = data;
    console.log(data);
    if (mode === 'username') {
      // 更新用户名的状态变量
      // setUsernameValue(inputValue);
    } else if (mode === 'password') {
      // 更新密码的状态变量
      // setPasswordValue(inputValue);
    }
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    if (props.model && props.model.default) {
      const mode = props.model.default;
      message.publish('userinfo', { mode, inputValue });
    }
  };

  message.subscribe('loggedIn', (data) => {
    console.log(data.a, '---');
    setLoggedIn(data.a);
  });

  return (
    !loggedIn && (
      <input
        className={props.className}
        style={{
          ...props.style,
          border: "1px solid #dcdfe6",
          borderRadius: "4px",
          padding: "4px",
        }}
        type={props.props.type || "text"}
        placeholder={props.props.placeholder || "please input"}
        maxLength={props.props.maxLength || "10"}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
    )
  );
}
