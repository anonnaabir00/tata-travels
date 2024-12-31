import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd';
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
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ED7232',
                },
                components: {
                    Slider: {
                        "colorText": "rgb(22,119,255)",
                        "fontSize": 50,
                        "trackBg": "rgb(237,114,50)",
                        "trackHoverBg": "rgb(237,114,50)",
                        "dotActiveBorderColor": "rgb(237,114,50)",
                        "dotBorderColor": "rgb(237,114,50)",
                        "handleActiveColor": "rgb(237,114,50)",
                        "handleColorDisabled": "rgb(237,114,50)",
                        "handleActiveOutlineColor": "rgb(237,114,50)",
                        "handleColor": "rgb(237,114,50)",
                        "controlSize": 10,
                        "handleLineWidth": 2,
                        "handleLineWidthHover": 1
                    },
                }
            }}
        >
        <StrictMode>
            <SearchResult dataKey={key} />
        </StrictMode>
        </ConfigProvider>
    );
});