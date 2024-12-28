import React, { useState } from 'react';
import { Card, Radio, Button, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const TravelDetails = ({ travellers, travelClass, onTravelClassChange, onTravellersChange }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTravellers, setSelectedTravellers] = useState({
        adults: travellers?.adults || 1,
        children: travellers?.children || 0,
        infants: travellers?.infants || 0
    });
    const [selectedTravelClass, setSelectedTravelClass] = useState(travelClass || 'Economy');

    const handleTravelClassChange = (e) => {
        const newClass = e.target.value;
        setSelectedTravelClass(newClass);
        if (onTravelClassChange) {
            onTravelClassChange(newClass);
        }
    };

    const handleTravellerCountChange = (type, action) => {
        try {
            const currentValue = selectedTravellers[type] || 0;
            let newValue;

            if (action === 'increase') {
                const maxLimits = {
                    adults: 9,
                    children: 8,
                    infants: selectedTravellers.adults
                };

                if (currentValue < maxLimits[type]) {
                    newValue = currentValue + 1;
                } else {
                    return;
                }
            } else {
                const minLimits = {
                    adults: 1,
                    children: 0,
                    infants: 0
                };

                newValue = Math.max(minLimits[type], currentValue - 1);
            }

            if (newValue !== currentValue) {
                const updatedTravellers = {
                    ...selectedTravellers,
                    [type]: newValue
                };

                setSelectedTravellers(updatedTravellers);
                if (onTravellersChange) {
                    onTravellersChange(updatedTravellers);
                }
            }
        } catch (error) {
            console.error('Error updating traveller count:', error);
        }
    };

    const buttonStyle = {
        width: '32px',
        height: '32px',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        color: '#ED7232',
        borderColor: '#ED7232',
        borderRadius: '6px',
    };

    const counterStyle = {
        margin: '0 12px',
        fontSize: '16px',
        minWidth: '20px',
        textAlign: 'center',
    };

    const travelerTypeStyle = {
        fontSize: '16px',
        fontWeight: '500',
        color: '#000',
    };

    const ageRangeStyle = {
        fontSize: '14px',
        color: '#666',
        marginTop: '4px',
    };

    return (
        <div>
            <div
                className="w-[200px]"
                onClick={() => setIsPopupOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                <div className="travel-details flex flex-col gap-2 justify-between">
                    <div className="text-sm">Travellers & Class</div>
                    <div className="travel-details-card font-semibold">
                        {selectedTravellers.adults + selectedTravellers.children} Traveller
                        {selectedTravellers.adults + selectedTravellers.children > 1
                            ? 's'
                            : ''}
                        , {selectedTravelClass}
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '52%',
                        transform: 'translate(-50%, -20%)',
                        width: '100%',
                        maxWidth: '400px',
                        padding: '24px',
                        background: '#fff',
                        border: '2px solid #ED7232',
                        borderRadius: '8px',
                        zIndex: 1000,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                >
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}
                        onClick={() => setIsPopupOpen(false)}
                    />

                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Travellers</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={travelerTypeStyle}>Adults</div>
                                <div style={ageRangeStyle}>12 Years or Above</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    onClick={() => handleTravellerCountChange('adults', 'decrease')}
                                    disabled={selectedTravellers.adults <= 1}
                                    style={{
                                        ...buttonStyle,
                                        ':hover': {
                                            backgroundColor: '#ED7232',
                                            color: '#fff',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    -
                                </Button>
                                <span style={counterStyle}>{selectedTravellers.adults}</span>
                                <Button
                                    onClick={() => handleTravellerCountChange('adults', 'increase')}
                                    disabled={selectedTravellers.adults >= 9}
                                    style={buttonStyle}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={travelerTypeStyle}>Children</div>
                                <div style={ageRangeStyle}>2 - 12 Years</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    onClick={() => handleTravellerCountChange('children', 'decrease')}
                                    disabled={selectedTravellers.children <= 0}
                                    style={buttonStyle}
                                >
                                    -
                                </Button>
                                <span style={counterStyle}>{selectedTravellers.children}</span>
                                <Button
                                    onClick={() => handleTravellerCountChange('children', 'increase')}
                                    disabled={selectedTravellers.children >= 8}
                                    style={buttonStyle}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={travelerTypeStyle}>Infants</div>
                                <div style={ageRangeStyle}>0 - 2 Years</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button
                                    onClick={() => handleTravellerCountChange('infants', 'decrease')}
                                    disabled={selectedTravellers.infants <= 0}
                                    style={buttonStyle}
                                >
                                    -
                                </Button>
                                <span style={counterStyle}>{selectedTravellers.infants}</span>
                                <Button
                                    onClick={() => handleTravellerCountChange('infants', 'increase')}
                                    disabled={selectedTravellers.infants >= selectedTravellers.adults}
                                    style={buttonStyle}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginTop: '24px', marginBottom: '20px' }}>Class</h3>

                    <Radio.Group
                        value={selectedTravelClass}
                        onChange={handleTravelClassChange}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            columnGap: "24px",
                            rowGap: "12px",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: selectedTravelClass === "Economy" ? "#F0F6FF" : "transparent",
                                padding: "0.2rem",
                                borderRadius: "20px",
                            }}
                        >
                            <Radio value="Economy" style={{ fontSize: "14px" }}>
                                Economy
                            </Radio>
                        </div>
                        <div
                            style={{
                                backgroundColor:
                                    selectedTravelClass === "Premium Economy" ? "#F0F6FF" : "transparent",
                                padding: "0.2rem",
                                borderRadius: "20px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <Radio value="Premium Economy" style={{ fontSize: "14px" }}>
                                Premium Economy
                            </Radio>
                        </div>
                        <div
                            style={{
                                backgroundColor: selectedTravelClass === "Business" ? "#F0F6FF" : "transparent",
                                padding: "0.2rem",
                                borderRadius: "20px",
                            }}
                        >
                            <Radio value="Business" style={{ fontSize: "14px" }}>
                                Business
                            </Radio>
                        </div>
                    </Radio.Group>
                </div>
            )}
        </div>
    );
};

export default TravelDetails;