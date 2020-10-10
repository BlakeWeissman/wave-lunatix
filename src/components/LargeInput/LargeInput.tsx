import React, {Component} from "react";
import './LargeInput.scss';
import {Link} from "react-router-dom";

export class LargeInput extends Component<{
  placeholder?: string,
  buttonText: string
}> {
  render() {
    return (
      <div className="largeInput">
        <div></div>
          <input placeholder={this.props.placeholder} />
          <Link to="/subscribe">
            {this.props.buttonText}
          </Link>
      </div>
    );
  }
}
