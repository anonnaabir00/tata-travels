import React from 'react';

const FlightCard = () => {
    return (
        <div className="w-full mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <img
                            src="/indigo-logo.png"
                            alt="IndiGo"
                            className="w-10 h-10 object-contain"
                        />
                        <div>
                            <span className="text-sm text-gray-600">IndiGo</span>
                            <p className="text-xs text-gray-500">6GH2GDR2</p>
                        </div>
                    </div>
                    <div className="text-2xl font-bold">
                        <span className="text-gray-400">$</span>
                        <span>2648</span>
                    </div>
                </div>

                {/* Flight Details Section */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">Bangalore</h2>
                        <p className="text-gray-600">2:23 PM</p>
                    </div>

                    <div className="flex flex-col items-center px-4">
                        <div className="text-gray-400 flex items-center gap-2">
                            <img
                                src="/clock-icon.png"
                                alt="Duration"
                                className="w-4 h-4"
                            />
                            <span className="text-sm">2h 20m</span>
                        </div>
                        <div className="w-32 h-px bg-gray-300 relative">
                            <img
                                src="/plane-icon.png"
                                alt="Plane"
                                className="w-4 h-4 absolute -top-2 right-0 transform rotate-90"
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-right">
                        <h2 className="text-xl font-semibold">Chennai</h2>
                        <p className="text-gray-600">2:23 PM</p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center">
                    <button className="flex items-center text-orange-500 text-sm font-medium">
                        Flight Details
                        <img
                            src="/chevron-right.png"
                            alt=">"
                            className="w-4 h-4 ml-1"
                        />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                            <img
                                src="/lock-icon.png"
                                alt="Lock"
                                className="w-4 h-4"
                            />
                            <input
                                type="text"
                                placeholder="TUDSD45F"
                                className="bg-transparent text-sm w-24 outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="text-green-500 text-sm">Get it For $ 550</div>
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">40% Off</span>
                        </div>

                        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg flex items-center">
                            Book Flight
                            <img
                                src="/chevron-right.png"
                                alt=">"
                                className="w-4 h-4 ml-1"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;