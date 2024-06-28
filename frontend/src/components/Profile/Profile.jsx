import { useEffect, useState } from 'react';
import styleProfile from './Profile.module.scss';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import MiniCard from '../MiniCard/MiniCard';
import Loader from '../Loader/Loader';

export default function Profile() {

    const api = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState({});
    const [userPhoto, setUserPhoto] = useState({});
    const { username } = useParams();

    useEffect(() => {

        async function fetchUser() {
            try {
                const user = await axios.get(`${api}/api/users/${username}`)
                setUser(user.data)
            } catch (error) {
                console.log(error);
            }

        }

        async function fetchPhotos() {
            try {
                let response = await axios.get(`${api}/api/photos`);
                let data = response.data;
                let filteredData = data.filter(d => d.User.username === username)
                setUserPhoto(filteredData)

            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
        fetchPhotos();

    }, [username])

    return (
        <>
            <div className="container">
                <div className={`row mt-5 justify-content-center pb-5`}>

                    <div className={`col-md-8 col-12 mb-5 d-flex justify-content-center ${styleProfile.slide_in_top}`}>
                        <nav className={`${styleProfile.navbar} px-4`}>
                            <ul className={`list-unstyled d-flex gap-5`}>
                                <li><NavLink to="">Profile</NavLink></li>
                                <li><NavLink to="">Settings</NavLink></li>
                                <li><NavLink to="">Help</NavLink></li>
                            </ul>
                        </nav>
                    </div>

                    <div className={`col-md-8 col-12 d-flex gap-2 justify-content-evenly mb-5 ${styleProfile.scale_in_center}`}>

                        <img src={`http://localhost:3000/uploads/user/${user.image}`} alt={user.username} className={`${styleProfile.img}`} />

                        <div className="info">
                            <h1 className='fw-medium'>{user.username}</h1>

                            <div className="stats mt-5">

                                <div className="photos text-center">
                                    <p className={`${styleProfile.stats}`}>Photos</p>
                                    <p className={`${styleProfile.stats}`}>{userPhoto.length}</p>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className={`col-md-8 col-12 justify-content-center d-flex flex-wrap gap-1 ${styleProfile.scale_in_center}`}>
                        {userPhoto.length > 0 ? (<>
                            {
                                userPhoto.map((photo) => (
                                    <MiniCard p={photo} />
                                ))
                            }
                        </>

                        ) : (<Loader />)}
                    </div>
                </div>
            </div>
        </>
    )
}