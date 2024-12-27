import React from 'react';
import { Collapse } from 'antd';


const { Panel } = Collapse;

const FlightFilters = () => {
    const timeSlots = [
        { id: 'early', label: 'Early Morning', subLabel: 'Before 6 AM' },
        { id: 'morning', label: 'Morning', subLabel: '6 AM - 12 PM' },
        { id: 'midday', label: 'Mid Day', subLabel: '12 PM - 6 PM' },
        { id: 'night', label: 'Night', subLabel: 'After 6 PM' }
    ];

    const cabinClasses = ['Economy', 'Prem Econ', 'Business', 'Mixed'];

    return (
        <div className="filters-container">
            <div className="filters-header">
                <span>Recommended</span>
                <span>2995 - TOTAL FLIGHTS</span>
            </div>

            <Collapse defaultActiveKey={['stops', 'price', 'time', 'fareAssistant', 'cabin']} ghost>
                {/* Stops Section */}
                <Panel header="Stops" key="stops" className="custom-panel">
                    <div className="space-y-2">
                        {['Direct', '1 Stop', '2+ Stop'].map((stop) => (
                            <label key={stop} className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded border-gray-300" />
                                <span>{stop}</span>
                            </label>
                        ))}
                    </div>
                </Panel>

                {/* Price Range Section */}
                <Panel header="Flight Price" key="price" className="custom-panel">
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
                </Panel>

                {/* Time Section */}
                <Panel header="Time" key="time" className="custom-panel">
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
                </Panel>

                {/* Fare Assistant Section */}
                <Panel header="Fare assistant" key="fareAssistant" className="custom-panel">
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
                </Panel>

                {/* Cabin Section */}
                <Panel header="Cabin" key="cabin" className="custom-panel">
                    <div className="space-y-2">
                        {cabinClasses.map((cabin) => (
                            <label key={cabin} className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded border-gray-300" />
                                <span>{cabin}</span>
                            </label>
                        ))}
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};

export default FlightFilters;
