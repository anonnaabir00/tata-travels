import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { fetchData } from "../../services/fetchData.js";
import FlightCard from "./components/FlightCard.jsx";
import FlightTabs from "./components/FlightTabs.jsx";
import FlightDate from "./components/FlightDate.jsx";
import FlightFilters from "./components/FlightFilters.jsx";
import useFlightStore from "../../flightStore.js";

const getAirlineImagePath = (airlineCode) => {
    try {
        return `${tt_settings.assets_path}/airlines/${airlineCode}.png`;
    } catch (error) {
        // Return a default image if the airline image is not found
        return './assets/airlines/default.png';
    }
};

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
            airlineCode={flightData.airlineCode}
            airlineImage={getAirlineImagePath(flightData.airlineCode)}
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


    const allFlightCards = filteredFlights.map(flight => createFlightCard(flight));


    const cheapestFlight = filteredFlights.find(flight => flight.chips === "CHEAPEST");
    const fastestFlight = filteredFlights.find(flight => flight.chips === "FASTEST");
    const recommendedFlight = filteredFlights.reduce((prev, current) =>
        (current.sort.recommended > prev.sort.recommended) ? current : prev
    );


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
                    {/*<FlightFilters*/}
                    {/*    totalFlights={100} // Use filtered length*/}
                    {/*    maxPrice={1230}*/}
                    {/*    minPrice={3445}*/}
                    {/*    stops={'1 Stop'} // Pass all flights for filtering*/}
                    {/*/>*/}
                </div>
                <div className="w-full">
                    <FlightDate />
                    {/*<FlightCard*/}
                    {/*    // key={flightData.id} // Add a unique key if available*/}
                    {/*    airlineName={'Air India'}*/}
                    {/*    flightNumber={'123456A'}*/}
                    {/*    airlineCode={'AI'}*/}
                    {/*    airlineImage={getAirlineImagePath('AI')}*/}
                    {/*    price={'12134'}*/}
                    {/*    duration={'121212'}*/}
                    {/*    departureTime={'1212121'}*/}
                    {/*    arrivalTime={'4454545'}*/}
                    {/*    origin={'DEL'}*/}
                    {/*    destination={'67676'}*/}
                    {/*    stops={'1 Stop'}*/}
                    {/*    offerText={'Lorem ipsum dollar'}*/}
                    {/*    isFreeMeal={true}*/}
                    {/*    cabinClass={'Premium Economy'}*/}
                    {/*    checkInBaggage={'1 Passenger'}*/}
                    {/*    handBaggage={'1 bag'}*/}
                    {/*    seatRemaining={'3 Seats'}*/}
                    {/*    // chips={}*/}
                    {/*/>*/}
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