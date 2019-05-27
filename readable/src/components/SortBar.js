import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import {sortOrder} from '../actions'

class SortBar extends Component {

  render() {
    return (
      <div className="sortbar">
        Sort by:
        <Button type="button" onClick={() => this.props.sortOrder("voteScore")}>Score</Button>
        <Button type="button" onClick={() => this.props.sortOrder("timestamp")}>Submit date</Button>
        {
          (this.props.comment) ? null : <Button type="button" onClick={() => this.props.sortOrder("category")}>Category</Button> 

        }
        
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortOrder: (data) => dispatch(sortOrder(data)),
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(SortBar)



