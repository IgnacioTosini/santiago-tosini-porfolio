import type { ReactNode } from 'react';
import './_aboutCard.scss';

interface Props {
    icon: ReactNode;
    title: string;
}

export const AboutCard = ({ icon, title }: Props) => {
    return (
        <div className="aboutCard">
            {icon}
            <h3>{title}</h3>
        </div>
    )
}
