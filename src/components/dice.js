    import React, {useEffect, useState} from 'react';
import "./dice.css"

const Dice = () => {
    const [result, setResult] = useState(0);
    const [number, setNumber] = useState(0);
    const [history, setHistory] = useState([{}])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("history")).length > 1) {
            setHistory(JSON.parse(localStorage.getItem("history")))
        }
    }, [])

    const min = Math.ceil(1)
    const max = Math.floor(6)

    const diceHandler = () => {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        const now = new Date()
        setResult(random);
        setNumber(number + 1)
        setHistory(prevState => [...prevState, {number: number + 1, result: random, date: now}])
    }

    const clearHandler = () => {
        setResult(0)
        setNumber(0)
        setHistory([{}])
        localStorage.clear()
    }

    useEffect(() => {
        localStorage.setItem(`history`, JSON.stringify(history))
    }, [history])

    const throwsStorage = JSON.parse(localStorage.getItem("history"))
    const throwsHistory = throwsStorage?.map((e) => e.number ? (<div className="list" key={e.number}>
        <div>Throw: {e.number}</div>
        <div>Result: {e.result}</div>
        <div>Date: {e.date}</div>
    </div>) : null)

    return (
        <>
            <section className="diceWrapper">
                <div className="diceWrapper--dice">
                    <button className="button button--dice" onClick={diceHandler}>THROW DICE</button>
                    <div>Throw: {number}</div>
                    <div>Result: {result}</div>
                </div>
                <button className="button button--clear" onClick={clearHandler}>Clear history</button>
                <div className="diceWrapper--list">{throwsHistory}</div>
            </section>

        </>
    )
};

export default Dice;