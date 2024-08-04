import React, { useState } from 'react';
import styles from './App.module.css';

const App = () => {

    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    const onInputButtonClick = () => {
        const promptValue = prompt('Введите значение');
        if (promptValue.length >= 3) {
            setValue(promptValue);
            setError('');
        } else {
            setError('Значение должно содержать минимум 3 символа');
        }
    };

    const onAddButtonClick = () => {
        if (value.length >= 3) {
            const newItem = { id: Date.now(), value };
            setList(prevList => [...prevList, newItem]);
            setValue('');
            setError('');
        }
    };

    const isValueValid = value.length >= 3;

    return (
        <div className={styles.app}>
            <h1 className={styles.pageHeading}>Приложение</h1>
            <output className={styles.noMarginText}>"{value}"</output>
            <div className={styles.buttonsContainer}>
                <button onClick={onInputButtonClick} className={styles.button}>Ввести новое</button>
                <button onClick={onAddButtonClick} disabled={!isValueValid} className={styles.button}>Добавить в список</button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {list.length > 0 ? (
                <ul>
                    {list.map(item => (
                        <li key={item.id}>{item.value}</li>
                    ))}
                </ul>
            ) : (
                <p>Нет добавленных элементов</p>
            )}
        </div>
    );
}

export default App;
