import styles from './Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fieldsSchema } from '../data/validationConfig';

const sendFormData = (formData) => {
	console.log(formData);
};

export const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			login: '',
			pass: '',
			rePass: '',
		},
		resolver: yupResolver(fieldsSchema),
		mode: 'onChange',
	});

	const loginError = errors.login?.message;
	const passError = errors.pass?.message;
	const rePassError = errors.rePass?.message;

	return (
		<form className={styles.regForm} onSubmit={handleSubmit(sendFormData)}>
			<h1>Регистрационная форма</h1>
			<input
				className={
					loginError
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="login"
				type="text"
				placeholder="Имя пользователя"
				autoComplete="off"
				{...register('login')}
			/>
			{loginError && <div className={styles.error}>{loginError}</div>}
			<input
				className={
					passError
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="pass"
				type="password"
				placeholder="Пароль"
				{...register('pass')}
			/>
			{passError && <div className={styles.error}>{passError}</div>}
			<input
				className={
					rePassError
						? styles.regInput + ' ' + styles.errorInput
						: styles.regInput
				}
				name="rePass"
				type="password"
				placeholder="Повторите пароль"
				{...register('rePass')}
			/>
			{rePassError && <div className={styles.error}>{rePassError}</div>}
			<button className={styles.regButton} type="submit" disabled={!isValid}>
				Зарегистрировать
			</button>
		</form>
	);
};
