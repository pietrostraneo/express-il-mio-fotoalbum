import { useState } from 'react';
import styleMini from './MiniCard.module.scss';
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function MiniCard({ p }) {

    const [overlay, setOverlay] = useState(false);

    const handleOverlay = () => {
        setOverlay(!overlay);
    }

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/photo/${p.id}`)
    }

    return (
        <>
            <div className={`${styleMini.card}`} onMouseEnter={handleOverlay} onMouseLeave={handleOverlay}>
                <img src={`http://localhost:3000/uploads/photos/${p.image}`} alt={p.title} />
                <div className={`${styleMini.overlay} text-white ${overlay ? 'd-flex' : 'd-none'}`} onClick={handleNavigate}>
                    <FaEye className='fs-1' />
                </div>
            </div>
        </>
    )
}