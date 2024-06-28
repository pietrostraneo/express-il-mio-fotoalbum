import { useParams } from 'react-router-dom';
import stylePhoto from './SinglePhoto.module.scss'

import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SinglePhoto() {

    const [photo, setPhoto] = useState(null);
    const Api = import.meta.env.VITE_URL_API;
    const { id } = useParams();

    useEffect(() => {

        // Fetching all photos
        async function fetchPhotos() {
            try {
                let response = await axios.get(`http://localhost:3000/api/photos/${id}`);
                let data = response.data;
                setPhoto(data);
            } catch (error) {
                console.error('Errore durante il fetch delle foto:', error);
            }
        }

        fetchPhotos();
    }, [id]);

    console.log(photo)
    return (<>
        <div className="container">
            <div className={`row align-content-center mt-4 flex-column gap-4 pb-5 ${stylePhoto.scale_in_center}`}>
                {photo ? (

                    <Card p={photo} />

                ) : (
                    <div className="col-12 col-md-8 d-flex vh-100 justify-content-center align-items-center">
                        <Loader />
                    </div>
                )
                }
            </div>
        </div>
    </>)
}