import React, { useState } from 'react';
import { ChevronRight, Clock, Plane, Lock, ChevronDown } from 'lucide-react';


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
                        fareMetadata,
                        flightDetails,
                        refundableType,
                        fareType,
                        chips
                    }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Format cabin class for display
    const formatCabinClass = (cabinClass) => {
        return cabinClass
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {/* Main Flight Card Content */}
            <div className="p-4">
                {/* Special Tags */}
                {chips && (
                    <div className="absolute -top-2 left-4">
                        <span className="bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                            {chips}
                        </span>
                    </div>
                )}

                {/* Airline Info and Price */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                            {/* Replace with actual airline logo */}
                            <span className="text-lg font-bold">{airlineName.slice(0, 2)}</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{airlineName}</p>
                            <p className="text-sm text-gray-500">{flightNumber}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{price.toLocaleString()}</p>
                        {offerText && (
                            <div className="text-sm" dangerouslySetInnerHTML={{ __html: offerText }} />
                        )}
                    </div>
                </div>

                {/* Flight Timeline */}
                <div className="flex justify-between items-center mb-6">
                    {/* Departure */}
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{departureTime}</p>
                        <p className="text-sm font-medium text-gray-600">{origin}</p>
                    </div>

                    {/* Flight Duration and Stops */}
                    <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{duration}</span>
                        </div>
                        <div className="relative">
                            <div className="border-t-2 border-gray-300 w-full"></div>
                            <div className="absolute -top-2 right-0">
                                <Plane className="w-4 h-4 text-blue-500 transform rotate-90" />
                            </div>
                            <div className="absolute -bottom-4 w-full text-center">
                                <span className="text-xs text-gray-500 bg-white px-2">{stops}</span>
                            </div>
                        </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{arrivalTime}</p>
                        <p className="text-sm font-medium text-gray-600">{destination}</p>
                    </div>
                </div>

                {/* Flight Features */}
                <div className="flex items-center space-x-4 mb-4">
                    {fareMetadata && fareMetadata[0] && (
                        <>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-1">👜</span>
                                {fareMetadata[0].baggageDetails.handBaggage}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-1">🧳</span>
                                {fareMetadata[0].baggageDetails.checkInBaggage}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-1">💺</span>
                                {formatCabinClass(fareMetadata[0].cabinClass)}
                            </div>
                        </>
                    )}
                    {isFreeMealAvailable && (
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-1">🍽️</span>
                            Free Meal
                        </div>
                    )}
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                        className="flex items-center text-blue-500 text-sm font-medium hover:text-blue-600"
                    >
                        Flight Details
                        <ChevronDown className={`w-4 h-4 ml-1 transform transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div className="flex items-center space-x-4">
                        {/* Coupon Input */}
                        <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
                            <Lock className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Enter coupon"
                                className="bg-transparent text-sm w-24 outline-none"
                            />
                        </div>

                        {/* Book Button */}
                        <button className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                            Book Now
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Expandable Flight Details */}
            {isDetailsOpen && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="space-y-4">
                        {/* Fare Type and Refund Policy */}
                        <div className="flex justify-between text-sm">
                            <div>
                                <p className="font-medium text-gray-900">Fare Type</p>
                                <p className="text-gray-600">{fareType || 'Regular Fare'}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-900">Refund Type</p>
                                <p className="text-gray-600">
                                    {refundableType?.replace(/_/g, ' ') || 'Non Refundable'}
                                </p>
                            </div>
                        </div>

                        {/* Flight Details Table */}
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600">Flight</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Departure</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Arrival</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Duration</th>
                                </tr>
                                </thead>
                                <tbody>
                                {flightDetails && flightDetails.map((flight, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">{flight.headerTextWeb}</p>
                                                <p className="text-gray-500">{flight.subHeaderTextWeb}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">{flight.departureTime}</p>
                                                <p className="text-gray-500">{flight.origin}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">{flight.arrivalTime}</p>
                                                <p className="text-gray-500">{flight.destination}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p>{flight.duration.text}</p>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Baggage Information */}
                        {fareMetadata && fareMetadata[0] && (
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Baggage Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Cabin Baggage</p>
                                        <p>{fareMetadata[0].baggageDetails.handBaggage}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Check-in Baggage</p>
                                        <p>{fareMetadata[0].baggageDetails.checkInBaggage}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightCard;