import React, { Component } from 'react';
import Post from './Post'
import Header from './Header';
import SortBar from './SortBar'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import {fetchComments} from '../actions'
import Comment from './Comment'

class PostDetail extends Component {

  componentDidMount() {
    this.props.fetchComments(this.props.postid);
  }
  render() {
    return (
      <div className="main-page">
        <Header />
        <div className="col-xs-2"></div>
        <div className="col-xs-6">
          <div className="posts">
            <h3>Posts</h3>
              {this.props.allPosts
                .filter(post => post.id === this.props.postid)
                .map((post) => {
                  if (post.deleted) {
                    return <h3 key={post.id}>Post has been deleted</h3>
                  } else {
                    return (
                      <div key={post.id} >
                        <Post post={post} detail={true}/>
                        <SortBar comment={true}></SortBar>
                        <ol>
                          {this.props.comments[this.props.postid] === undefined ? null : this.props.comments[this.props.postid]
                            .sort(sortBy(this.props.sort.sortOrder + this.props.sort.sortCategory))
                            .map((comment) => {
                              if (!comment.deleted)
                                return <Comment key={comment.id} comment={comment}/>
                              return null
                          })}
                        </ol>
                        <div className="add-post" >
                          <Link to={{pathname: "/add/comment/" + post.id }}><Glyphicon glyph="plus"/></Link>
                        </div>
                      </div>
                    )
                  }
                })
              }
          </div>  
        </div>
      </div>
    );
  }
}

function mapStateToProps ({posts, categories, comments}) {
  return {
    allPosts: posts.posts,
    allCategories: categories.categories,
    comments: comments,
    sort: posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (data) => dispatch(fetchComments(data)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)


