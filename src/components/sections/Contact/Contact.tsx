'use client';

import { Title } from '@/components/ui/Title/Title';
import { IoMail } from 'react-icons/io5';
import './_contact.scss';

export const Contact = () => {
    return (
        <div className="contact" id="contact">
            <div className="contactContainer">
                <Title title={'Creemos algo'} span={'juntos'} />
                <p className='contactDescription'>Si tu marca quiere llegar a una audiencia apasionada por el fútbol, hablemos.</p>
                <div className="contactButtons">
                    <button className='contactButton' onClick={() => window.location.href = 'mailto:example@example.com'}><IoMail /> <span>Email</span></button>
                </div>
            </div>
        </div>
    )
}
