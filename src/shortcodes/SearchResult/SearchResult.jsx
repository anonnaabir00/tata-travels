import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { fetchData } from "../../services/fetchData.js";
import FlightCard from "./components/FlightCard.jsx";
import FlightTabs from "./components/FlightTabs.jsx";
import FlightDate from "./components/FlightDate.jsx";
import FlightFilters from "./components/FlightFilters.jsx";
import useFlightStore from "../../flightStore.js";

export default function SearchResult() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [flightFilter, setFlightFilter] = useState(null);

    // Get store actions and state
    const {
        initializeFlights,
        filteredFlights,
        flights
    } = useFlightStore();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const departureDate = urlParams.get('departureDate');

        const additionalParams = {
            departureDate,
        };

        const fetchFlights = () => {
            fetchData(
                "tt/flight/fetch",
                (response) => {
                    if (response.success) {
                        try {
                            const flightData = response.data?.flight_details?.fare || [];
                            setFlightFilter(response.data?.trip_filter);

                            // Initialize the store with flight data
                            initializeFlights(flightData);
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

    if (error)
        return (
            <div>
                <div className="flex justify-between gap-6">
                    <FlightFilters/>
                    <div className="w-full">
                        <FlightDate/>
                        No Flights Found
                    </div>
                </div>
            </div>
        );

    // Create flight card component with provided data
    const createFlightCard = (flightData) => (
        <FlightCard
            key={flightData.id} // Add a unique key if available
            airlineName={flightData.headerText}
            flightNumber={flightData.subHeaderTextWeb}
            price={flightData.displayFare}
            duration={flightData.duration.hour}
            departureTime={flightData.departureTime}
            arrivalTime={flightData.arrivalTime}
            origin={flightData.origin}
            destination={flightData.destination}
            stops={flightData.stopText}
            offerText={flightData.offerText}
            isFreeMeal={flightData.fareDetails.isFreeMealAvailable}
            cabinClass={flightData.cabinClass}
            checkInBaggage={flightData.fareDetails.checkInBaggage}
            handBaggage={flightData.fareDetails.handBaggage}
            seatRemaining={flightData.fareDetails.seatRemaining}
            chips={flightData.chips}
        />
    );

    // Use filtered flights for all cards
    const allFlightCards = filteredFlights.map(flight => createFlightCard(flight));

    // Find special flights from filtered results
    const cheapestFlight = filteredFlights.find(flight => flight.chips === "CHEAPEST");
    const fastestFlight = filteredFlights.find(flight => flight.chips === "FASTEST");
    const recommendedFlight = filteredFlights.reduce((prev, current) =>
        (current.sort.recommended > prev.sort.recommended) ? current : prev
    );

    // Create cards for special categories
    const smartFlightCard = recommendedFlight && createFlightCard(recommendedFlight);
    const cheapestFlightCard = cheapestFlight && createFlightCard(cheapestFlight);
    const quickestFlightCard = fastestFlight && createFlightCard(fastestFlight);

    return (
        <div>
            <div className="flex justify-between gap-6">
                <div className="w-2/6">
                    <FlightFilters
                        totalFlights={filteredFlights.length} // Use filtered length
                        maxPrice={flightFilter?.maxPrice}
                        minPrice={flightFilter?.minPrice}
                        stops={flights} // Pass all flights for filtering
                    />
                </div>
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