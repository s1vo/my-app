import React, { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['+', '-', '=', 'C'];

const App = () => {
    const [operand1, setOperand1] = useState('');
    const [operator, setOperator] = useState('');
    const [operand2, setOperand2] = useState('');
    const [isResult, setIsResult] = useState(false);

    const handleNumberClick = (num) => {
        if (operator) {
            setOperand2((prev) => prev + num);
        } else {
            setOperand1((prev) => prev + num);
        }
        setIsResult(false);
    };

    const clearAll = () => {
        setOperand1('');
        setOperator('');
        setOperand2('');
        setIsResult(false);
    };

    const calculateResult = () => {
        if (operand1 && operator && operand2) {
            const result = operator === '+'
                ? parseInt(operand1) + parseInt(operand2)
                : parseInt(operand1) - parseInt(operand2);
            setOperand1(result.toString());
            setOperator('');
            setOperand2('');
            setIsResult(true);
        }
    };

    const handleOperatorClick = (op) => {
        if (op === 'C') {
            clearAll();
        } else if (op === '=') {
            calculateResult();
        } else {
            setOperator(op);
            setIsResult(false);
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.calculator}>
                <div className={styles.display} style={{ backgroundColor: isResult ? '#4caf50' : '#222' }}>
                    {operand1}{operator}{operand2}
                </div>
                <div className={styles.buttons}>
                    {NUMS.map((num) => (
                        <button key={num} className={styles.button} onClick={() => handleNumberClick(num)}>
                            {num}
                        </button>
                    ))}
                    {OPERATORS.map((op) => (
                        <button key={op} className={`${styles.button} ${styles.operator}`} onClick={() => handleOperatorClick(op)}>
                            {op}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
