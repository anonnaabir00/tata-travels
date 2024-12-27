// FlightTabs.jsx
import React from 'react';
import { Tabs } from 'antd';

const FlightTabs = ({ smartCard, cheapestCard, quickestCard, allFlights }) => {
    const items = [
        {
            key: 'all',
            label: 'All Flights',
            children: (
                <div className="space-y-4">
                    {allFlights}
                </div>
            ),
        },
        {
            key: 'recommended',
            label: 'Recommended',
            children: smartCard,
        },
        {
            key: 'cheapest',
            label: 'Cheapest',
            children: cheapestCard,
        },
        {
            key: 'quickest',
            label: 'Quickest',
            children: quickestCard,
        },
    ];

    return <Tabs defaultActiveKey="recommended" items={items} />;
};

export default FlightTabs;