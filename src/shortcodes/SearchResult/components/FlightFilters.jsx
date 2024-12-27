import React, { useState } from 'react';

const FlightFilters = () => {
    const [expandedSections, setExpandedSections] = useState({
        stops: true,
        price: true,
        time: true,
        fareAssistant: true,
        cabin: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const timeSlots = [
        { id: 'early', label: 'Early Morning', subLabel: 'Before 6 AM' },
        { id: 'morning', label: 'Morning', subLabel: '6 AM - 12 PM' },
        { id: 'midday', label: 'Mid Day', subLabel: '12 PM - 6 PM' },
        { id: 'night', label: 'Night', subLabel: 'After 6 PM' }
    ];

    const cabinClasses = ['Economy', 'Prem Econ', 'Business', 'Mixed'];

    return (
        <div className="w-2/6 bg-white p-4 space-y-4">
            <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                <span>Recommended</span>
                <span>2995 - TOTAL FLIGHTS</span>
            </div>

            {/* Stops Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('stops')}
                    className="flex items-center justify-between w-full font-medium"
                >
                    Stops
                    <img
                        src="/api/placeholder/20/20"
                        alt={expandedSections.stops ? "Collapse" : "Expand"}
                        className="w-5 h-5"
                    />
                </button>
                {expandedSections.stops && (
                    <div className="space-y-2">
                        {['Direct', '1 Stop', '2+ Stop'].map((stop) => (
                            <label key={stop} className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded border-gray-300" />
                                <span>{stop}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full font-medium"
                >
                    Flight Price
                    <img
                        src="/api/placeholder/20/20"
                        alt={expandedSections.price ? "Collapse" : "Expand"}
                        className="w-5 h-5"
                    />
                </button>
                {expandedSections.price && (
                    <div className="space-y-2">
                        <input
                            type="range"
                            min="1230"
                            max="5623"
                            className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>$1230</span>
                            <span>$5623</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Time Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('time')}
                    className="flex items-center justify-between w-full font-medium"
                >
                    Time
                    <img
                        src="/api/placeholder/20/20"
                        alt={expandedSections.time ? "Collapse" : "Expand"}
                        className="w-5 h-5"
                    />
                </button>
                {expandedSections.time && (
                    <div className="space-y-2">
                        {timeSlots.map((slot) => (
                            <label key={slot.id} className="flex items-center space-x-3">
                                <input type="checkbox" className="rounded border-gray-300" />
                                <img
                                    src="/api/placeholder/16/16"
                                    alt="Sun icon"
                                    className="w-4 h-4"
                                />
                                <div>
                                    <div>{slot.label}</div>
                                    <div className="text-xs text-gray-500">{slot.subLabel}</div>
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Fare Assistant Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('fareAssistant')}
                    className="flex items-center justify-between w-full font-medium"
                >
                    Fare assistant
                    <img
                        src="/api/placeholder/20/20"
                        alt={expandedSections.fareAssistant ? "Collapse" : "Expand"}
                        className="w-5 h-5"
                    />
                </button>
                {expandedSections.fareAssistant && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/api/placeholder/20/20"
                                    alt="Cabin bag"
                                    className="w-5 h-5"
                                />
                                <span>Cabin bag</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="number" defaultValue="2" className="w-12 p-1 border rounded" />
                                <span className="text-red-500 text-lg">+</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/api/placeholder/20/20"
                                    alt="Checked bag"
                                    className="w-5 h-5"
                                />
                                <span>Checked bag</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="number" defaultValue="1" className="w-12 p-1 border rounded" />
                                <span className="text-red-500 text-lg">+</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Cabin Section */}
            <div className="space-y-2">
                <button
                    onClick={() => toggleSection('cabin')}
                    className="flex items-center justify-between w-full font-medium"
                >
                    Cabin
                    <img
                        src="/api/placeholder/20/20"
                        alt={expandedSections.cabin ? "Collapse" : "Expand"}
                        className="w-5 h-5"
                    />
                </button>
                {expandedSections.cabin && (
                    <div className="space-y-2">
                        {cabinClasses.map((cabin) => (
                            <label key={cabin} className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded border-gray-300" />
                                <span>{cabin}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlightFilters;