// Importing styles
import styleFeed from './Feed.module.scss';

// Importing dependencies
import { useEffect, useState } from 'react';
import axios from 'axios';

// Importing components
import Card from '../Card/Card.jsx';
import Loader from '../Loader/Loader.jsx';

// Defining API url
const Api = import.meta.env.VITE_API_URL;

export default function Feed() {

    const [photo, setPhoto] = useState([]);

    useEffect(() => {

        // Fetching all photos
        async function fetchPhotos() {
            try {
                let response = await axios.get(`${Api}/api/photos`);
                let data = response.data;
                let publishedPhoto = data.filter(d => d.visible === true)
                setPhoto(publishedPhoto);
            } catch (error) {
                console.error('Errore durante il fetch delle foto:', error);
            }
        }

        fetchPhotos();
    }, []);

    console.log(photo)
    return (
        <>
            <div className="container">
                <div className={`row align-content-center mt-4 flex-column gap-4 pb-5 ${styleFeed.slide_in_bottom}`}>
                    {photo.length > 0 ? (
                        photo.map((p, index) => (
                            <Card key={index} p={p} />
                        ))
                    ) : (
                        <div className="col-12 col-md-8 d-flex vh-100 justify-content-center align-items-center">
                            <Loader />
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}
