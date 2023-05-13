import React, { Component } from "react";
import { View, Picker } from "@tarojs/components";

export default class MyPicker extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      selector: this.props.props.options,
      selectorChecked: "0",
    };
  }
  componentDidMount() {
    let data = this.state.selector;
    console.log(data, "----");
    let a =
      data &&
      data.map((item, index) => {
        return item.label;
      });
    this.setState({
      selector: a,
    });
  }

  onChange = (e) => {
    console.log(e.detail);
    this.setState({
      selectorChecked: this.state.selector[e.detail.value],
    });
  };

  render() {
    return (
      <Picker
        mode="selector"
        style={this.props.style}
        range={this.state.selector}
        onChange={this.onChange}
      >
        <View className="picker">当前选择{this.state.selectorChecked}</View>
      </Picker>
    );
  }
}
