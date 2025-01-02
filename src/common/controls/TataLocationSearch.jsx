import React, { useState } from "react";
import { AutoComplete } from "antd";
import flightIcon from "./assets/flight-icon.png";
import "./style.css";

const TataLocationSearch = ({ title, heading, locations = [], value, onChange }) => {
    const [inputValue, setInputValue] = useState(value || ""); // Manages input value
    const [isFocused, setIsFocused] = useState(false); // Tracks if input is focused

    const handleSearch = (searchValue) => {
        setInputValue(searchValue); // Update internal state
        if (onChange) {
            onChange(searchValue); // Pass value to Ant Design Form context
        }
    };

    const handleSelect = (selectedValue) => {
        setInputValue(selectedValue); // Update internal state
        if (onChange) {
            onChange(selectedValue); // Pass value to Ant Design Form context
        }
        setIsFocused(false); // Hide label and SVG when a value is selected
    };

    return (
        <div className="tata-location-search">
            <AutoComplete
                style={{
                    // width: "300px",
                    position: 'relative',
                    // zIndex: 99,
                }}
                onSearch={handleSearch}
                onSelect={handleSelect}
                value={inputValue} // Controlled value for the input
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().includes(inputValue.toUpperCase())
                }
                options={locations.map((location) => ({
                    value: location.title,
                    label: (
                        <div className="location-item">
                            {/*<img*/}
                            {/*    src={location.image}*/}
                            {/*    alt={location.title}*/}
                            {/*    className="location-image"*/}
                            {/*/>*/}
                            <div className="location-code">
                                {location.airportCode}
                            </div>
                            <div className="location-details">
                                <h5 className="location-title">
                                    {location.title}
                                </h5>
                                <p className="location-description">
                                    {location.description}
                                </p>
                            </div>
                        </div>
                    ),
                }))}
            >
                {/* Custom HTML Input */}
                <div className="custom-input-wrapper">
                    {/* Label and Placeholder s*/}
                    {!inputValue && !isFocused && (
                        <label
                            htmlFor="autocomplete-input"
                            className="floating-label"
                        >
                            <div className="flex flex-col">
                                <div>Enter Origin</div>
                                <div>
                                    <span className="font-bold text-xl">{heading}</span>
                                    <img className="ml-2 -mt-2" src={flightIcon}/>
                                </div>
                            </div>
                        </label>
                    )}
                    <input
                        type="text"
                        className="autocomplete-input"
                        value={inputValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)} // Handle focus
                        onBlur={() => setIsFocused(false)} // Handle blur
                        style={{
                            backgroundColor: "#F8FAFC",
                            width: "220px",
                            height: "auto",
                            border: "1px solid #E2E8F0",
                            borderRadius: "8px",
                            fontSize: "16px",
                            padding: "1.6rem",
                            fontWeight: "800"
                        }}
                    />
                </div>
            </AutoComplete>
        </div>
    );
};

export default TataLocationSearch;
