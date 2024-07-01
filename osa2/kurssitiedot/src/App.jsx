
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

const Courses = ({courses}) => 
{
    return  (
                <>
                    {courses.map(course => <Course key={course.id} course={course}/>)}
                </>
            )
}

const App = () => 
{
    const courses = 
    [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: 
            [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        }, 
        {
            name: 'Node.js',
            id: 2,
            parts: [
            {
                name: 'Routing',
                exercises: 3,
                id: 1
            },
            {
                name: 'Middlewares',
                exercises: 7,
                id: 2
            }
            ]
        }
    ]
    return (
      <div>
        <Courses courses={courses} />
      </div>
    )
}

export default App