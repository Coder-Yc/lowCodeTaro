import React ,{useState}from "react";
import  message  from "../message/index";
import { Text } from "@tarojs/components";
export default function MyText(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  message.subscribe('loggedIn', (data) => {
    console.log(data.a, '---');
    setLoggedIn(data.a)
  })
  
  return (
    !loggedIn && <text style={{ ...props.style, fontSize: props.props?.size || "18px", color: props.props.color }}>
      {props.props.text}
    </text>
  );
}
