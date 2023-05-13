import React, {useState} from "react";
import  message  from "../message/index";
export default function MyInput(props) {
  // 在这里编写 Button 组件的渲染逻辑


  const [inputValue, setInputValue] = useState("");
  const [loggedIn, setLoggedIn] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value)

  };
  const handleInputBlur = () => {
    const mode = props.model.default
   message.publish('userinfo', {mode, inputValue})
  }
  message.subscribe('loggedIn', (data) => {
    console.log(data.a, '---');
    setLoggedIn(data.a)
  })
  
  return (
    !loggedIn && <input
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
    ></input>
  );
}
