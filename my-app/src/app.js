import React, { useState } from 'react';
import styles from './app.module.css';

const App = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({});

	const validate = () => {
		const newErrors = {};

		if (!form.email) {
			newErrors.email = 'Требуется электронная почта';
		} else if (!/\S+@\S+\.\S+/.test(form.email)) {
			newErrors.email = 'Адрес электронной почты недействителен';
		}

		if (!form.password) {
			newErrors.password = 'Требуется ввести пароль';
		} else if (form.password.length < 6) {
			newErrors.password = 'Пароль должен содержать не менее 6 символов';
		}

		if (form.confirmPassword !== form.password) {
			newErrors.confirmPassword = 'Пароли не совпадают';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			console.log(form);
		}
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={handleSubmit}>
				<h2>Регистрация</h2>
				<div className={styles.inputGroup}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
					{errors.email && <p className={styles.error}>{errors.email}</p>}
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						required
					/>
					{errors.password && <p className={styles.error}>{errors.password}</p>}
				</div>
				<div className={styles.inputGroup}>
					<label htmlFor="confirm-password">Confirm Password</label>
					<input
						type="password"
						id="confirm-password"
						name="confirmPassword"
						value={form.confirmPassword}
						onChange={handleChange}
						required
					/>
					{errors.confirmPassword && (
						<p className={styles.error}>{errors.confirmPassword}</p>
					)}
				</div>
				<button
					type="submit"
					disabled={Object.keys(errors).length > 0 || !form.email || !form.password || !form.confirmPassword}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;
