
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
    const part1 = 
    {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = 
    {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = 
    {
        name: 'State of a component',
        exercises: 14
    }

    return (
      <div>
        <Header course="Half Stack application development"/>
        <Part data={part1}/>
        <Part data={part2}/>
        <Part data={part3}/>
        <Total exercises={part1.exercises+part2.exercises+part3.exercises}/>
      </div>
    )
}

export default App