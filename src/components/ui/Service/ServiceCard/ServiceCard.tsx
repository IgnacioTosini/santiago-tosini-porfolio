import React from 'react';
import './_serviceCard.scss';

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const ServiceCard = ({ icon, title, description }: Props) => {
    return (
        <div className="serviceCard">
            {icon}
            <h3 className="serviceCardTitle">{title}</h3>
            <p className="serviceCardDescription">{description}</p>
        </div>
    )
}
