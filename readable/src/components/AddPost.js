import React from 'react'
import PostForm from './PostForm'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import { postPost } from '../actions'

class AddPost extends React.Component {
  submit = (values, context) => {
    //**id** - UUID should be fine, but any unique id will work
    //**timestamp** - [Timestamp] Canin whatever format you like, you can use `Date.now()` if you like.
    //**title** - [String]
    //**body** - [String] <br>
    //**author** - [String]
    //**category** -  Any of the categories listed in `categories.js`values.id = uuidv1()

    values.timestamp = Date.now()
    values.id = uuidv1()
    values.voteScore = 1
    values.deleted = false
    this.props.postPost(values)
    this.props.category ? this.props.history.push(`/category/${this.props.category}`) : this.props.history.push('/')

  }
  render() {
    //const category = this.props.posts.filter(p => p.id === this.props.parentId).map(c => c.category)[0]
    return (
      <PostForm onSubmit={this.submit} initialValues={{category: this.props.category, categories: this.props.categories}}/>
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
    postPost: (data) => dispatch(postPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost)