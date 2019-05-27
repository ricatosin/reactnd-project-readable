import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import Moment from 'react-moment'
import Modal from 'react-modal'
import {Link} from 'react-router-dom'
import ButtonWithTooltip from './ButtonWithTooltip'
import {upVote, downVote, fetchComments, deletePost, updatePost, toggleModal} from '../actions'
import { connect } from 'react-redux'
import customStyles from './Modal'

class Post extends Component {
  openEditPostModal = (id) => {
    this.props.toggleModal(id, true)
  }
  closeEditPostModal = (id) =>  {
    this.props.toggleModal(id, false)
  }
  componentDidMount(){
    this.props.fetchComments(this.props.post.id)
  }
  updatePost = (e, id) => {
    let timestamp = Date.now()
    this.props.updatePost(this.props.post, timestamp)
    this.closeEditPostModal(id)
  }
  render() {
    const {post, comments} = this.props
    const numberOfComments = comments[post.id] === undefined ? 0 : comments[post.id].length
    const deletedComments = comments[post.id] === undefined ? 0 : comments[post.id].filter(c => c.deleted === true).length
    return (
      <div className="edit-post">
        <div className="col-xs-1">
          <div className="up-vote"><ButtonWithTooltip onClick={() => this.props.upVote(post.id, 'posts')} id="upvote" tooltip="up-vote" glyph="chevron-up"></ButtonWithTooltip></div>
          <div className="down-vote"><ButtonWithTooltip onClick={() => this.props.upVote(post.id, 'posts')} id="downvote" tooltip="down-vote" glyph="chevron-down"></ButtonWithTooltip></div>
        </div>
          <div className="col-xs-11">
            <div className="post-title">{post.title} - {post.category}</div>
            <div className="post-body">{post.body}</div>
            <div className="post-footer">{post.voteScore} points by {post.author} submitted @ <Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></div>
            <Link to={{ pathname: "/" + post.category + "/" + post.id }}>
            <div className="post-comments">comments ({numberOfComments - deletedComments})</div>
            </Link>
            {(this.props.detail) ? <div><Button onClick={() => this.openEditPostModal(post.id)} bsSize="xsmall">edit</Button><Button onClick={() => this.props.deletePost(post.id, 'posts')} bsSize="xsmall">delete</Button></div> : null}
          </div>
          <Modal
          style={customStyles}
          isOpen={this.props.modal[post.id]}
          onRequestClose={this.closeEditPostModal}
          contentLabel='Modal'
        >
          <form id={post.id}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Edit comment</ControlLabel>
            <FormControl type="text" defaultValue={post.title} onChange={e => post.newtitle=e.target.value}/>
            <FormControl componentClass="textarea" defaultValue={post.body} onChange={e => post.newbody=e.target.value}/>
          </FormGroup>
          
          <Button onClick={() => this.closeEditPostModal(post.id)}>Cancel</Button><Button onClick={() => this.updatePost(this, post.id)}>Save</Button>
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
    fetchComments: (id) => dispatch(fetchComments(id)),
    deletePost: (id, type) => dispatch(deletePost(id, type)),
    updatePost: (post, timestamp) => dispatch(updatePost(post, timestamp)),
    toggleModal: (modal, state) => dispatch(toggleModal(modal, state))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
