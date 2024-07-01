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

export default Courses