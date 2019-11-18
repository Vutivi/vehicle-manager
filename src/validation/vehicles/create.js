const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCreateInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.make = !isEmpty(data.make) ? data.make : "";
  data.model = !isEmpty(data.model) ? data.model : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
  data.vehicle_number = !isEmpty(data.vehicle_number) ? data.vehicle_number : "";
// Name checks
  if (Validator.isEmpty(data.make)) {
    errors.name = "Make field is required";
  }
// Email checks
  if (Validator.isEmpty(data.model)) {
    errors.email = "Model field is required";
  }
// Password checks
  if (Validator.isEmpty(data.color)) {
    errors.password = "Color field is required";
  }
if (Validator.isEmpty(data.user_id)) {
    errors.user_id = "user id field is required";
  }
if (Validator.isEmpty(data.vehicle_number)) {
    errors.vehicle_number = "Vehicle number field is required";
  }
if (!Validator.isLength(data.vehicle_number, { min: 8, max: 10 })) {
    errors.password = "Vehicle number must be between 8 and 10 characters long";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};