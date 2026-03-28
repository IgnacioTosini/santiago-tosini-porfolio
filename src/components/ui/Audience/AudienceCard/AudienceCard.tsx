import './_audienceCard.scss';

interface Props {
    title: string;
    subtitle: string;
    data: { label: string; value: number; }[]
    valueType?: 'percentage' | 'number';
}

export const AudienceCard = ({ title, subtitle, data, valueType = 'percentage' }: Props) => {
    const maxValue = data.reduce((max, item) => Math.max(max, item.value), 0);

    return (
        <div id='sym:AudienceCard' className="audienceCard">
            <div className="audienceCardHeader">
                <h3>{title}</h3>
                <p className='audienceCardSubtitle'>{subtitle}</p>
            </div>
            <ul className="audienceBarList">
                {data.map((item) => (
                    <li key={item.label} className="audienceBarItem">
                        <div className="audienceBarMeta">
                            <span className="audienceBarLabel">{item.label}</span>
                            <span className="audienceBarValue">
                                {valueType === 'percentage'
                                    ? `${item.value}%`
                                    : new Intl.NumberFormat('es-AR').format(item.value)}
                            </span>
                        </div>
                        <div className="audienceBarTrack">
                            <div
                                className="audienceBarFill"
                                style={{
                                    width: `${valueType === 'percentage'
                                        ? Math.max(0, Math.min(item.value, 100))
                                        : (maxValue > 0 ? Math.max(0, Math.min((item.value / maxValue) * 100, 100)) : 0)}%`,
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
