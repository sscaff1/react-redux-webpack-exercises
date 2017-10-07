import { validations, validationRules } from '../constants/validations';

export default (field, value, fields) => {
  const rules = validationRules[field];
  const errors = [];
  rules.forEach(rule => {
    const error = rule.startsWith('max') ? validations.max : validations[rule];
    if (error.validate(value, rule, fields)) {
      errors.push(error.message(rule));
    }
  });
  return errors;
};
