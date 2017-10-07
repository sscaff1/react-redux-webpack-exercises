import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  changeField,
  showCountry,
  getStatesForCountry,
  validateAllFields,
  focusOnField,
} from '../actions';

class ShippingForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    onBlurChange: PropTypes.func.isRequired,
    onShowCountry: PropTypes.func.isRequired,
    showCountryField: PropTypes.bool.isRequired,
    getStates: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    button: PropTypes.object.isRequired,
    focusField: PropTypes.string.isRequired,
    removeFocusField: PropTypes.func.isRequired,
    formSubmitted: PropTypes.bool.isRequired,
    accessToStates: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getStates(this.props.fields.country.value);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.fields.country.value !== prevProps.fields.country.value &&
      this.props.accessToStates
    ) {
      this.props.getStates(this.props.fields.country.value);
    }
    if (this[this.props.focusField]) {
      this[this.props.focusField].focus();
      this.props.removeFocusField();
    }
  }

  getFieldProps(field) {
    const { onBlurChange, fields } = this.props;
    return {
      name: field,
      id: field,
      onChange(e) {
        onBlurChange(
          field,
          e.target.value,
          fields,
          fields[field].hasBeenValidated
        );
      },
      onBlur(e) {
        onBlurChange(field, e.target.value, fields, true);
      },
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
    const {
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
            {...fields.firstName}
          />
          <Input
            inputRef={input => (this.lastName = input)}
            label="Last Name"
            classContainer="group"
            {...this.getFieldProps('lastName')}
            {...fields.lastName}
          />
        </div>
        <Input
          label="Street Address"
          inputRef={input => (this.address1 = input)}
          {...this.getFieldProps('address1')}
          {...fields.address1}
        />
        <Input
          inputRef={input => (this.address2 = input)}
          label="Apartment/Suite/Other"
          placeholder="optional"
          {...this.getFieldProps('address2')}
          {...fields.address2}
        />
        {showCountryField ? (
          <Input
            label="Country"
            inputRef={input => (this.country = input)}
            {...this.getFieldProps('country')}
            {...fields.country}
            isSelect
          >
            {this.renderSelectChildren(fields.country.children)}
          </Input>
        ) : (
          <a href="#" onClick={onShowCountry}>
            My address is outside the U.S.
          </a>
        )}
        <Input
          label="City"
          inputRef={input => (this.city = input)}
          {...this.getFieldProps('city')}
          {...fields.city}
        />
        {this.props.accessToStates && (
          <Input
            label="State"
            inputRef={input => (this.state = input)}
            {...this.getFieldProps('state')}
            {...fields.state}
            isSelect
          >
            {Object.keys(fields.state.children).length > 1 && (
              <option value={-1}>Select State/Province</option>
            )}
            {this.renderSelectChildren(fields.state.children)}
          </Input>
        )}
        <Input
          label="Zip/Postal Code"
          inputRef={input => (this.zip = input)}
          {...this.getFieldProps('zip')}
          classContainer="small"
          {...fields.zip}
        />
        <Input
          label="Phone"
          inputRef={input => (this.phone = input)}
          {...this.getFieldProps('phone')}
          {...fields.phone}
        />
        <Input
          label="Email"
          inputRef={input => (this.email = input)}
          {...this.getFieldProps('email')}
          {...fields.email}
        />
        <div className="buttonWrapper">
          <Button {...button} onClick={validateFields} />
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

const mapStateToProps = state => {
  return { fields: state.fields, button: state.button, ...state.form };
};

const mapDispatchToProps = dispatch => {
  return {
    onBlurChange(field, value, fields, hasBeenValidated) {
      dispatch(changeField(field, value, fields, hasBeenValidated));
    },
    onShowCountry(e) {
      e.preventDefault();
      dispatch(showCountry());
    },
    getStates(country) {
      dispatch(getStatesForCountry(country));
    },
    validateFields() {
      dispatch(validateAllFields());
    },
    removeFocusField() {
      dispatch(focusOnField(''));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm);
