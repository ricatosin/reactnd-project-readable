import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import Moment from 'react-moment'
import Modal from 'react-modal'
import ButtonWithTooltip from './ButtonWithTooltip'
import {upVote, downVote, deletePost, updateComment, toggleModal} from '../actions'
import { connect } from 'react-redux'
import customStyles from './Modal'


class Comment extends Component {
  
  openEditCommentModal = (id) => {
    this.props.toggleModal(id, true)
  }
  closeEditCommentModal = (id) =>  {
    this.props.toggleModal(id, false)
  }
  
  updateComment = (e, id) => {
    let timestamp = Date.now()
    this.props.updateComment(this.props.comment, timestamp)
    this.closeEditCommentModal(id)
  }
  render() {
    const comment = this.props.comments[this.props.comment.parentId].filter(c => c.id === this.props.comment.id)[0]
    return (
      <div className="comment-container">
      <div className="comment">
        <div className="col-xs-1">
          <div className="up-vote"><ButtonWithTooltip onClick={() => this.props.upVote(comment.id, 'comments')} id="upvote" tooltip="up-vote" glyph="chevron-up"></ButtonWithTooltip></div>
          <div className="down-vote"><ButtonWithTooltip onClick={() => this.props.downVote(comment.id, 'comments')} id="downvote" tooltip="down-vote" glyph="chevron-down"></ButtonWithTooltip></div>
        </div>
        <div className="col-xs-11">
          <div className="comment-body">{comment.body}</div>
          <div className="comment-footer">{comment.voteScore} points by {comment.author} submitted @ <Moment format="YYYY-MM-DD HH:mm">{comment.timestamp}</Moment></div>
          <div><Button onClick={() => this.openEditCommentModal(comment.id)} bsSize="xsmall">edit</Button><Button onClick={() => this.props.deletePost(comment.id, 'comments', comment.parentId)} bsSize="xsmall">delete</Button></div>
        </div>
      </div>
      <Modal
          style={customStyles}
          isOpen={this.props.modal[comment.id]}
          onRequestClose={() => this.closeEditCommentModal(comment.id)}
          contentLabel='Modal'
        >
          <form id={comment.id}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Edit comment</ControlLabel>
            <FormControl componentClass="textarea" defaultValue={comment.body} onChange={e => this.props.comment.newbody=e.target.value}/>
          </FormGroup>
          
          <Button onClick={() => this.closeEditCommentModal(comment.id)}>Cancel</Button><Button onClick={() => this.updateComment(this, comment.id)}>Save</Button>
          </form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps ({comments, modals}) {

  return {
    comments: comments,
    modal: modals
  }
}

function mapDispatchToProps (dispatch) {
  return {
    upVote: (id, type) => dispatch(upVote(id, type)),
    downVote: (id, type) => dispatch(downVote(id, type)),
    deletePost: (id, type, parentId) => dispatch(deletePost(id, type, parentId)),
    updateComment: (comment, timestamp) => dispatch(updateComment(comment, timestamp)),
    toggleModal: (modal, state) => dispatch(toggleModal(modal, state)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)



