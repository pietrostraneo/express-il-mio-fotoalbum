// Importing styles
import styleCard from './Card.module.scss'

// Importing Icons
import { FaRegShareSquare, FaRegHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../apiClient.js'

export default function Card({ p }) {

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/photo/${p.id}`)
    }

    const [overlay, setOverlay] = useState(false);

    const handleOverlay = () => {
        setOverlay(!overlay);
    }

    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData)

    function checkUser() {
        if (user) {
            if (user.username === p?.User?.username) {
                return true
            } else {
                return false
            }
        }
        return false
    }


    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/photo/edit/${p.id}`)
    }

    async function deletePhoto() {
        try {
            await axios.delete(`http://localhost:3000/api/photos/${p.id}`,);
            navigate('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }


    return (
        <>
            <div className={`col-4 ${styleCard.card} position-relative`}>
                <article>

                    {p?.image && <figure>
                        <img src={`http://localhost:3000/uploads/photos/${p.image}`} alt={p.title} className="img-fluid" onClick={handleNavigate} />
                    </figure>}

                    <section className='d-flex justify-content-between'>

                        <h4>{p.title}</h4>

                        <div className="buttons">
                            <ul className="d-flex gap-3 list-unstyled align-items-center m-0">
                                <li className={`${styleCard.like} fs-5`}><FaRegHeart /></li>
                                <li className={`fs-5`}><FaRegShareSquare /></li>
                                {checkUser() && <>
                                    <li className={`fs-5`} onClick={handleOverlay}><BsThreeDotsVertical /></li>
                                </>}
                            </ul>
                        </div>

                    </section>

                    <section className='mb-3'>
                        <div className="categories d-flex gap-2 flex-wrap">
                            {p?.Category && p.Category.map((c, index) => (
                                < span key={index} className={`${styleCard.categories} px-3 fw-medium`}>{c.name}</span>
                            ))}
                        </div>
                    </section>

                    <article>
                        <p><Link to={`/user/${p?.User?.username}`}><b>{p?.User?.username}</b></Link> {p.description}</p>
                    </article>


                </article>

                <div className={`${styleCard.overlay} gap-2 text-white ${overlay ? 'd-flex' : 'd-none'}`} onClick={handleNavigate}>
                    <button className='btn btn-warning w-50' onClick={handleEdit}>Edit</button>
                    <button className='btn btn-danger w-50' onClick={deletePhoto}>Delete</button>
                </div>

            </div >
        </>
    )
}