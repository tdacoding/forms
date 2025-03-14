import styles from './Form.module.css';
import { useState, useRef, useEffect } from 'react';
import { validateForm } from '../utils/validation';

export const Form = () => {
	const init = {
		login: '',
		pass: '',
		rePass: '',
	};

	const [formData, setFormData] = useState(init);
	const [errors, setErrors] = useState(init);
	const [toShowErrors, setToShowErrors] = useState(init);

	const submitButtonRef = useRef();
	const isSubmitButtonDisabled = Object.keys(errors).length > 0;

	const onChangeHandler = ({ target }) => {
		setFormData({ ...formData, [target.name]: target.value });
	};
	const onBlureHandler = ({ target }) => {
		setToShowErrors({ ...toShowErrors, [target.name]: !!errors[target.name] });
	};
	const onFocusHandler = ({ target }) => {
		setToShowErrors({ ...toShowErrors, [target.name]: false });
	};

	useEffect(() => {
		const errors = validateForm(formData);
		setErrors(errors);
	}, [formData]);

	useEffect(() => {
		if (!isSubmitButtonDisabled) {
			submitButtonRef.current.focus();
		}
	});

	const sendFormData = (formData) => {
		console.log(formData.login, formData.pass);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData(formData);
	};

	return (
		<form className={styles.regForm} onSubmit={onSubmit}>
			<h1>Регистрационная форма</h1>
			<input
				className={
					toShowErrors.login
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="login"
				type="text"
				placeholder="Имя пользователя"
				value={formData.login}
				onChange={onChangeHandler}
				onBlur={onBlureHandler}
				onFocus={onFocusHandler}
			/>
			{toShowErrors.login && <div className={styles.error}>{errors.login}</div>}
			<input
				className={
					toShowErrors.pass
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="pass"
				type="password"
				placeholder="Пароль"
				value={formData.pass}
				onChange={onChangeHandler}
				onBlur={onBlureHandler}
				onFocus={onFocusHandler}
			/>
			{toShowErrors.pass && <div className={styles.error}>{errors.pass}</div>}
			<input
				className={
					toShowErrors.rePass
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="rePass"
				type="password"
				placeholder="Повторите пароль"
				value={formData.rePass}
				onChange={onChangeHandler}
				onBlur={onBlureHandler}
				onFocus={onFocusHandler}
			/>
			{toShowErrors.rePass && <div className={styles.error}>{errors.rePass}</div>}
			<button
				className={styles.regButton}
				type="submit"
				ref={submitButtonRef}
				disabled={isSubmitButtonDisabled}
			>
				Зарегистрировать
			</button>
		</form>
	);
};
