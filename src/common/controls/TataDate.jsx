import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import './style.css';

const TataDate = ({ header = "Departure", value, onChange }) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(value);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (onChange) {
            onChange(date);
        }
        setIsDatePickerOpen(false);
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendarDays = () => {
        const days = daysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const blanks = Array(firstDay).fill(null);
        const daysArray = Array.from({ length: days }, (_, i) => i + 1);
        return [...blanks, ...daysArray];
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

    const formatDate = (date) => {
        if (!date) return "Select a date";
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="relative w-full">
            {/* Date Display */}
            <div
                className="tata-date-input p-3 shadow-sm cursor-pointer"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{header}</span>
                    </div>
                    <div className="text-xl font-semibold">
                        {selectedDate ? formatDate(selectedDate) : "Select a date"}
                    </div>
                </div>
            </div>

            {/* Calendar Popup */}
            {isDatePickerOpen && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg z-50 w-[320px]">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={handlePreviousMonth}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-sm font-medium">
                            {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                            })}
                        </h3>
                        <button
                            onClick={handleNextMonth}
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Weekday Headers */}
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div key={day} className="text-xs font-medium text-gray-500 text-center p-2">
                                {day}
                            </div>
                        ))}

                        {/* Calendar Days */}
                        {generateCalendarDays().map((day, index) => (
                            <div key={index} className="text-center">
                                {day && (
                                    <button
                                        onClick={() => handleDateSelect(new Date(currentYear, currentMonth, day))}
                                        className={`w-8 h-8 rounded-full text-sm 
                                            ${selectedDate &&
                                        new Date(selectedDate).getDate() === day &&
                                        new Date(selectedDate).getMonth() === currentMonth &&
                                        new Date(selectedDate).getFullYear() === currentYear
                                            ? 'bg-orange-500 text-white'
                                            : 'hover:bg-orange-100'
                                        }`}
                                    >
                                        {day}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TataDate;