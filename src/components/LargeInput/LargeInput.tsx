import React, {Component} from "react";
import './LargeInput.scss';
import {Link} from "react-router-dom";

export class LargeInput extends Component<{
  placeholder?: string,
  addonText: string | JSX.Element,
  disableHyperlink?: boolean,
  onChange?: (value: string) => void,
}> {
  render() {
    return (
      <div className="largeInput">
        <div></div>
        <input 
          placeholder={this.props.placeholder} 
          onChange={value => {
            if (this.props.onChange) {
              this.props.onChange(value.target.value);
            }
          }}
        />
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
