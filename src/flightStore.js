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
        recommended: true
    },

    // Initialize store with flights data
    initializeFlights: (flights) => {
        if (!flights || !Array.isArray(flights)) {
            console.error('Invalid flights data:', flights);
            return;
        }

        const minPrice = Math.min(...flights.map(f => parseFloat(f.displayFare) || 0));
        const maxPrice = Math.max(...flights.map(f => parseFloat(f.displayFare) || 0));

        set({
            flights,
            filteredFlights: flights,
            filters: {
                ...get().filters,
                priceRange: [minPrice, maxPrice]
            }
        });
    },

    // Update filters and apply filtering
    updateFilters: (newFilters) => {
        const state = get();
        const updatedFilters = { ...state.filters, ...newFilters };
        set({ filters: updatedFilters });

        let filtered = state.flights;

        // Filter by stops
        if (updatedFilters.stops.length > 0) {
            const stopsFiltered = filtered.filter(flight => {
                if (!flight || !flight.stopText) return false;
                const stopText = flight.stopText.toLowerCase();
                return updatedFilters.stops.some(stop => {
                    switch(stop) {
                        case 'Direct': return stopText.includes('direct') || stopText.includes('non stop');
                        case '1 Stop': return stopText.includes('1 stop');
                        case '2+ Stop': return stopText.includes('2 stop') || parseInt(stopText) > 2;
                        default: return false;
                    }
                });
            });

            // Only update filtered if we have results, otherwise keep current filters
            if (stopsFiltered.length > 0) {
                filtered = stopsFiltered;
            }
        }

        // Filter by price range
        if (updatedFilters.priceRange && updatedFilters.priceRange.length === 2) {
            const [minPrice, maxPrice] = updatedFilters.priceRange;
            filtered = filtered.filter(flight => {
                const price = parseFloat(flight.displayFare) || 0;
                return price >= minPrice && price <= maxPrice;
            });
        }

        // Filter by time slots
        if (updatedFilters.timeSlots.length > 0) {
            filtered = filtered.filter(flight => {
                if (!flight.departureTime) return false;

                try {
                    const [time] = flight.departureTime.split(' ');
                    const [hours] = time.split(':');
                    const hour = parseInt(hours);

                    return updatedFilters.timeSlots.some(slot => {
                        switch(slot) {
                            case 'early': return hour < 6;
                            case 'morning': return hour >= 6 && hour < 12;
                            case 'midday': return hour >= 12 && hour < 18;
                            case 'night': return hour >= 18;
                            default: return false;
                        }
                    });
                } catch (error) {
                    console.error('Error parsing time:', error);
                    return false;
                }
            });
        }

        set({ filteredFlights: filtered });
    },

    // Reset all filters
    resetFilters: () => {
        const state = get();
        const minPrice = Math.min(...state.flights.map(f => parseFloat(f.displayFare) || 0));
        const maxPrice = Math.max(...state.flights.map(f => parseFloat(f.displayFare) || 0));

        set({
            filters: {
                stops: [],
                priceRange: [minPrice, maxPrice],
                timeSlots: [],
                recommended: true
            },
            filteredFlights: state.flights
        });
    }
}));

export default useFlightStore;