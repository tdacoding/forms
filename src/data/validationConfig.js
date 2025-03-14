export const validationScheme = {
	login: {
		isRequired: {
			message: 'Имя пользователя не может быть пустым',
		},
		isFromDigit: {
			message: 'Имя пользователя не должно начинаться с цифры',
		},
		isLogin: {
			message:
				'Неверное имя пользователя. Допустимые символы: латинские буквы, цифры и нижнее подчёркивание',
		},
		min: {
			message: 'Имя пользователя должно быть не менее 3-х символов',
			param: 3,
		},
		max: {
			message: 'Имя пользователя должно быть не более 20-ти символов',
			param: 20,
		},
	},
	pass: {
		isRequired: {
			message: 'Необходимо ввести пароль',
		},
		min: {
			message: 'Минимальная длина пароля --- 8 символов',
			param: 8,
		},
		isPass: {
			message:
				'Пароль должен содержать хотя бы одну цифру, и хотя бы один спецсимвол из !@#$%^&*',
		},
		isPassLatin: {
			message:
				'Пароль содержит недопустимые символы. Допустимы символы латинского алфавита, цифры и символы !@#$%^&*',
		},
	},
	rePass: {
		isRequired: {
			message: 'Необходимо повторить пароль',
		},
		isMatch: {
			message: 'Пароли не совпадают',
			field: 'pass',
		},
	},
};

export const validationRules = {
	isRequired: (value) => !!value.trim(),
	min: (value, param) => value.length >= param,
	max: (value, param) => value.length <= param,
	isFromDigit: (value) => !/^[0-9]+[\w_]*$/.test(value),
	isLogin: (value) => /^[\w_]*$/.test(value),
	isPass: (value) => /(?=.*?[0-9])(?=.*?[!@#$%^&*])/.test(value),
	isPassLatin: (value) => /^[0-9A-Za-z!@#$%^&*]*$/.test(value),
	isMatch: (value1, s, value2) => value1 === value2,
};
