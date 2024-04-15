import { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { symbolSearch } from '../services/apiRequest';

export default function Search() {
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (event.target.value.trim()) {
            setLoading(true);
            symbolSearch(event.target.value.trim())
                .then(data => {
                    // console.log(data);
                    setSearchResults(data.bestMatches || []);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to fetch data');
                    setLoading(false);
                });
        } else {
            setSearchResults([]);
        }
    };



    return (

        <form className="relative flex flex-1" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <MagnifyingGlassIcon
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          id="search-field"
          className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          type="search"
          name="search"
          value={inputValue}
           onChange={handleInputChange}
        />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
         <ul>
                {searchResults.map((item, index) => (
                    <li key={index}>{item['1. symbol']} - {item['2. name']}</li>
                ))}
            </ul>
      </form>   
    );

}