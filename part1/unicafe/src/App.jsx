import { useEffect, useState } from 'react'
import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    useEffect(() => {
        console.log("Good: ", good)
        console.log("Neutral: ", neutral)
        console.log("Bad: ", bad)
    }, [good, neutral, bad])

    return (
        <div>
            <h1>give feedback</h1>
            <Button text="good" onClick={() => setGood(good + 1)}></Button>
            <Button text="neutral" onClick={() => setNeutral(neutral + 1)}></Button>
            <Button text="bad" onClick={() => setBad(bad + 1)}></Button>
            
            <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </div>
    )
}

export default App