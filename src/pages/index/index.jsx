// Page.jsx
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import React, { Suspense } from "react";
import Taro from "@tarojs/taro";
import data from "../../data.js";

function handlePath(key) {
  let str = `../components/${key}`;
  return str;
}

export default function Index(props) {
  let { container, block } = props;
  container = container || data.container;
  block = block || data.block;
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View
      className="index"
      style={{
        width: container.width + "px",
        height: container.height + "px",
        position: "absolute",
        left: "-50px",
      }}
    >
      <Suspense>
        {block.map((item, index) => {
          const {
            key,
            top,
            left,
            zIndex,
            width,
            height,
            props: componentProps,
            model,
            focus,
            alignCenter,
          } = item;

          const Component = React.lazy(() =>
            import(
              `/Users/qitmac001331/Desktop/myApp/src/pages/components/${key}`
            )
          );
          return (
            <Component
              key={index}
              style={{
                top: top + "px",
                left: left + "px",
                zIndex,
                position: "absolute",
                width: width + "px",
                height: height + "px",
              }}
              model={model}
              props={componentProps}
            ></Component>
            // <View>123</View>
          );
        })}
      </Suspense>
    </View>
  );
}
