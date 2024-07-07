import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Legend from "./components/Legend";
import "./App.css"
import axios from "axios";


async function get_countries()
{
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

    try
    {
        const response = await axios.get(baseUrl);
        const list = response.data.map(country => country.name.common);
        console.log(list);
    }
    catch(error)
    {
        console.log(error);
    }
}

function App() 
{
    const [countryName, setCountryName] = useState("");

    const changer = (event) =>
    {
        setCountryName(event.target.value);
    }

    const countries = get_countries();

    return (
            <div>
                <form>
                    <SearchBar changer={changer} />
                    <Legend country={countryName} />
                </form>
            </div>
    )
}

export default App
