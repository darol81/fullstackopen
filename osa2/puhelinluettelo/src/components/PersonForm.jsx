
const InputElement = (props) => 
{
    return  (
                <div>
                    {props.label}: <input value={props.value} onChange={props.changer}/>
                </div>
            )
}

const PersonForm = (props) =>
{
    return  (
                <form onSubmit={props.submit}>
                    <h2>Add a new</h2>
                    {props.children}
                    <div>
                        <button type="submit">add</button>
                    </div>
                </form>
            )
}

export { PersonForm, InputElement }

   