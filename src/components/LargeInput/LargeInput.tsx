import React, {Component} from "react";
import './LargeInput.scss';
import {Link} from "react-router-dom";

export class LargeInput extends Component<{
  placeholder?: string,
  addonText: string
  disableHyperlink?: boolean
}> {
  render() {
    return (
      <div className="largeInput">
        <div></div>
        <input placeholder={this.props.placeholder} />
        {
          this.props.disableHyperlink 
          ?
          <a>
            {this.props.addonText}
          </a>
          : 
          <Link to="/subscribe">
            {this.props.addonText}
          </Link> 
        }
      </div>
    );
  }
}
