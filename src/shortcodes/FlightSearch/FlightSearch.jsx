import React from "react";
import { Form } from "antd";
import TataButton from "../../common/controls/TataButton.jsx";
import TataDate from "../../common/controls/TataDate.jsx";
import TataLocationSearch from "../../common/controls/TataLocationSearch.jsx";
import TravelDetails from "../../common/controls/TravelDetails.jsx";
import flightArrow from "./assets/flight_arrrow.svg";
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
        window.location.replace("/new-search-result");
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-xl w-full mx-auto">
            <div className="search-header">

            </div>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="search-body flex justify-between gap-6 items-center"
            >
                {/* From Location */}
                <div className="flex w-full mr-4 mt-2">
                    <div>
                        <Form.Item
                            name="from"
                            rules={[{ required: true, message: "Please select a departure location" }]}
                        >
                            <TataLocationSearch heading="From" locations={locations} />
                        </Form.Item>
                    </div>
                <img className='-mt-6' src={flightArrow} />
                {/* To Location */}
                    <div>
                        <Form.Item
                            name="to"
                            rules={[{ required: true, message: "Please select a destination" }]}
                        >
                            <TataLocationSearch heading="To" locations={locations} />
                        </Form.Item>
                    </div>
                </div>

                {/* Departure Date */}
                <div className="w-full">
                    <Form.Item
                        name="departureDate"
                        rules={[{ required: true, message: "Please select a departure date" }]}
                    >
                        <TataDate />
                    </Form.Item>
                </div>

                <div className="w-full">
                {/* Return Date */}
                <Form.Item
                    name="returnDate"
                    rules={[{ required: false }]} // Optional
                >
                    <TataDate />
                </Form.Item>
                </div>

                <TravelDetails
                    travellers={{ adults: 2, children: 0, infants: 1 }}
                    className="my-4"
                    travelClass="Economy"
                    onTravelClassChange={(travelClass) => console.log('Travel class changed:', travelClass)}
                />

                {/* Search Button */}
                <div className="w-full -mt-5">
                    <TataButton label="Search" htmlType="submit" />
                </div>
            </Form>
        </div>
    );
}