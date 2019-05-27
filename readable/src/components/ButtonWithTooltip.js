import React, { Component } from 'react';
import {Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap'

class ButtonWithTooltip extends Component{
  render() {
    let tooltip = <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>;

    return (
      <OverlayTrigger
        overlay={tooltip} placement="top"
        delayShow={300} delayHide={150}
      >
        <Button onClick={this.props.onClick} type="button" bsSize="small"><Glyphicon glyph={this.props.glyph}/></Button>
      </OverlayTrigger>
    );
  }
}


export default ButtonWithTooltip;