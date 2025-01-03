// FlightTabs.jsx
import React from 'react';
import { Tabs } from 'antd';

const FlightTabs = ({ smartCard, cheapestCard, quickestCard, allFlights }) => {
    const items = [
        {
            key: 'all',
            label: 'Smart (Recommendation)',
            children: (
                <div className="space-y-4">
                    {allFlights}
                </div>
            ),
        },
        {
            key: 'recommended',
            label: 'Best',
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

    return <Tabs defaultActiveKey="all" items={items} />;
};

export default FlightTabs;