export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SEND_UPVOTE = 'SEND_UPVOTE'
export const RECEIVE_UPVOTE = 'RECEIVE_UPVOTE'
export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST'
export const RECEIVE_VOTE_COMMENT = 'RECEIVE_VOTE_COMMENT'
export const RECEIVE_DELETE_POST = 'RECEIVE_DELETE_POST'
export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT'
export const RECEIVE_UPDATE_COMMENT = 'RECEIVE_UPDATE_COMMENT'
export const RECEIVE_UPDATE_POST = 'RECEIVE_UPDATE_POST'
export const RECEIVE_SORT = 'RECEIVE_SORT'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const POST_COMMENT = 'POST_COMMENT'
export const POST_POST = 'POST_POST'

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
    receivedAt: Date.now()
  }
}

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES
  }
}

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.categories,
    receivedAt: Date.now()
  }
}

function requestComments() {
  return {
    type: REQUEST_COMMENTS
  }
}

function receiveComments(json, id) {
  return {
    type: RECEIVE_COMMENTS,
    comments: json,
    parentId: id,
    receivedAt: Date.now()
  }
}

function sendUpVote(){
  return {
    type: SEND_UPVOTE
  }
}

function receiveUpVote(json) { 
  return {
    type: (json.parentId !== undefined) ? RECEIVE_VOTE_COMMENT : RECEIVE_VOTE_POST,
    result: json,
    receivedAt: Date.now()
  }
}

function receiveDownVote(json) { 
  return {
    type: (json.parentId !== undefined) ? RECEIVE_VOTE_COMMENT : RECEIVE_VOTE_POST,
    result: json,
    receivedAt: Date.now()
  }
}

function receiveDelete(json, type, id, parentId) { 
  return {
    type: (type === 'comments') ? RECEIVE_DELETE_COMMENT : RECEIVE_DELETE_POST,
    id: id,
    parentId: parentId,
    result: json,
    receivedAt: Date.now()
  }
}

function receiveComment(json, comment) { 
  return {
    type: RECEIVE_UPDATE_COMMENT,
    comment: comment,
    result: json,
    receivedAt: Date.now()
  }
}
function receiveUpdatePost(json, post) { 
  return {
    type: RECEIVE_UPDATE_POST,
    post: post,
    result: json,
    receivedAt: Date.now()
  }
}

function receiveCommentPost(response, comment) { 
  return {
    type: POST_COMMENT,
    comment: comment,
    response: response,
    receivedAt: Date.now()
  }
}

function receivePostPost(response, post) { 
  return {
    type: POST_POST,
    post: post,
    response: response,
    receivedAt: Date.now()
  }
}

const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  "Content-Type": "application/json",
  'Authorization': token
}

export function fetchPosts() {
  return function (dispatch) {
    dispatch(requestPosts())
    return fetch(`${api}/posts`, {headers})
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json))
      )
  }
}

export function fetchCategories() {
  return function (dispatch) {
    dispatch(requestCategories())
    return fetch(`${api}/categories`, {headers})
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json))
      )
  }
}

export function fetchComments(id) {
  return function (dispatch) {
    dispatch(requestComments())
    return fetch(`${api}/posts/${id}/comments`, {headers})
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json, id))
      )
  }
}

export function upVote(id, type) {
  return function (dispatch){  
    dispatch(sendUpVote())
    return fetch(`${api}/${type}/${id}`, {method: 'post', body: JSON.stringify({option: "upVote"}),headers})
      .then(response => response.json())
      .then(json => {dispatch(receiveUpVote(json))})
  }
}
export function downVote(id, type) {
  return function (dispatch){
    return fetch(`${api}/${type}/${id}`, {method: 'post', body: JSON.stringify({option: "downVote"}),headers})
      .then(response => response.json())
      .then(json => {dispatch(receiveDownVote(json))})
  }
}
export function deletePost(id, type, parentId) {
  return function (dispatch){
    return fetch(`${api}/${type}/${id}`, {method: 'delete', headers})
      .then(response => {dispatch(receiveDelete(response, type, id, parentId))})
  }
}

export function updateComment(comment, timestamp) {
  return function (dispatch){
    return fetch(`${api}/comments/${comment.id}`, {method: 'put', body: JSON.stringify({body: comment.newbody, timestamp: timestamp}), headers})
      .then(response => {dispatch(receiveComment(response, comment, timestamp))})
  }
}

export function updatePost(post, timestamp) {
  return function (dispatch){
    return fetch(`${api}/posts/${post.id}`, {method: 'put', body: JSON.stringify({title: post.newtitle, body: post.newbody, timestamp: timestamp}), headers})
      .then(response => {dispatch(receiveUpdatePost(response, post, timestamp))})
  }
}

export function sortOrder(data) {
  return {
    type: RECEIVE_SORT,
    sort: data  
  }
}

export function toggleModal(modal, state) {
  return {
    type: TOGGLE_MODAL,
    modal: modal,
    state: state  
  }
}

export function postComment(comment) {
  return function (dispatch){
    return fetch(`${api}/comments`, {method: 'post', body: JSON.stringify(comment), headers})
      .then(response => {dispatch(receiveCommentPost(response, comment))})
  }
}

export function postPost(post) {
  return function (dispatch){
    return fetch(`${api}/posts`, {method: 'post', body: JSON.stringify(post), headers})
      .then(response => {dispatch(receivePostPost(response, post))})
  }
}