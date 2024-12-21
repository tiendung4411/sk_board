import React, { useEffect, useState } from 'react';
import './NumberContainer.css'; // Import the CSS file for animations

const NumberContainer = ({ numbers, bingoNumbers, animateNumber }) => {
    const [previousNumbers, setPreviousNumbers] = useState([]);

    useEffect(() => {
        if (numbers.length !== previousNumbers.length) {
            setPreviousNumbers(numbers);
        }
    }, [numbers, previousNumbers]);

    // Dynamically calculate size based on the list length
    const calculateSize = () => {
        if (numbers.length < 10) return 255; // Size for fewer than 5 numbers
        if (numbers.length < 18) return 205; // Size for 5–9 numbers
        if (numbers.length < 25) return 155; // Size for 10–14 numbers
        return 125; // Size for 10 or more numbers
    };

    const containerStyles = {
        border: '3px solid white',
        padding: '20px',
        borderRadius: '10px',
        margin: '0px 0',
        minHeight: '700px',
        flex: 2,
    };

    const gridStyles = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    };

    const size = calculateSize();

    return (
        <div className="right-section" style={containerStyles}>
            <div style={gridStyles}>
                {numbers.slice().reverse().map((number, index) => {
                    const isLatestNumber = index === 0;
                    const isHighlighted = bingoNumbers.includes(number);
                    const isAnimated = isLatestNumber && animateNumber;

                    const numberStyles = {
                        borderRadius: '20px',
                        padding: '10px',
                        margin: '10px',
                        textAlign: 'center',
                        width: `${size}px`,
                        height: `${size}px`,
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 155, 100, 0.2)',
                        color: isLatestNumber || isHighlighted ? 'white' : 'black',
                        justifyContent: 'center',
                        fontSize: `${Math.max(size * 0.7, 30)}px`, // Dynamically adjust font size
                        animation: isAnimated ? 'bounce 0.5s ease-out' : 'none',
                    };

                    return (
                        <div key={index} style={numberStyles}>
                            {number}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NumberContainer;