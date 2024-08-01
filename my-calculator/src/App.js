// App.js
import React, { useState } from 'react';
import styles from './App.module.css';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '=', 'C'];

const App = () => {
    const [displayValue, setDisplayValue] = useState('');
    const [displayColor, setDisplayColor] = useState('#222'); // начальный цвет дисплея

    const handleButtonClick = (value) => {
        switch (value) {
            case 'C':
                setDisplayValue('');
                setDisplayColor('#222'); // сброс цвета при очистке
                break;
            case '=':
                try {
                    setDisplayValue(eval(displayValue).toString());
                    setDisplayColor('#28a745'); // цвет дисплея при успешном вычислении
                } catch {
                    setDisplayValue('Ошибка');
                    setDisplayColor('#dc3545'); // цвет дисплея при ошибке
                }
                break;
            default:
                setDisplayValue(displayValue + value);
                setDisplayColor('#222'); // возврат цвета при вводе новых данных
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.calculator}>
                <div
                    className={styles.display}
                    style={{ backgroundColor: displayColor }}
                >
                    {displayValue}
                </div>
                <div className={styles.buttons}>
                    {numbers.map((number) => (
                        <button
                            key={number}
                            className={styles.button}
                            onClick={() => handleButtonClick(number.toString())}
                        >
                            {number}
                        </button>
                    ))}

                    {operators.map((operator) => (
                        <button
                            key={operator}
                            className={styles.button}
                            onClick={() => handleButtonClick(operator)}
                        >
                            {operator}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
