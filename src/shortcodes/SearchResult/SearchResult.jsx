import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";

export default function SearchResult() {
    const [flights, setFlights] = useState([]); // State to store flight data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("https://ixigo-api.onrender.com/fetch/flights");
                const flightData = response.data?.data?.flightJourneys?.flatMap(journey => {
                    return journey.flightFare.map(fare => ({
                        companyName: journey?.flightDetails?.[0]?.headerTextWeb || "Unknown Airline", // Airline name
                        departureTime: journey?.flightDetails?.[0]?.departureTime || "N/A", // Departure time
                        flightFare: fare?.fares?.[0]?.fareDetails?.displayFare || "N/A" // Flight fare
                    }));
                });
                setFlights(flightData || []); // Fallback to an empty array if flightData is undefined
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Set loading to false after data is fetched or an error occurs
            }
        };

        fetchFlights();
    }, []);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <div>Error loading flights: {error}</div>;
    }

    return (
        <div>
            <h2>Search Result From React</h2>
            {flights.length > 0 ? (
                <ul>
                    {flights.map((flight, index) => (
                        <li key={index}>
                            <strong>Company:</strong> {flight.companyName} <br />
                            <strong>Fare:</strong> ₹{flight.flightFare} <br />
                            <strong>Departure Time:</strong> {flight.departureTime}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No flights available.</p>
            )}
        </div>
    );
}