
const Header = (props) => 
{
    return (
            <>
                <h1>{props.course.name}</h1> 
            </>
            );
}


const Content = (props) => 
{
    return  (
                <>
                    {props.course.parts.map( (part, index) => 
                        (
                            <p key={index}>{part.name} {part.exercises}</p>
                        ))
                    }
                </>
            );        
}

const Total = (props) => 
{
    let sum = props.course.parts.reduce((accumulator, curValue) => accumulator + curValue.exercises, 0);
    return  (    
                <>
                    <p>total of {sum} exercises</p>
                </>
            )
}

const Course = ({ course }) =>
{
    return  (
                <>
                    <Header course={course}/>
                    <Content course={course}/>
                    <Total course={course}/>
                </>
            )
}   

const App = () => 
{
    const course = 
    {
        name: 'Half Stack application development',
        parts: 
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
    }
    return (
      <div>
        <Course course={course} />
      </div>
    )
}

export default App