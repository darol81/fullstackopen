const SearchBar = (props) =>
{
    return  (
                <>
                    <label htmlFor="country">Find countries: </label>
                    <input id="country" type="text" onChange={props.changer}/>
                </>
            )
}

export default SearchBar;

