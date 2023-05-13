import React ,{useState}from "react";
import  message  from "../message/index";
export default function MyText(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  message.subscribe('loggedIn', (data) => {
    console.log(data.a, '---');
    setLoggedIn(data.a)
  })
  
  return (
    !loggedIn && <span style={{ ...props.style, fontSize: props.props?.size || "18px" }}>
      {props.props.text}
    </span>
  );
}
