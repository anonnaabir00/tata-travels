import React from 'react';
import { Tabs } from 'antd';
import FlightSearch from "../FlightSearch/FlightSearch.jsx";
import FlightSearchRound from "../FlightSearch/FlightSearchRound.jsx";

const SearchTab = () => {
    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        key: '1',
                        label: 'One Way',
                        children: <FlightSearch />,
                    },
                    {
                        key: '2',
                        label: 'Round Trip',
                        children: <FlightSearchRound />,
                    },
                ]}
                className="custom-tabs"
            />
            <style>{`
               .custom-tabs .ant-tabs-nav {
                   background: #f3f4f6;
                   border-radius: 9px;
                   margin-bottom: 3rem; 
                   width: 260px;
                   height: 40px;
                   display: flex;
                   flex-direction: row;
                   justify-content: flex-start;
                   align-items: flex-start;
                   padding: 4px;                
               }
               .custom-tabs .ant-tabs-tab {
                   padding: 8px 30px;
                   margin: 0 !important;
                   margin-bottom: 2px !important;
                   border-radius: 7px !important;
                   border: none !important;
                   background: transparent !important;
                   color: #1E293B !important;
                   font-size: 14px !important;
                   text-align: center !important;
               }
               .custom-tabs .ant-tabs-tab-active {
                   border: 0.5px solid rgba(0, 0, 0, 0.04);
                   border-radius: 7px;
                   box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04),0px 3px 8px 0px rgba(0, 0, 0, 0.12);
                   background: white !important;
                   color: #1E293B !important;
                   font-size: 14px !important;
                   text-align: center !important;
               }
               
               .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                   color: #1E293B !important;
                   font-size: 14px !important;
                   text-align: center !important;
                   font-weight: 600 !important; 
               }
               .custom-tabs .ant-tabs-ink-bar {
                   display: none;
               }
           `}</style>
        </div>
    );
};

export default SearchTab;