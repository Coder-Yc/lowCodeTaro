import React from "react";
import { Image } from "@tarojs/components";
export default function MyImage(props) {
  // 在这里编写 Button 组件的渲染逻辑
  console.log(props);
  return (
    <Image
      style={{
        ...props.style,
        width: props.props?.width || "100px",
        height: props.props?.height || "100px",
      }}
      src={props.props.src}
    ></Image>
  );
}
