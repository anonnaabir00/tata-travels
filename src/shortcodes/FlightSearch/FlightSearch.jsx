import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import TataDate from "../../common/controls/TataDate.jsx";
import { SwapOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function FlightSearch() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureDate, setDepartureDate] = useState(null);
    const [travelers, setTravelers] = useState("2");
    const [travelClass, setTravelClass] = useState("Economy");

    const handleSearch = () => {
        console.log({ from, to, departureDate, travelers, travelClass });
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-xl w-full mx-auto">
            <div className="search-header">
                <div className="flex justify-start mb-4 gap-4 w-2/6">
                    <button
                        className={`w-1/2 py-2 px-4 text-center border-r-2 border-orange-500 font-bold text-orange-500`}
                    >
                        One Way
                    </button>
                    <button
                        className="w-1/2 py-2 px-4 text-center text-gray-500"
                    >
                        Round Trip
                    </button>
                </div>
            </div>
            <div className="search-body flex">
                <div className="flex space-x-4 mb-4">
                    <Input
                        placeholder="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="flex-1"
                    />
                    <Input
                        placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    className="flex-1"
                />
            </div>
            <div className="flex space-x-4 mb-4">
                <TataDate />
                <Select
                    value={travelers}
                    onChange={(value) => setTravelers(value)}
                    className="flex-1"
                >
                    {[...Array(10).keys()].map((num) => (
                        <Option key={num + 1} value={(num + 1).toString()}>
                            {num + 1} Traveler{num + 1 > 1 ? "s" : ""}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className="flex space-x-4 mb-4">
                <Select
                    value={travelClass}
                    onChange={(value) => setTravelClass(value)}
                    className="flex-1"
                >
                    <Option value="Economy">Economy</Option>
                    <Option value="Business">Business</Option>
                    <Option value="First Class">First Class</Option>
                </Select>
            </div>
            <Button
                type="primary"
                className="w-full"
                onClick={handleSearch}
            >
                Search
            </Button>
            </div>
        </div>
    );
}