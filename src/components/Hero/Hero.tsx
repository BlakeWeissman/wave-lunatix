import React, {Component} from "react";
import './Hero.scss';
import {LargeInput} from "../LargeInput/LargeInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";

export class Hero extends Component<{
  title: string,
  imgFilename: string,
}, {}> {
  render() {
    return (
      <div 
        className="hero" 
        style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${require("../../assets/" + this.props.imgFilename)}) right center no-repeat` }}>
        <h1>
          {this.props.title}
        </h1>
        <LargeInput 
          addonText={
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> New York, NY
            </span>
          }
          disableHyperlink />
      </div>
    );
  }
}
