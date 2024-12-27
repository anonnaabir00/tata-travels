import { useState, useEffect } from 'react';

const FlightDate = () => {
    // Get today's date at midnight for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [startIndex, setStartIndex] = useState(0);

    // Generate dates for the carousel
    useEffect(() => {
        const generateDates = () => {
            const datesArray = [];
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            // Generate next 90 days starting from today
            for (let i = 0; i < 90; i++) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + i);
                datesArray.push(date);
            }

            setDates(datesArray);
        };

        generateDates();
    }, []);

    // Handle next dates
    const handleNext = () => {
        if (startIndex + 12 < dates.length) {
            setStartIndex(startIndex + 1);
        }
    };

    // Handle previous dates
    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    // Format date for display
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    };

    // Format month for display
    const formatMonth = (date) => {
        return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    };

    // Check if date is selected
    const isSelected = (date) => {
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    // Check if date is today
    const isToday = (date) => {
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg shadow mb-4">
            <div className="flex items-center p-2 overflow-hidden">
                {/* Month indicator */}
                <div className="flex flex-col items-center justify-center px-4 py-2 bg-gray-50 rounded-lg mr-2">
          <span className="text-xs text-gray-500">
            {dates[startIndex] ? formatMonth(dates[startIndex]) : ''}
          </span>
                    <span className="text-2xl font-semibold">
            {dates[startIndex]?.getDate()}
          </span>
                </div>

                {/* Previous button */}
                <button
                    onClick={handlePrevious}
                    className={`p-2 rounded-lg mr-2 ${
                        startIndex === 0
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                    }`}
                    disabled={startIndex === 0}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeWidth={2}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>

                {/* Date carousel */}
                <div className="flex-1 flex items-center space-x-2 overflow-hidden">
                    {dates.slice(startIndex, startIndex + 12).map((date) => (
                        <button
                            key={date.toISOString()}
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[48px] transition-all
                ${isSelected(date) ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'}
                ${isToday(date) ? 'ring-1 ring-orange-500' : ''}`}
                        >
              <span className="text-xs opacity-75">
                {formatDate(date)}
              </span>
                            <span className="text-lg font-semibold">
                {date.getDate()}
              </span>
                        </button>
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={handleNext}
                    className={`p-2 rounded-lg ml-2 ${
                        startIndex + 12 >= dates.length
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                    }`}
                    disabled={startIndex + 12 >= dates.length}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeWidth={2}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FlightDate;