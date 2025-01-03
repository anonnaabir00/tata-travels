import React, { useEffect } from 'react';
import { Switch, Collapse, Slider } from 'antd';
import useFlightStore from "../../../flightStore.js";

import early from "./assets/early.png";
import morning from "./assets/morning.png";
import midday from "./assets/midday.png";
import night from "./assets/night.png";

const { Panel } = Collapse;

const FlightFilters = ({ totalFlights, maxPrice, minPrice, stops }) => {
    const {
        filters,
        updateFilters,
        initializeFlights,
        filteredFlights
    } = useFlightStore();

    const timeSlots = [
        { id: 'early', label: 'Early Morning', subLabel: 'Before 6 AM', image: early },
        { id: 'morning', label: 'Morning', subLabel: '6 AM - 12 PM', image: morning },
        { id: 'midday', label: 'Mid Day', subLabel: '12 PM - 6 PM', image: midday },
        { id: 'night', label: 'Night', subLabel: 'After 6 PM', image: night }
    ];

    const cabinClass = [
        { id: 'economy', label: 'Economy' },
        { id: 'premium', label: 'Prem Economy' },
        { id: 'business', label: 'Business' },
        { id: 'mixed', label: 'Mixed' },
    ];

    // Initialize store with props data
    useEffect(() => {
        if (stops) {
            initializeFlights(stops);
        }
    }, [stops]);

    const handleStopsChange = (stop, checked) => {
        const newStops = checked
            ? [...filters.stops, stop]
            : filters.stops.filter(s => s !== stop);
        updateFilters({ stops: newStops });
    };

    const handleTimeSlotChange = (slotId, checked) => {
        const newTimeSlots = checked
            ? [...filters.timeSlots, slotId]
            : filters.timeSlots.filter(s => s !== slotId);
        updateFilters({ timeSlots: newTimeSlots });
    };

    const handleRecommendedChange = (checked) => {
        updateFilters({ recommended: checked });
    };

    return (
        <div className="filters-container">
            <Collapse
                defaultActiveKey={['stops', 'price', 'time', 'fareAssistant', 'cabin']}
                bordered={false}
                expandIconPosition='end'
                style={{
                    background: '#fff',
                }}
            >
                <div className="filters-header">
                    <div className="flex justify-between items-center p-5">
                        <div className="text-xl font-bold">Filters</div>
                        <div>
                            Recommended
                            <Switch
                                defaultChecked={filters.recommended}
                                size="small"
                                onChange={handleRecommendedChange}
                            />
                        </div>
                    </div>
                    <div className="filters-flights">{totalFlights} - TOTAL FLIGHTS</div>
                </div>

                {/* Stops Section */}
                <Panel
                    header="Stops"
                    key="stops"
                    className="custom-panel"
                >
                    <div className="space-y-2">
                        {['Direct', '1 Stop', '2+ Stop'].map((stop) => (
                            <label key={stop} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 w-4 h-4"
                                    checked={filters.stops.includes(stop)}
                                    onChange={(e) => handleStopsChange(stop, e.target.checked)}
                                />
                                <span className="slot-label">{stop}</span>
                            </label>
                        ))}
                    </div>
                </Panel>

                {/* Price Range Section */}
                <Panel header="Flight Price" key="price" className="custom-panel">
                    <div className="-mt-6">
                        <Slider
                            range
                            min={minPrice}
                            max={maxPrice}
                            defaultValue={[minPrice, maxPrice]}
                            value={filters.priceRange}
                            onChange={(range) => updateFilters({ priceRange: range })}
                            trackBg='#ED7232'
                            handleColor='#ED7232'
                        />
                        <div className="flex justify-between text-sm text-black">
                            <span>₹{filters.priceRange[0]}</span>
                            <span>₹{filters.priceRange[1]}</span>
                        </div>
                    </div>
                </Panel>

                {/* Time Section */}
                <Panel header="Time" key="time" className="custom-panel">
                    <div className="space-y-2">
                        {timeSlots.map((slot) => (
                            <label key={slot.id} className="flex justify-between items-center space-x-3">
                                <div className="flex items-start space-x-2">
                                    <div className="filter-day-image">
                                        <img
                                            src={slot.image}
                                            className="w-4 h-4"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{slot.label}</div>
                                        <div className="text-xs text-gray-500">{slot.subLabel}</div>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-600 w-4 h-4"
                                    checked={filters.timeSlots.includes(slot.id)}
                                    onChange={(e) => handleTimeSlotChange(slot.id, e.target.checked)}
                                />
                            </label>
                        ))}
                    </div>
                </Panel>

                {/* Cabin Section */}
                <Panel header="Cabin" key="cabin" className="custom-panel">
                    <div className="space-y-2">
                        {cabinClass.map((slot) => (
                            <label key={slot.id} className="flex justify-start items-center space-x-3">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-600 w-4 h-4"
                                    // checked={filters.cabinClass.includes(slot.id)}
                                    // onChange={(e) => handleTimeSlotChange(slot.id, e.target.checked)}
                                />
                                <div className="flex items-start space-x-2">
                                    <div>
                                        <div className="slot-label">{slot.label}</div>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};

export default FlightFilters;