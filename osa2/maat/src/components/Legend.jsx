import { useState, useEffect } from "react";
import axios from "axios";

async function getRESTData(url)
{
    try 
    {
        const response = await axios.get(url);
        return response.data;
    } 
    catch(error) 
    {
        console.log(error);
    }
    return null;
}

const Legend = ({ countries, countryName, setCountry }) => 
{
    const [countryDetails, setCountryDetails] = useState(null);
    const [cityCoordinates, setCityCoordinates] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => 
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
                    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${list[0]}`;
                    const data = await getRESTData(url);
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

    useEffect(() => 
    {
        if (countryDetails && countryDetails.capital) 
        {
            const getCityCoords = async () => 
            {
                const url = `https://nominatim.openstreetmap.org/search?city=${countryDetails.capital[0]}&format=json`;
                const data = await getRESTData(url);
                if (data && data.length > 0) 
                {
                    setCityCoordinates([data[0].lat, data[0].lon]); 
                }
            };
            getCityCoords();
        }
    }, [countryDetails]);

    useEffect(() => 
    {
        if (cityCoordinates) 
        {
            const getWeatherData = async () => 
            {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityCoordinates[0]}&longitude=${cityCoordinates[1]}&current_weather=true`;
                const data = await getRESTData(url);
                setWeatherData(data);
            };
            getWeatherData();
        }
    }, [cityCoordinates]);

    if (!countries || !countries.data) return <p>Loading...</p>;

    let list = countries.data.map(country => country.name.common);
    list = list.filter(name => name.toLowerCase().includes(countryName.toLowerCase()));
    let found = list.filter(name => name.toLowerCase() === countryName.toLowerCase());
    if(found && found.length === 1)
    {
        list = found;
    }
    if(countryName.length < 1) return null;
    if(list.length > 10) 
    {
        return <p>Too many matches, specify another filter.</p>;
    }
    if(list.length === 1 && countryDetails && weatherData) 
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
                        <img src={countryDetails.flags.png} alt={`Flag of ${countryDetails.name.common}`}/>
                        <h2>Weather in {countryDetails.capital[0]}</h2>
                        <p>Temperature: {weatherData.current_weather.temperature} {weatherData.current_weather_units.temperature}</p>
                        <p>Wind speed: {weatherData.current_weather.windspeed} {weatherData.current_weather_units.windspeed}</p>
                    </>
                );
    }
    return  (
                <ul className="no_pad">
                    {list.map((country, index) => 
                    (
                        <li key={index}>{country} <button type="button" onClick={() => setCountry(country)}>Show</button></li>
                    ))}
                </ul>
            );
}

export default Legend;
