import React from 'react';
import { Tabs } from 'antd';

const FlightTabs = ({ smartCard, cheapestCard, quickestCard }) => {
    const items = [
        {
            key: 'smart',
            label: (
                <div>
                    <div className="text-orange-500 font-medium">Smart (Recommendation)</div>
                    <div className="text-gray-600 text-sm">Best (£119. 2h 05m)</div>
                </div>
            ),
            children: smartCard
        },
        {
            key: 'cheapest',
            label: (
                <div>
                    <div className="font-medium">Cheapest</div>
                    <div className="text-gray-600 text-sm">(£107)</div>
                </div>
            ),
            children: cheapestCard
        },
        {
            key: 'quickest',
            label: (
                <div>
                    <div className="font-medium">Quickest</div>
                    <div className="text-gray-600 text-sm">(2h 02m)</div>
                </div>
            ),
            children: quickestCard
        }
    ];

    return (
        <div className="w-full mx-auto">
            <Tabs
                defaultActiveKey="smart"
                items={items}
                className="flight-tabs"
                tabBarStyle={{ marginBottom: 0 }}
            />

            <style jsx global>{`
                .flight-tabs .ant-tabs-nav {
                    margin-bottom: 0;
                }
                .flight-tabs .ant-tabs-nav::before {
                    border-bottom: none;
                }
                .flight-tabs .ant-tabs-tab {
                    padding: 12px 24px;
                    margin: 0 !important;
                }
                .flight-tabs .ant-tabs-tab-active {
                    background-color: white;
                    border-bottom: 2px solid #f97316 !important;
                }
                .flight-tabs .ant-tabs-ink-bar {
                    background-color: #f97316;
                }
                .flight-tabs .ant-tabs-tab:hover {
                    color: #f97316;
                }
                .flight-tabs .ant-tabs-tab-btn {
                    text-align: left;
                }
            `}</style>
        </div>
    );
};

export default FlightTabs;