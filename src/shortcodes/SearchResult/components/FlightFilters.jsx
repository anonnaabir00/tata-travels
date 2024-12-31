import React from 'react';
import { Switch, Collapse, Slider } from 'antd';


const { Panel } = Collapse;

const FlightFilters = ({ totalFlights, maxPrice, minPrice, stops }) => {
    const timeSlots = [
        { id: 'early', label: 'Early Morning', subLabel: 'Before 6 AM' },
        { id: 'morning', label: 'Morning', subLabel: '6 AM - 12 PM' },
        { id: 'midday', label: 'Mid Day', subLabel: '12 PM - 6 PM' },
        { id: 'night', label: 'Night', subLabel: 'After 6 PM' }
    ];

    const cabinClasses = ['Economy', 'Prem Econ', 'Business', 'Mixed'];

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
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
                        <div>Recommended <Switch defaultChecked size="small" onChange={onChange} /></div>
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
                                <input type="checkbox" className="rounded border-gray-300"/>
                                <span>{stop}</span>
                            </label>
                        ))}
                    </div>
                </Panel>

                {/* Price Range Section */}
                <Panel header="Flight Price" key="price" className="custom-panel">
                    <div className="space-y-2">
                        <Slider
                            range
                            min={minPrice}
                            max={maxPrice}
                            defaultValue={[minPrice, maxPrice]}
                            trackBg='#ED7232'
                            handleColor='#ED7232'
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>₹{minPrice}</span>
                            <span>₹{maxPrice}</span>
                        </div>
                    </div>
                </Panel>

                {/* Time Section */}
                <Panel header="Time" key="time" className="custom-panel">
                    <div className="space-y-2">
                        {timeSlots.map((slot) => (
                            <label key={slot.id} className="flex items-center space-x-3">
                                <input type="checkbox" className="rounded border-gray-300"/>
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
                {/*<Panel header="Fare assistant" key="fareAssistant" className="custom-panel">*/}
                {/*    <div className="space-y-2">*/}
                {/*        <div className="flex items-center justify-between">*/}
                {/*            <div className="flex items-center space-x-2">*/}
                {/*                <img*/}
                {/*                    src="/api/placeholder/20/20"*/}
                {/*                    alt="Cabin bag"*/}
                {/*                    className="w-5 h-5"*/}
                {/*                />*/}
                {/*                <span>Cabin bag</span>*/}
                {/*            </div>*/}
                {/*            <div className="flex items-center space-x-2">*/}
                {/*                <input type="number" defaultValue="2" className="w-12 p-1 border rounded"/>*/}
                {/*                <span className="text-red-500 text-lg">+</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="flex items-center justify-between">*/}
                {/*            <div className="flex items-center space-x-2">*/}
                {/*                <img*/}
                {/*                    src="/api/placeholder/20/20"*/}
                {/*                    alt="Checked bag"*/}
                {/*                    className="w-5 h-5"*/}
                {/*                />*/}
                {/*                <span>Checked bag</span>*/}
                {/*            </div>*/}
                {/*            <div className="flex items-center space-x-2">*/}
                {/*                <input type="number" defaultValue="1" className="w-12 p-1 border rounded"/>*/}
                {/*                <span className="text-red-500 text-lg">+</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</Panel>*/}

                {/*/!* Cabin Section *!/*/}
                {/*<Panel header="Cabin" key="cabin" className="custom-panel">*/}
                {/*    <div className="space-y-2">*/}
                {/*        {cabinClasses.map((cabin) => (*/}
                {/*            <label key={cabin} className="flex items-center space-x-2">*/}
                {/*                <input type="checkbox" className="rounded border-gray-300"/>*/}
                {/*                <span>{cabin}</span>*/}
                {/*            </label>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</Panel>*/}
            </Collapse>
        </div>
    );
};

export default FlightFilters;
