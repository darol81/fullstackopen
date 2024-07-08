import axios from "axios";
import { useState, useEffect } from "react";

async function restCountryData(name) 
{
    const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;
    try 
    {
        const response = await axios.get(baseUrl);
        return response.data;
    } 
    catch(error) 
    {
        console.log(error);
    }
    return null;
}


const Legend = ({ countries, countryName }) => 
{
    const [countryDetails, setCountryDetails] = useState(null);

    useEffect( () => 
    {
        if(countryName.length > 0) 
        {
            let list = countries.data.map(country => country.name.common);
            list = list.filter(name => name.toLowerCase().includes(countryName.toLowerCase()));
            let found = list.filter(name => name.toLowerCase() === countryName.toLowerCase());
            if(found && found.length == 1)
            {
                list = found;
            }
            if(list && list.length === 1) 
            {
                const getCountryData = async() => 
                {
                    const data = await restCountryData(list[0]);
                    setCountryDetails(data);
                };
                getCountryData();
            } 
            else 
            {
                setCountryDetails(null);
            }
        }
    }, [countryName, countries]);

    if (!countries || !countries.data) return <p>Loading...</p>;

    let list = countries.data.map(country => country.name.common);
    list = list.filter(name => name.toLowerCase().includes(countryName.toLowerCase()));
    let found = list.filter(name => name.toLowerCase() === countryName.toLowerCase());
    if(found && found.length == 1)
    {
        list = found;
    }

    if(countryName.length < 1) return null;
    if(list.length > 10) 
    {
        return <p>Too many matches, specify another filter.</p>;
    }
    if(list.length === 1 && countryDetails) 
    {
        return  (
                    <>
                        <h1>{countryDetails.name.common}</h1>
                        <p>Capital: {countryDetails.capital[0]}</p>
                        <p>Area: {countryDetails.area}</p>
                        <h2>Languages:</h2>
                        <ul>
                            {Object.entries(countryDetails.languages).map(([key, lang]) => (<li key={key}>{lang}</li>))}
                        </ul>
                        <img src={countryDetails.flags.png}/>
                    </>
                );
    }
      
    return  (
                <ul className="no_pad">
                    {list.map((country, index) => 
                    (
                        <li key={index}>{country}</li>
                    ))}
                </ul>
            );
}

export default Legend;
