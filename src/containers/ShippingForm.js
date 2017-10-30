import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { toggleCountryVisibility } from '../actions/form';

class ShippingForm extends Component {
  getFieldProps(field) {
    return {
      name: field,
      id: field,
    };
  }

  renderSelectChildren(options) {
    const children = [];
    for (let key in options) {
      children.push(
        <option key={key} value={key}>
          {options[key]}
        </option>
      );
    }
    return children;
  }

  render() {
    console.log(this.props)
    const {
      onClickTest,
      fields,
      showCountryField,
      onBlurChange,
      onShowCountry,
      loading,
      button,
      validateFields,
      formSubmitted,
    } = this.props;
    if (formSubmitted) {
      return <h1>Form Submitted</h1>;
    }
    if (loading) {
      return (
        <div className="loading">
          <h2>Loading...</h2>
          <style global jsx>{`
            :root {
              background-color: rgba(100, 100, 100, 0.7);
            }
          `}</style>
          <style jsx>{`
            .loading {
              align-items: center;
              display: flex;
              height: 100%;
              justify-content: center;
            }
          `}</style>
        </div>
      );
    }
    return (
      <form>
        <div className="group">
          <Input
            inputRef={input => (this.firstName = input)}
            label="First Name"
            classContainer="group"
            {...this.getFieldProps('firstName')}
          />
          <Input
            inputRef={input => (this.lastName = input)}
            label="Last Name"
            classContainer="group"
            {...this.getFieldProps('lastName')}
          />
        </div>
        <Input
          inputRef={input => (this.address1 = input)}
          label="Street Address"
          {...this.getFieldProps('address1')}
        />
        <Input
          inputRef={input => (this.address2 = input)}
          label="Apartment/Suite/Other"
          placeholder="optional"
          {...this.getFieldProps('address2')}
        />
        {!this.props.form.showCountry ?
          <a href="#" onClick={onShowCountry}>My address is outside the U.S.</a>
          : <Input label="Country" />}
        <Input
          label="City"
          inputRef={input => (this.city = input)}
          {...this.getFieldProps('city')}
        />
        <Input
          label="Zip/Postal Code"
          inputRef={input => (this.zip = input)}
          {...this.getFieldProps('zip')}
          classContainer="small"
        />
        <Input
          label="Phone"
          inputRef={input => (this.phone = input)}
          {...this.getFieldProps('phone')}
        />
        <Input
          label="Email"
          inputRef={input => (this.email = input)}
          {...this.getFieldProps('email')}
        />
        <div className="buttonWrapper">
          <Button />
        </div>
        <style jsx>{`
          form {
            width: 342px;
          }
          .group {
            display: flex;
            justify-content: space-between;
          }
          a {
            color: #000;
            display: block;
            font-size: 12px;
            margin: 3px 0 13px;
            text-align: right;
          }
          .buttonWrapper {
            display: inline-block;
            margin: 20px 0 0;
          }
        `}</style>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { form: state.form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowCountry(e) {
      e.preventDefault();
      dispatch(toggleCountryVisibility(true))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)

