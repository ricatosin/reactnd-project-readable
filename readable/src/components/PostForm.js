import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Form, FormControl, FormGroup, Col, ControlLabel, Button} from 'react-bootstrap'
import Header from './Header'
import {connect} from 'react-redux'

const validate = values => {
  const errors = {}
  if (!values.category) {
    errors.category = 'warning'
  }
  if (!values.author) {
    errors.author = 'warning'
  }
  if (!values.title) {
    errors.title = 'warning'
  }
  if (!values.body) {
    errors.body = 'warning'
  }
  return errors
}
const renderField = ({
  input,
  label,
  type,
  componentClass,
  disabled,
  meta: { touched, error, warning }
}) =>
  <div>
    <FormGroup  validationState={touched && error ? error : null}>
    <Col componentClass={ControlLabel} sm={1}>
      {label}
    </Col>
    <Col sm={8}>
        <FormControl {...input} componentClass={componentClass} placeholder={label} type={type} disabled={disabled}/>
    </Col>
    </FormGroup>
  </div>
  
const renderSelect = ({
  input,
  label,
  type,
  componentClass,
  disabled,
  options,
  meta: { touched, error, warning }
}) => {
  console.log("options", options)
  return (
  <div>
    <FormGroup  validationState={touched && error ? error : null}>
    <Col componentClass={ControlLabel} sm={1}>
      {label}
    </Col>
    <Col sm={8}>
        <FormControl {...input} componentClass={componentClass} placeholder={label} type={type} disabled={disabled}>
          {options.map(o => (<option key={o.text} value={o.value}>{o.text}</option>))}
        </FormControl>
    </Col>
    </FormGroup>
  </div>)
}
let PostForm = props => {
  const { handleSubmit, pristine, reset, submitting, categories } = props
  
  return (
    <div>
      <Header/>
  <div className="well">  
    <Form horizontal onSubmit={ handleSubmit } >
      <Field
        name="category"
        type="select"
        componentClass="select"
        options={[{value:'', text:'Choose category:'}].concat(categories.map((category) => ({value: category.name, text: category.name})))}
        component={renderSelect}
        label="Category"
      />
      <Field
        name="author"
        type="text"
        component={renderField}
        label="Author"
      />
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />
      <Field
        name="body"
        type="textarea"
        component={renderField}
        componentClass="textarea"
        label="Body"
      />
      <FormGroup>
      <Col smOffset={1} sm={10}>
      <Button type="submit" disabled={submitting}>
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </Col>
    </FormGroup>
        
    </Form>
    </div>
    </div>
  )
}

function mapStateToProps ({posts, categories}) {
  return {
    categories: categories.categories,
  }
}

PostForm = connect(
  mapStateToProps,
  undefined
)(PostForm)

export default reduxForm({
  form: 'post',
  validate, 
  enableReinitialize: true,  
})(PostForm)

