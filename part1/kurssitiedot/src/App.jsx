
const Header = (props) => 
{
    return (
            <>
                <h1>{props.course}</h1> 
            </>
            );
}


const Content = (props) =>
{
    return  (    
            <>
                <p>
                {props.name} {props.exercises}
                </p>
            </>
            )
}

const Total = (props) => 
{
    return  (    
            <>
                <p>
                Number of exercises {props.exercises}
                </p>
            </>
            )
}

const App = () => 
{
    // const-määrittelyt
    const part_names = ["Fundamentals of React", "Using props to pass data", "State of a component"];
    const exercises = [10, 7, 14];

    return (
      <div>
        <Header course="Half Stack application development"/>
        <Content name={part_names[0]} exercises={exercises[0]}/>
        <Content name={part_names[1]} exercises={exercises[1]}/>
        <Content name={part_names[2]} exercises={exercises[2]}/>
        <Total exercises={exercises[0]+exercises[1]+exercises[2]}/>
      </div>
    )
}

export default App