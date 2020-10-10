import React, {Component} from "react";
import './NeoInput.scss';

export class NeoInput extends Component<{
  placeholder?: string,
  type?: string,
}> {
  render() {
    return (
      <div id="neo-input">
        <input 
          type={this.props.type}
          placeholder={this.props.placeholder} />
      </div>
    );
  }
}
