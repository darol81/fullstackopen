import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"
import SearchBar from "./components/SearchBar";
import Legend from "./components/Legend";

async function restCountryData()
{
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
    try
    {
        const response = await axios.get(baseUrl);
        return response;
    }
    catch(error)
    {
        console.log(error);
    }
    return null;
}

function App() 
{
    const [countryName, setCountryName] = useState("");
    const [allCountries, setAllCountries] = useState(null);

    const changer = (event) =>
    {
        setCountryName(event.target.value);
    }
    useEffect( () => 
    {
        const getCountriesData = async() =>
        {
            const data = await restCountryData();
            setAllCountries(data);
        }
        getCountriesData();
    }, []);

    return  (
                <div>
                    <form>
                        <SearchBar changer={changer} />
                        <Legend countries={allCountries} countryName={countryName} />
                    </form>
                </div>
            );
}

export default App
