import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Initialize state for steps and active index
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// Handlers for navigation
	const backStep = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const nextStep = () => {
		if (activeIndex < steps.length - 1) {
			setActiveIndex(activeIndex + 1);
		} else {
			setActiveIndex(0);
		}
	};

	const resetSteps = () => {
		setActiveIndex(0);
	};

	// Flags for first and last step
	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Display the content of the active step */}
						<h2>{steps[activeIndex].title}</h2>
						<p>{steps[activeIndex].content}</p>
					</div>
					<ul className={styles['steps-list']}>
						{/* Render the steps */}
						{steps.map((step, index) => (
							<li
								key={step.id}
								className={`${styles['steps-item']} ${
									index <= activeIndex ? styles.done : ''
								} ${index === activeIndex ? styles.active : ''}`}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => setActiveIndex(index)}
								>
									{index + 1}
								</button>
								Шаг {index + 1}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={backStep}
							disabled={isFirstStep}
						>
							Назад
						</button>
						{isLastStep ? (
							<button className={styles.button} onClick={resetSteps}>
								Сначала
							</button>
						) : (
							<button className={styles.button} onClick={nextStep}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
