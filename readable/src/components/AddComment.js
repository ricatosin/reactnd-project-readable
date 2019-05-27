import React from 'react'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import { postComment } from '../actions'

class AddComment extends React.Component {
  submit = (values, context) => {
    //  **id** - Any unique ID. As with posts, UUID is probably the best here. 
    //  **timestamp** - [Timestamp] Get this however you want. 
    //  **body** - [String] 
    //  **author** - [String] 
    //  **parentId** - Should match a post id in the database. |
    values.id = uuidv1()
    values.timestamp = Date.now()
    values.parentId = this.props.parentId
    this.props.postComment(values)
    this.props.history.push(`/posts/${this.props.parentId}`);

  }
  render() {
    const category = this.props.posts.filter(p => p.id === this.props.parentId).map(c => c.category)[0]
    return (
      <CommentForm onSubmit={this.submit} initialValues={{category: category}}/>
    )
  }
}



function mapStateToProps ({posts, categories}) {
  return {
    posts: posts.posts,
    categories: categories.categories,
  }
}

function mapDispatchToProps(dispatch){
  return {
    postComment: (data) => dispatch(postComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment)