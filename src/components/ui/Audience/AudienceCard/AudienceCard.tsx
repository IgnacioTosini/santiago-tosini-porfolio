import './_audienceCard.scss';

interface Props {
    title: string;
    subtitle: string;
    data: { label: string; value: number; }[]
}

export const AudienceCard = ({ title, subtitle, data }: Props) => {
    return (
        <div className="audienceCard">
            <div className="audienceCardHeader">
                <h3>{title}</h3>
                <p className='audienceCardSubtitle'>{subtitle}</p>
            </div>
            <ul className="audienceBarList">
                {data.map((item) => (
                    <li key={item.label} className="audienceBarItem">
                        <div className="audienceBarMeta">
                            <span className="audienceBarLabel">{item.label}</span>
                            <span className="audienceBarValue">{item.value}%</span>
                        </div>
                        <div className="audienceBarTrack">
                            <div className="audienceBarFill" style={{ width: `${item.value}%` }} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
