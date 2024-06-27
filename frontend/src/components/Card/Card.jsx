// Importing styles
import styleCard from './Card.module.scss'

// Importing Icons
import { FaRegShareSquare, FaRegHeart } from "react-icons/fa";

export default function Card({ p }) {
    return (
        <>
            <div className={`col-4 ${styleCard.card}`}>
                <article>

                    <figure>
                        <img src={`http://localhost:3000/uploads/photos/${p.image}`} alt={p.title} className="img-fluid" />
                    </figure>

                    <section className='d-flex justify-content-between'>

                        <h4>{p.title}</h4>

                        <div className="buttons">
                            <ul className="d-flex gap-3 list-unstyled align-items-center m-0">
                                <li className={`${styleCard.like} fs-5`}><FaRegHeart /></li>
                                <li className={`fs-5`}><FaRegShareSquare /></li>
                            </ul>
                        </div>

                    </section>

                    <section className='mb-3'>
                        <div className="categories d-flex gap-2 flex-wrap">
                            {p.Category.map((c, index) => (
                                < span key={index} className={`${styleCard.categories} px-3 fw-medium`}>{c.name}</span>
                            ))}
                        </div>
                    </section>

                    <article>
                        <p><b>{p.User.username}</b> {p.description}</p>
                    </article>


                </article>
            </div >
        </>
    )
}