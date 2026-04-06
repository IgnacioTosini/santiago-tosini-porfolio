import { Sponsor } from '@/mocks/sponsorsData.mock';
import './_sponsorCard.scss';

interface Props {
    sponsor: Sponsor;
}

export const SponsorCard = ({ sponsor }: Props) => {
    return (
        <div className="sponsorCard">
            <div className="sponsorLogo">
                {sponsor.logoUrl}
            </div>
        </div>
    )
}
