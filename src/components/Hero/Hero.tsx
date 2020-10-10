import React, {Component} from "react";
import './Hero.scss';
import {LargeInput} from "../LargeInput/LargeInput";

export class Hero extends Component<{
  title: string,
  imgFilename: string,
}, {}> {
  render() {
    return (
      <div 
        className="hero" 
        style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${require("../../assets/" + this.props.imgFilename)}) 50% 0 repeat-y fixed` }}>
        <h1>
          {this.props.title}
        </h1>
        <LargeInput 
          addonText="New York, NY"
          disableHyperlink />
      </div>
    );
  }
}
