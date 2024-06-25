
const Header = (props) => 
{
    return (
            <>
                <h1>{props.course}</h1> 
            </>
            );
}


const Part = (props) =>
{
    return  (    
            <>
                <p>{props.data.name} {props.data.exercises}</p>
            </>
            )
}

const Total = (props) => 
{
    return  (    
            <>
                <p>Number of exercises {props.exercises}</p>
            </>
            )
}

const App = () => 
{
    const parts = 
    [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
      <div>
        <Header course="Half Stack application development"/>
        <Part data={parts[0]}/>
        <Part data={parts[1]}/>
        <Part data={parts[2]}/>
        <Total exercises={parts[0].exercises+parts[1].exercises+parts[2].exercises}/>
      </div>
    )
}

export default App