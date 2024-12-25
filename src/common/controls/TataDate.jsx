import React, { useState } from 'react';

const TataDate = ({ header }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
    const [currentYear, setCurrentYear] = useState(2024);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsDatePickerOpen(false);
        console.log(date);
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateCalendar = () => {
        const days = daysInMonth(currentMonth, currentYear);
        return Array.from({ length: days }, (_, index) => index + 1);
    };

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const calendarDays = generateCalendar();

    return (
        <div className="w-full max-w-md mx-auto relative">
            <div
                className="p-4 bg-white shadow-md rounded-md cursor-pointer flex justify-between items-center"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
                <div>
                    <h2 className="text-sm text-gray-500 mb-1">{header || "Departure"}</h2>
                    <p className="text-lg font-semibold text-gray-800">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString(undefined, {
                            day: '2-digit', month: 'short', year: 'numeric'
                        }) : "Select a date"}
                    </p>
                </div>
                <div className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 18h14M7 15h.01M7 21h10m-2-6h.01" />
                    </svg>
                </div>
            </div>

            {isDatePickerOpen && (
                <div className="absolute top-full left-0 w-[30rem] mt-2 p-4 bg-white shadow-md rounded-md z-10">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handlePreviousMonth}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h3 className="text-lg font-semibold">
                            {new Date(currentYear, currentMonth).toLocaleDateString(undefined, {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </h3>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <div key={day} className="text-sm font-medium text-gray-500 text-center">
                                {day}
                            </div>
                        ))}
                        {calendarDays.map((day) => (
                            <button
                                key={day}
                                onClick={() => handleDateSelect(new Date(currentYear, currentMonth, day))}
                                className={`p-2 rounded-full hover:bg-orange-100 text-center ${
                                    selectedDate &&
                                    new Date(selectedDate).getDate() === day &&
                                    new Date(selectedDate).getMonth() === currentMonth &&
                                    new Date(selectedDate).getFullYear() === currentYear
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-800"
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TataDate;