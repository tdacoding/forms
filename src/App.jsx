import styles from './App.module.css';
import { useState } from 'react';

function App() {
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const [rePass, setRePass] = useState('');
	const [error, setError] = useState(null);

	const sendFormData = (formData) => {
		console.log(formData);
	};

	const onLoginChange = ({ target }) => {
		setLogin(target.value);
	};
	const onLoginBlur = ({ target }) => {
		let newError = null;
		if (!/^[^0-9]+[\w_]*$/.test(target.value)) {
			newError = 'Неверный логин. Логин не должен начинаться с цифры';
		} else if (!/^[\w_]*$/.test(target.value)) {
			newError =
				'Неверный логин. Допустимые символы: латинские буквы, цифры и нижнее подчёркивание';
		} else if (target.value.length > 20) {
			newError = 'Неверный логин. Должно быть не больше 20 символов';
		} else if (target.value.length < 3) {
			newError = 'Неверный логин. Должно быть не менее 3 символов';
		}
		if (newError) {
			target.classList.add(`${styles.errorClass}`);
		} else {
			target.classList.remove(`${styles.errorClass}`);
		}
		setError(newError);
	};
	const onPassChange = ({ target }) => {
		setPass(target.value);
	};
	const onRePassChange = ({ target }) => {
		setRePass(target.value);
	};
	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ login, pass });
	};

	return (
		<form className={styles.regForm} onSubmit={onSubmit}>
			<h1>Регистрационная форма</h1>
			{error && <div className={styles.error}>{error}</div>}
			<input
				className={styles.regInput}
				name="login"
				type="text"
				value={login}
				onChange={onLoginChange}
				onBlur={onLoginBlur}
				placeholder="Имя пользователя"
			/>
			<br />
			<input
				className={styles.regInput}
				name="pass"
				type="password"
				value={pass}
				onChange={onPassChange}
				placeholder="Пароль"
			/>
			<br />
			<input
				className={styles.regInput}
				name="rePass"
				type="password"
				value={rePass}
				onChange={onRePassChange}
				placeholder="Повторите пароль"
			/>
			<button className={styles.regButton} type="submit">
				Зарегистрировать
			</button>
		</form>
	);
}

export default App;
