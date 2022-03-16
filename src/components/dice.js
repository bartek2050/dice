import React, {useEffect, useState} from 'react';

const Dice = () => {
    const [result, setResult] = useState(0);
    const [number, setNumber] = useState(0);
    const [history, setHistory] = useState([{}])


    const min = Math.ceil(1)
    const max = Math.floor(6)

    const diceHandler = () => {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        const now = new Date()
        setResult(random);
        setNumber(number + 1)
        setHistory(prevState => [...prevState, {number: number + 1, result: random, date: now}])
    }

    useEffect(() => {
        localStorage.setItem(`history`, JSON.stringify(history));
    }, [history])

    const throwsStorage = JSON.parse(localStorage.getItem("history"))
    const throwsHistory = throwsStorage?.map((e) => e.number ? (<section key={e.number}>
        <div>Throw: {e.number}</div>
        <div>Result: {e.result}</div>
        <div>Date: {e.date}</div>
    </section>) : null)

    return (
        <>
            Lp. {number}
            <button onClick={diceHandler}>DICE</button>
            Wynik {result}
            {throwsHistory}
        </>
    )
};

export default Dice;