import React, { useState, useEffect } from 'react';
import Select from 'react-select';


export default function Form() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');



    useEffect(() => {
        getCountries()
    }, [])


    const getCountries = async () => {
        setLoading(true);
        const response = await fetch(`https://business.tailorgang.io/clothier_apis/countries`);
        const data = await response.json();
        setCountries(data.map(({ name, code }) => {
            return { value: code, label: name }
        }));
        setLoading(false);
    };


    const getStates = async (country) => {
        setLoading(true);
        const response = await fetch('https://business.tailorgang.io/clothier_apis/statesByName/' + country);
        const data = await response.json();
        setStates(data.map(({ name }) => {
            return { value: name, label: name }
        }));
        setLoading(false);
    };

    const getCities = async (state) => {
        setLoading(true);
        const response = await fetch('https://business.tailorgang.io/clothier_apis/state_cities/' + state);
        const data = await response.json();
        setCities(data.map(({ name }) => {
            return { value: name, label: name }
        }));
        setLoading(false);
    };

    const handleSelection = ({ value }) => {
        setSelectedCity('')
        setSelectedState('')
        getStates(value);
    }


    const handleStateSelection = ({ value, label }) => {
        setSelectedState({ value, label });
        setSelectedCity('')
        getCities(value);
    }

    return (
        <div>

            <Select placeholder="Country" options={countries} onChange={handleSelection} />
            <Select placeholder="States" value={selectedState} options={states} onChange={handleStateSelection} />
            <Select placeholder="Cities" value={selectedCity} options={cities} onChange={city => setSelectedCity(city)} />

            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) : null
            }
        </div>
    )
}
