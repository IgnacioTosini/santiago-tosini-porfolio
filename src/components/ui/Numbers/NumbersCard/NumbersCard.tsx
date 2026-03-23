import React from 'react';
import './_numbersCard.scss';

interface Props {
    icon: React.ReactNode;
    value: string;
    title: string;
    label: string;
}

export const NumbersCard = ({ icon, value, title, label }: Props) => {
    return (
        <div className="numbersCard">
            {icon}
            <h3>{value}</h3>
            <h4>{title}</h4>
            <p>{label}</p>
        </div>
    )
}
