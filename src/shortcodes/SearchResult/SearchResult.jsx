import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { fetchData } from "../../services/fetchData.js";

import flightCard from "./components/FlightCard.jsx";
import FlightTabs from "./components/FlightTabs.jsx";
import FlightDate from "./components/FlightDate.jsx";
import FlightCard from "./components/FlightCard.jsx";
import FlightFilters from "./components/FlightFilters.jsx";

export default function SearchResult() {
    const [flights, setFlights] = useState([]); // State to store flight data
    const [tripFilter, setTripFilter] = useState(null); // State to store trip filter data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    // useEffect(() => {
    //     const fetchFlights = () => {
    //         fetchData(
    //             "tt/flight/fetch", // Your WordPress action
    //             (response) => {
    //                 if (response.success) {
    //                     try {
    //                         const flightJourneys = response.data?.flight_journeys?.flightFare || [];
    //                         const tripFilter = response.data?.trip_filter || null;
    //
    //                         const flightData = flightJourneys.map((journey) => ({
    //                             companyName: journey.flightDetails?.[0]?.headerTextWeb || "Unknown Airline", // Airline name
    //                             departureTime: journey.flightDetails?.[0]?.departureTime || "N/A", // Departure time
    //                             arrivalTime: journey.flightDetails?.[0]?.arrivalTime || "N/A", // Arrival time
    //                             flightFare: journey.fares?.[0]?.fareDetails?.displayFare || "N/A", // Flight fare
    //                             stops: journey.flightDetails?.[0]?.stopText || "N/A", // Number of stops
    //                             duration: journey.flightDetails?.[0]?.duration?.text || "N/A", // Duration
    //                         }));
    //
    //                         setFlights(flightData || []); // Fallback to an empty array if flightData is undefined
    //                         setTripFilter(tripFilter); // Store trip filter data
    //                     } catch (err) {
    //                         setError("Failed to parse flight data.");
    //                     }
    //                 } else {
    //                     setError(response?.data?.error || "Unknown error occurred.");
    //                 }
    //                 setLoading(false);
    //             },
    //             {} // Additional parameters if needed
    //         );
    //     };
    //
    //     fetchFlights();
    // }, []);

    // if (loading) {
    //     return (
    //         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    //             <Spin size="large" />
    //         </div>
    //     );
    // }
    //
    // if (error) {
    //     return <div>Error loading flights: {error}</div>;
    // }

    const smartFlightCard = <FlightCard
        price={2648}
        duration="2h 05m"
        departure="2:23 PM"
        arrival="4:28 PM"
    />;

    const cheapestFlightCard = <FlightCard
        price={1999}
        duration="2h 30m"
        departure="3:00 PM"
        arrival="5:30 PM"
    />;

    const quickestFlightCard = <FlightCard
        price={2899}
        duration="2h 02m"
        departure="1:00 PM"
        arrival="3:02 PM"
    />;

    return (
        <div>
            {/* Display Trip Filter Details */}
            <div className="flex justify-between gap-6">
                <FlightFilters />
                <div className="w-full">
                    <FlightDate />
                    <FlightTabs
                        smartCard={smartFlightCard}
                        cheapestCard={cheapestFlightCard}
                        quickestCard={quickestFlightCard}
                    />
                </div>
            </div>
            {/*{tripFilter && (*/}
            {/*    <div style={{ marginBottom: "20px" }}>*/}
            {/*        <h3>Trip Filters</h3>*/}
            {/*        <p>*/}
            {/*            <strong>Price Range:</strong> ₹{tripFilter.minPrice} - ₹{tripFilter.maxPrice}*/}
            {/*        </p>*/}
            {/*        <ul>*/}
            {/*            {tripFilter.stopsFilter.map((stop, index) => (*/}
            {/*                <li key={index}>*/}
            {/*                    <strong>{stop.stopText}:</strong> ₹{stop.fare} ({stop.count} flights)*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*/!* Display Flight Details *!/*/}
            {/*{flights.length > 0 ? (*/}
            {/*    <ul>*/}
            {/*        {flights.map((flight, index) => (*/}
            {/*            <li key={index} style={{ marginBottom: "10px" }}>*/}
            {/*                <strong>Company:</strong> {flight.companyName} <br />*/}
            {/*                <strong>Fare:</strong> ₹{flight.flightFare} <br />*/}
            {/*                <strong>Departure Time:</strong> {flight.departureTime} <br />*/}
            {/*                <strong>Arrival Time:</strong> {flight.arrivalTime} <br />*/}
            {/*                <strong>Stops:</strong> {flight.stops} <br />*/}
            {/*                <strong>Duration:</strong> {flight.duration}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*) : (*/}
            {/*    <p>No flights available.</p>*/}
            {/*)}*/}
        </div>
    );
}