import React from "react";
import { Form } from "antd";
import TataButton from "../../common/controls/TataButton.jsx";
import TataDate from "../../common/controls/TataDate.jsx";
import TataLocationSearch from "../../common/controls/TataLocationSearch.jsx";
import { SwapOutlined } from "@ant-design/icons";

const locations = [
    {
        title: "New Delhi, Delhi, India",
        description: "Indira Gandhi Intl Airport",
        image: "https://via.placeholder.com/50?text=DEL",
    },
    {
        title: "Mumbai, Maharashtra, India",
        description: "Chhatrapati Shivaji International Airport",
        image: "https://via.placeholder.com/50?text=BOM",
    },
    {
        title: "Hyderabad, Telangana, India",
        description: "Rajiv Gandhi International Airport",
        image: "https://via.placeholder.com/50?text=HYD",
    },
    {
        title: "Bengaluru, Karnataka, India",
        description: "Kempegowda International airport",
        image: "https://via.placeholder.com/50?text=BLR",
    },
];

export default function FlightSearch() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Form Values:", values);
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-xl w-full mx-auto">
            <div className="search-header">
                <div className="flex justify-start mb-4 gap-4 w-2/6">
                    <button className="w-1/2 py-2 px-4 text-center border-r-2 border-orange-500 font-bold text-orange-500">
                        One Way
                    </button>
                    <button className="w-1/2 py-2 px-4 text-center text-gray-500">
                        Round Trip
                    </button>
                </div>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="search-body grid grid-cols-5 gap-6 items-center"
            >
                {/* From Location */}
                <Form.Item
                    name="from"
                    label="From"
                    rules={[{ required: true, message: "Please select a departure location" }]}
                >
                    <TataLocationSearch heading="From" locations={locations} />
                </Form.Item>

                {/* To Location */}
                <Form.Item
                    name="to"
                    label="To"
                    rules={[{ required: true, message: "Please select a destination" }]}
                >
                    <TataLocationSearch heading="To" locations={locations} />
                </Form.Item>

                {/* Departure Date */}
                <Form.Item
                    name="departureDate"
                    label="Departure Date"
                    rules={[{ required: true, message: "Please select a departure date" }]}
                >
                    <TataDate />
                </Form.Item>

                {/* Return Date */}
                <Form.Item
                    name="returnDate"
                    label="Return Date"
                    rules={[{ required: false }]} // Optional
                >
                    <TataDate />
                </Form.Item>

                {/* Search Button */}
                <TataButton label="Search" htmlType="submit" />
            </Form>
        </div>
    );
}