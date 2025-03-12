import styles from './App.module.css';
import { useState } from 'react';

function App() {
	const [login, setLogin] = useState('');
	const [pass, setPass] = useState('');
	const onChangeLogin = ({ target }) => {
		setLogin(target.value);
	};
	const onChangePass = ({ target }) => {
		setPass(target.value);
	};
	return (
		<div className={styles.regForm}>
			<h1>Регистрационная форма</h1>
			<input
				className={styles.regInput}
				name="login"
				type="text"
				value={login}
				onChange={onChangeLogin}
				placeholder="Имя пользователя"
			/>
			<br />
			<input
				className={styles.regInput}
				name="pass"
				type="password"
				value={pass}
				onChange={onChangePass}
				placeholder="Пароль"
			/>
		</div>
	);
}

export default App;
