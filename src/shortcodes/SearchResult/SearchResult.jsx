import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { fetchData } from "../../services/fetchData.js";
import FlightCard from "./components/FlightCard.jsx";
import FlightTabs from "./components/FlightTabs.jsx";
import FlightDate from "./components/FlightDate.jsx";
import FlightFilters from "./components/FlightFilters.jsx";

export default function SearchResult() {
    const [flights, setFlights] = useState({
        all: [],
        cheapest: null,
        fastest: null,
        recommended: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const departureDate = urlParams.get('departureDate');

        // Create additional parameters object
        const additionalParams = {
            departureDate,
        };

        const fetchFlights = () => {
            fetchData(
                "tt/flight/fetch",
                (response) => {
                    if (response.success) {
                        console.log(response)
                        try {
                            const flightData = response.data?.flight_journeys?.flightFare || [];

                            // Find special flights
                            const cheapestFlight = flightData.find(flight => flight.chips === "CHEAPEST");
                            const fastestFlight = flightData.find(flight => flight.chips === "FASTEST");
                            // For recommended, use the highest recommended rating
                            const recommendedFlight = flightData.reduce((prev, current) =>
                                (current.sort.recommended > prev.sort.recommended) ? current : prev
                            );

                            setFlights({
                                all: flightData, // Store all flights
                                cheapest: cheapestFlight,
                                fastest: fastestFlight,
                                recommended: recommendedFlight
                            });
                        } catch (err) {
                            setError("Failed to parse flight data.");
                        }
                    } else {
                        setError(response?.data?.error || "Unknown error occurred.");
                    }
                    setLoading(false);
                },
                {additionalParams}
            );
        };

        fetchFlights();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    if (error) return <div>Error loading flights: {error}</div>;

    // Create flight card component with provided data
    const createFlightCard = (flightData) => (
        <FlightCard
            key={flightData.flightKeys}
            airlineName={flightData.flightDetails[0].headerTextWeb}
            flightNumber={flightData.flightDetails[0].subHeaderTextWeb}
            price={flightData.fares[0].fareDetails.displayFare}
            duration={flightData.flightDetails[0].duration.text}
            departureTime={flightData.flightDetails[0].departureTime}
            arrivalTime={flightData.flightDetails[0].arrivalTime}
            origin={flightData.flightDetails[0].origin}
            destination={flightData.flightDetails[0].destination}
            stops={flightData.flightDetails[0].stopText}
            offerText={flightData.fares[0].offerText}
            isFreeMeal={flightData.isFreeMealAvailable}
            cabinClass={flightData.fares[0].fareMetadata[0].cabinClass}
            baggageInfo={flightData.fares[0].fareMetadata[0].baggageDetails}
            chips={flightData.chips}
        />
    );

    // Create cards for special categories
    const smartFlightCard = flights.recommended && createFlightCard(flights.recommended);
    const cheapestFlightCard = flights.cheapest && createFlightCard(flights.cheapest);
    const quickestFlightCard = flights.fastest && createFlightCard(flights.fastest);

    // Create cards for all flights
    const allFlightCards = flights.all.map(flight => createFlightCard(flight));

    return (
        <div>
            <div className="flex justify-between gap-6">
                <FlightFilters />
                <div className="w-full">
                    <FlightDate />
                    <FlightTabs
                        allFlights={allFlightCards}
                        smartCard={smartFlightCard}
                        cheapestCard={cheapestFlightCard}
                        quickestCard={quickestFlightCard}
                    />
                </div>
            </div>
        </div>
    );
}