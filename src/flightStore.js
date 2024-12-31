import { create } from 'zustand';

const useFlightStore = create((set, get) => ({
    // Raw data from API
    flights: [],
    // Filtered flights based on current filters
    filteredFlights: [],
    // Filter states
    filters: {
        stops: [],
        priceRange: [0, 0],
        timeSlots: [],
        recommended: true,
    },

    // Actions
    setFlights: (flights) => {
        set({
            flights,
            filteredFlights: flights,
            filters: {
                ...get().filters,
                priceRange: [
                    Math.min(...flights.map(f => f.price)),
                    Math.max(...flights.map(f => f.price))
                ]
            }
        });
    },

    // Update filters and apply filtering
    updateFilters: (newFilters) => {
        const state = get();
        const updatedFilters = { ...state.filters, ...newFilters };
        set({ filters: updatedFilters });

        // Apply all filters
        let filtered = state.flights;

        // Filter by stops
        if (updatedFilters.stops.length > 0) {
            filtered = filtered.filter(flight =>
                updatedFilters.stops.includes(flight.stops === 0 ? 'Direct' :
                    flight.stops === 1 ? '1 Stop' : '2+ Stop')
            );
        }

        // Filter by price range
        filtered = filtered.filter(flight =>
            flight.price >= updatedFilters.priceRange[0] &&
            flight.price <= updatedFilters.priceRange[1]
        );

        // Filter by time slots
        if (updatedFilters.timeSlots.length > 0) {
            filtered = filtered.filter(flight => {
                const hour = new Date(flight.departureTime).getHours();
                return updatedFilters.timeSlots.some(slot => {
                    switch(slot) {
                        case 'early': return hour < 6;
                        case 'morning': return hour >= 6 && hour < 12;
                        case 'midday': return hour >= 12 && hour < 18;
                        case 'night': return hour >= 18;
                        default: return false;
                    }
                });
            });
        }

        set({ filteredFlights: filtered });
    },

    // Reset all filters
    resetFilters: () => {
        const state = get();
        set({
            filters: {
                stops: [],
                priceRange: [
                    Math.min(...state.flights.map(f => f.price)),
                    Math.max(...state.flights.map(f => f.price))
                ],
                timeSlots: [],
                recommended: true,
            },
            filteredFlights: state.flights
        });
    }
}));

export default useFlightStore;