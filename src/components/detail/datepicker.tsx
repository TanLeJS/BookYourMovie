import React, { useState } from 'react';
import './styles.scss'; // Import the CSS file

const dates = [
    { id: 25, day: 'Today' },
    { id: 26, day: 'Fri' },
    { id: 27, day: 'Sat' },
    { id: 28, day: 'Sun' },
    { id: 29, day: 'Mon' },
    { id: 30, day: 'Tue' },
    { id: 31, day: 'Wed' },
    { id: 1, day: 'Thu' },
    { id: 2, day: 'Fri' },
    { id: 3, day: 'Sat' },
    { id: 4, day: 'Sun' },
];

const DatePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const handleClick = (id: number) => {
        setSelectedDate(id);
    };

    return (
        <div className="datePicker">
            {dates.map(date => (
                <div
                    key={date.id}
                    className={`customButton ${selectedDate === date.id ? 'selected' : ''}`}
                    onClick={() => handleClick(date.id)}
                >
                    <div className="span1">{date.day}</div>
                    <div className="span2">{date.id}</div>
                </div>
            ))}
        </div>
    );
};

export default DatePicker;
