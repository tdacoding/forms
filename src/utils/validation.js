import { validationScheme, validationRules } from '../data/validationConfig';

export const validateForm = (formData) => {
	const errors = {};
	for (const fieldName in formData) {
		const fieldRules = validationScheme[fieldName];
		for (const rule in fieldRules) {
			const { message, param, field } = fieldRules[rule];
			const validatorFunction = validationRules[rule];
			if (
				validatorFunction &&
				!validatorFunction(formData[fieldName], param, formData[field])
			) {
				errors[fieldName] = message;
			}
		}
	}
	return errors;
};
