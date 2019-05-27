import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Form, FormControl, FormGroup, Col, ControlLabel, Button} from 'react-bootstrap'
import Header from './Header'
const validate = values => {
  const errors = {}
  if (!values.author) {
    errors.author = 'warning'
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

let CommentForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  
  return (
    <div>
      <Header/>
  <div className="well">  
    <Form horizontal onSubmit={ handleSubmit } >
      <Field
        name="category"
        type="text"
        component={renderField}
        label="Category"
        disabled="true"
      />
      <Field
        name="author"
        type="text"
        component={renderField}
        label="Author"
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


export default reduxForm({
  form: 'comment', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  enableReinitialize: true,  //warn // <--- warning function given to redux-form
})(CommentForm)

