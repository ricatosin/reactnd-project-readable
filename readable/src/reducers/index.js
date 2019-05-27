import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  RECEIVE_VOTE_POST,
  RECEIVE_VOTE_COMMENT,
  RECEIVE_DELETE_POST,
  RECEIVE_DELETE_COMMENT,
  RECEIVE_UPDATE_COMMENT,
  RECEIVE_UPDATE_POST,
  RECEIVE_SORT,
  TOGGLE_MODAL,
  POST_COMMENT,
  POST_POST,
} from '../actions'


const initialPostState = {
  isFetching: false,
  posts: [],
  comments: [],
  sortCategory: 'voteScore',
  sortOrder: '-'
}

const initialCategoryState = {
  isFetching: false,
  categories: []
}

const initialCommentsState = {
  isFetching: false,
}


function modals (state = {}, action) {
  switch(action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        [action.modal]: action.state
      }
    default:
      return state  
  }
}

function posts (state = initialPostState, action) {
  switch(action.type) {
    case POST_POST:
      console.log("state", state)
      console.log("action", action)
      return {
        ...state,
        posts: state.posts.concat(action.post)
      }
    case RECEIVE_SORT:
      let sortOrder = state.sortOrder
      action.sort === state.sortCategory 
      ? sortOrder === '-' 
        ? sortOrder = ''
        : sortOrder= '-'
      : sortOrder = '-'

      return {
        ...state,
        sortOrder: sortOrder,
        sortCategory: action.sort
      }
    
    case RECEIVE_UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(el => {
          if(el.id === action.post.id)
            return Object.assign({}, el, {body: action.post.newbody || action.post.body, title: action.post.newtitle || action.post.title, timestamp: action.timestamp})
          return el
      })
    }
    case RECEIVE_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(el => {
          if(el.id === action.result.id)
            return Object.assign({}, el, {voteScore: action.result.voteScore})
          return el
        })
      }
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        posts: state.posts.map(el => {
          if(el.id === action.id)
            return Object.assign({}, el, {deleted: action.result.ok})
          return el
        })
      }
    case REQUEST_POSTS:
      return { 
        ...state,
        isFetching: true
      }    
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        posts: action.posts
      }
    default:
      return state
  }
}

function categories (state = initialCategoryState, action) {
  switch(action.type) {
    case REQUEST_CATEGORIES:
      return { 
        ...state,
        isFetching: true
      }    
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        isFetching: false,
        categories: action.categories
      }
    default:
      return state
  }
}

function comments (state = initialCommentsState, action, id) {
  const {parentId, comments} = action
  switch(action.type) {
    case POST_COMMENT:
    return {
      ...state,
      [action.comment.parentId]: state[action.comment.parentId].concat(action.comment)
    }
    case RECEIVE_UPDATE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].map(el =>{
          if (el.id === action.comment.id)
            return Object.assign({}, el, {body: action.comment.newbody, timestamp: action.timestamp})
          return el
        })
      }
    case RECEIVE_VOTE_COMMENT:
      return {
        ...state,
        [action.result.parentId]: state[action.result.parentId].map(el => {
          if(el.id === action.result.id)
            return Object.assign({}, el, {voteScore: action.result.voteScore})
          return el
        })
      }
    case RECEIVE_DELETE_COMMENT:
      return {
        ...state,
        [action.parentId]: state[action.parentId].map(el => {
          if(el.id === action.id)
            return Object.assign({}, el, {deleted: action.result.ok})
          return el
        })
      }
    case REQUEST_COMMENTS:
      return { 
        ...state,
        isFetching: true
      }    
    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        [parentId]: comments
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  posts, categories, comments, modals, form: formReducer
})

export default rootReducer