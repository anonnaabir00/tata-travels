import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import FlightSearch from "./shortcodes/FlightSearch/FlightSearch.jsx";
import SearchResult from "./shortcodes/SearchResult/SearchResult.jsx";

const flightSearch = document.querySelectorAll('.tt-flight-search');
flightSearch.forEach(element => {
    const key = element.getAttribute('data-key');
    createRoot(element).render(
        <StrictMode>
            <FlightSearch dataKey={key} />
        </StrictMode>,
    );
});

const searchResult = document.querySelectorAll('.tt-search-result');
searchResult.forEach(element => {
    const key = element.getAttribute('data-key');
    createRoot(element).render(
        <StrictMode>
            <SearchResult dataKey={key} />
        </StrictMode>,
    );
});