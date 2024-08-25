import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './app.module.css';
const App = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is required')
			.email('Email is invalid'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('password')], 'Passwords do not match'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const submitButtonRef = useRef(null);

	const onSubmit = (data) => {
		console.log(data);
		if (submitButtonRef.current) {
			submitButtonRef.current.focus();
		}
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>Регистрация</h2>
				<div className={styles.inputGroup}>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" {...register('email')} />
					{errors.email && <p className={styles.error}>{errors.email.message}</p>}
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" {...register('password')} />
					{errors.password && <p className={styles.error}>{errors.password.message}</p>}
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="confirm-password">Confirm Password</label>
					<input type="password" id="confirm-password" {...register('confirmPassword')} />
					{errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
				</div>
				<button
					type="submit"
					disabled={!isValid}
					ref={submitButtonRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;

