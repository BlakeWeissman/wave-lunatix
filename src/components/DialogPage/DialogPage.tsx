import React, {Component} from "react";
import './DialogPage.scss';

export class DialogPage extends Component<{
  title?: string
}> {
  render() {
    return (
      <div className="dialog-page">
        <div>
          {
            this.props.title
            ?
            <h1>
              {this.props.title}
            </h1>
            :
            null
          }
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
