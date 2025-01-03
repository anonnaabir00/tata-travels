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
        airportCode: 'DEL'
    },
    {
        title: "Mumbai, Maharashtra, India",
        description: "Chhatrapati Shivaji International Airport",
        airportCode: 'BOM'
    },
    {
        title: "Hyderabad, Telangana, India",
        description: "Rajiv Gandhi International Airport",
        airportCode: 'HYD'
    },
    {
        title: "Bengaluru, Karnataka, India",
        description: "Kempegowda International airport",
        airportCode: 'BLR'
    },
    {
        title: "Chennai, Tamil Nadu, India",
        description: "Chennai International Airport",
        airportCode: 'MAA'
    },
    {
        title: "Goa, Goa, India",
        description: "Dabolim Airport",
        airportCode: 'GOI'
    },
    {
        title: "Dubai, United Arab Emirates",
        description: "Dubai International Airport",
        airportCode: 'DXB'
    },
    {
        title: "Singapore, Singapore",
        description: "Changi",
        airportCode: 'SIN'
    },
    {
        title: "Bangkok, Bangkok, Thailand",
        description: "Suvarnabhumi Airport",
        airportCode: 'BKK'
    },
    {
        title: "Kuala Lumpur, Kuala Lumpur, Malaysia",
        description: "Kuala Lumpur Intl",
        airportCode: 'KUL'
    },
];

export default function FlightSearchRound() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Form Values:", values);
        // Convert ISO string to Date object and format it
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            return `${day}${month}${year}`;
        };

        const leaveDate = formatDate(values.departureDate);
        const returnDate = values.returnDate ? formatDate(values.returnDate) : null;


        const queryParams = new URLSearchParams({
            from: values.from,
            to: values.to,
            departureDate: leaveDate,
            returnDate: returnDate
        }).toString();

        window.location.replace(`/search-result?${queryParams}`);

    };

    return (
        <div className="rounded-md w-full mx-auto">
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
                            rules={[{required: true, message: "Please select a departure location"}]}
                        >
                            <TataLocationSearch heading="From" locations={locations}/>
                        </Form.Item>
                    </div>
                    <img className='location-joiner -mt-3' src={flightArrow}/>
                    {/* To Location */}
                    <div>
                        <Form.Item
                            name="to"
                            rules={[{required: true, message: "Please select a destination"}]}
                        >
                            <TataLocationSearch heading="To" locations={locations}/>
                        </Form.Item>
                    </div>
                </div>

                {/* Departure Date */}
                <div className="w-full">
                    <Form.Item
                        name="departureDate"
                        rules={[{ required: true, message: "Please select a departure date" }]}
                    >
                        <TataDate header="Departure" />
                    </Form.Item>
                </div>

                <div className="w-full">
                    {/* Return Date */}
                    <Form.Item
                        name="returnDate"
                        rules={[{ required: false }]} // Optional
                    >
                        <TataDate header="Return" />
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