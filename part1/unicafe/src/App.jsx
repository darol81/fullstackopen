import './App.css';
import { useState } from 'react'

const Button = (props) =>
{
    return  (
                <button onClick={props.handleClick}>{props.text}</button>
            )
}

const StatisticLine = (props) =>
{
    return  (
                <>
                    <li>{props.text} {props.value}</li>
                </>
            )
}

const Statistics = (props) =>
{
    let all = props.data.reduce((sum, i) => sum + i, 0);
    let average = (props.data[0] * 1 + props.data[2] * -1) / all;
    let positive = (props.data[0] / all) * 100;
    if(!all)
    {
        return  (
                    <>
                        <h1>statistics</h1>
                        <p>No feedback given</p>
                    </>
                )
    }
    return  (
                <>
                    <h1>statistics</h1>
                    <ul>
                        <StatisticLine text="good" value ={props.data[0]} />
                        <StatisticLine text="neutral" value ={props.data[1]} />
                        <StatisticLine text="bad" value ={props.data[2]} />
                        <StatisticLine text="all" value ={all} />
                        <StatisticLine text="average" value ={average} />
                        <StatisticLine text="positive" value ={positive +" %"} />
                    </ul>
                </>
            )
}

const App = () => 
{
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick = (args) => 
    {
        const handler = () => 
        {      
            switch(args)
            {
                case "good": setGood(good + 1); break;
                case "neutral": setNeutral(neutral + 1); break;
                case "bad": setBad(bad + 1); break;
            }
        }
        return handler
    }

    return  (
                <div>
                    <h1>give feedback</h1>
                    <Button handleClick={handleClick("good")} text='good'/>
                    <Button handleClick={handleClick("neutral")} text='neutral'/>
                    <Button handleClick={handleClick("bad")} text='bad'/>
                    <Statistics data={[good, neutral, bad]}/>
                </div>
            )
}

export default App