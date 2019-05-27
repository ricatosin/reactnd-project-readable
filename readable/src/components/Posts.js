import React, { Component } from 'react';
import Post from './Post'
import Navigation from './Navigation';
import Header from './Header';
import SortBar from './SortBar'
import sortBy from 'sort-by'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'

class Posts extends Component {

  render() {
    return (
      <div className="main-page">
        <Header />
        <div className="col-xs-2"><Navigation categories={this.props.allCategories}/></div>
        <div className="col-xs-5">
          <div className="posts">
            <h3>Posts</h3>
            <SortBar></SortBar>
            <ol>
              {this.props.allPosts
                .filter(post => {
                  if (this.props.category) {
                    if (post.category === this.props.category) {
                      return -1
                    }
                  } else {
                    return -1
                  }
                  return null
                })
                .sort(sortBy(this.props.sort.sortOrder + this.props.sort.sortCategory))
                .map((post) => {
                  if (!post.deleted)
                    return <Post key={post.id} post={post}/>
                  return null
                })
              }
            </ol>
          </div>
          <div className="add-post">
            <Link to={{pathname: this.props.category !== undefined ? `/add/post/${this.props.category}` : '/add/post' }}><Glyphicon glyph="plus"/></Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps ({posts, categories}) {
  return {
    allPosts: posts.posts,
    allCategories: categories.categories,
    sort: posts
  }
}

export default connect(
  mapStateToProps,
  undefined
)(Posts)


