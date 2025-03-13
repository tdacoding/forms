import styles from './App.module.css';
import { useState } from 'react';

function App() {
	const errorsInit = {
		loginError: null,
		passError: null,
	};
	const [login, setLogin] = useState('');
	const [isLoginOk, setIsLoginOk] = useState(false);
	const [pass, setPass] = useState('');
	const [isPassOk, setIsPassOk] = useState(false);
	const [rePass, setRePass] = useState('');
	const [errors, setErrors] = useState(errorsInit);

	const sendFormData = (formData) => {
		console.log(formData);
	};
	const isRePassOk = pass === rePass;
	const isBtnDisabled = !(isLoginOk && isPassOk && isRePassOk);

	const onLoginChange = ({ target }) => {
		setLogin(target.value);
		let newError = null;
		if (/^[0-9]+[\w_]*$/.test(target.value)) {
			newError = 'Неверный логин. Логин не должен начинаться с цифры';
		} else if (!/^[\w_]*$/.test(target.value)) {
			newError =
				'Неверный логин. Допустимые символы: латинские буквы, цифры и нижнее подчёркивание';
		} else if (target.value.length > 20) {
			newError = 'Неверный логин. Должно быть не больше 20 символов';
		}
		setIsLoginOk(!newError && target.value.length >= 3);
		setErrors({ ...errors, loginError: newError });
	};
	const onLoginBlur = ({ target }) => {
		if (target.value.length < 3) {
			setErrors({
				...errors,
				loginError: 'Неверный логин. Должно быть не менее 3 символов',
			});
		}
	};
	const onPassChange = ({ target }) => {
		setPass(target.value);
		setErrors({ ...errors, passError: null });
	};
	const onPassBlur = ({ target }) => {
		let newError = null;
		if (!/^[0-9A-Za-z!@#$%^&*]*$/.test(target.value)) {
			newError =
				'Пароль содержитнедопустимые символы. Допустимы символы латинского алфавита, цифры и символы !@#$%^&*';
		} else if (target.value.length < 8) {
			newError = 'Пароль должен быть не менее 8 символов';
		} else if (!/(?=.*?[0-9])(?=.*?[!@#$%^&*])/.test(target.value)) {
			newError =
				'Пароль должен содержать хотя бы одну цифру, и хотя бы один спецсимвол из !@#$%^&*';
		}
		setErrors({ ...errors, passError: newError });
		setIsPassOk(!newError);
	};
	const onRePassChange = ({ target }) => {
		setRePass(target.value);
	};
	const onRePassBlur = ({ target }) => {};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ login, pass });
	};

	return (
		<form className={styles.regForm} onSubmit={onSubmit}>
			<h1>Регистрационная форма</h1>
			{errors.loginError && <div className={styles.error}>{errors.loginError}</div>}
			{errors.passError && <div className={styles.error}>{errors.passError}</div>}
			<input
				className={
					errors.loginError
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="login"
				type="text"
				value={login}
				onChange={onLoginChange}
				onBlur={onLoginBlur}
				placeholder="Имя пользователя"
			/>
			<br />
			<input
				className={
					errors.passError
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="pass"
				type="password"
				value={pass}
				onChange={onPassChange}
				onBlur={onPassBlur}
				placeholder="Пароль"
			/>
			<br />
			<input
				className={styles.regInput}
				name="rePass"
				type="password"
				value={rePass}
				onChange={onRePassChange}
				onBlur={onRePassBlur}
				placeholder="Повторите пароль"
			/>
			{!isRePassOk && rePass.length >= 1 && (
				<div className={styles.error}>Пароли не совпадают</div>
			)}
			<button className={styles.regButton} type="submit" disabled={isBtnDisabled}>
				Зарегистрировать
			</button>
		</form>
	);
}

export default App;
