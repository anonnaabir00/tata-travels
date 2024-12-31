import React, { useState } from 'react';
import { CircleArrowRight, Clock, Plane, Lock, ChevronDown } from 'lucide-react';
import flightpath from "./assets/flight_path.png";
import {Button, Modal, Drawer } from "antd";
import flightArrow from "../../FlightSearch/assets/flight_arrrow.svg";

const FlightCard = ({
                        airlineName,
                        flightNumber,
                        price,
                        duration,
                        departureTime,
                        arrivalTime,
                        origin,
                        destination,
                        stops,
                        offerText,
                        isFreeMealAvailable,
                        checkInBaggage,
                        cabinClass,
                        seatRemaining,
                        handBaggage,
                        refundableType,
                        fareType,
                        chips
                    }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Format cabin class for display
    const formatCabinClass = (cabinClass) => {
        return cabinClass
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <>
            <div
                style={{
                    border: "1px solid #E2E8F0",
                }}
                className="w-full bg-white rounded-lg shadow-lg mb-8">

                {/* Top Part */}
                <div className="flex items-start justify-between p-6 pb-0">
                    {/* Left section - Airline and flight details */}
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-600">{airlineName.slice(0, 2)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{flightNumber}</p>
                    </div>

                    {/* Middle section - Flight info */}
                    <div className="flex justify-between gap-4">
                        <div>
                            <div>{origin}</div>
                            <div className="text-xl font-bold">{departureTime}</div>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-sm text-gray-500 mb-1">{duration}</p>
                            <img className='' src={flightpath}/>
                        </div>

                        <div>
                            <div>{destination}</div>
                            <div className="text-xl font-bold">{arrivalTime}</div>
                        </div>
                    </div>

                    {/* Right section - Price and Offer */}
                    <div>
                        <p className="text-2xl font-bold mb-2">₹{price.toLocaleString()}</p>
                        {offerText && (
                                <div className="text-green-500 text-sm mb-2" dangerouslySetInnerHTML={{ __html: offerText }} />
                        )}
                        {chips && (
                        <span className="bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full">{chips}</span>
                        )}
                    </div>
                </div>

                {/* Middle Part */}
                <div className="flex justify-end p-6 pt-2 pb-0">
                    <button
                        className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                        Book Flight
                        <CircleArrowRight className="w-4 h-4 ml-1"/>
                    </button>
                </div>

                {/* Last Part */}
                <div style={{
                    borderTop: "1px solid #E2E8F0",
                }} className="mt-4 p-6 flex justify-between items-center">

                    <button onClick={showModal}
                            className="flex items-center bg-white text-orange-500 text-sm font-medium cursor-pointer">
                        Flight Details
                        <CircleArrowRight className="w-4 h-4 ml-1"/>
                    </button>

                    <Drawer title="Flight Details" open={isModalOpen} onOk={handleOk} onClose={handleCancel}>
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                            <div className="space-y-4">
                                {/* Fare Type and Refund Policy */}
                                <div className="">
                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-900">Fare Type</p>
                                        <p className="text-gray-600">{fareType || 'Regular Fare'}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-900">Refund Type</p>
                                        <p className="text-gray-600">
                                            {refundableType?.replace(/_/g, ' ') || 'Non Refundable'}
                                        </p>
                                    </div>


                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-900">Cabin Class</p>
                                        <p className="text-gray-600">{cabinClass}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-900">Check In Baggage</p>
                                        <p className="text-gray-600 text-right">{checkInBaggage}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-900">Hand Baggage</p>
                                        <p className="text-gray-600">{handBaggage}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-900">Seat Remaining</p>
                                        <p className="text-gray-600">{seatRemaining}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="font-medium text-gray-900">Free Meal Available</p>
                                        <p className="text-gray-600">{!!isFreeMealAvailable ? 'yes' : 'no'}</p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </Drawer>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Redeem Code</span>
                            <div className="border border-gray-300 rounded px-3 py-1">
                                <span className="text-sm text-gray-800">TUDSD45F</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default FlightCard;