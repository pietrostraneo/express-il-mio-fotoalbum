// Importing Styles
import styleCreate from './CreatePhoto.module.scss'

import { MdArrowBackIosNew } from "react-icons/md";

import axios from '../../apiClient.js'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePhoto() {

    const Api = import.meta.env.VITE_API_URL
    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    const [category, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState([]);

    const [data, setData] = useState({
        title: '',
        description: '',
        image: null,
        visible: false,
        categories: []
    });

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(`${Api}/api/categories`)
                setCategories(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (categoryId) => {
        setCategorySelected((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter(id => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('visible', data.visible);
        formData.append('categories', JSON.stringify(categorySelected));
        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        try {
            await axios.post(`${Api}/api/photos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate(`/`);
        } catch (error) {
            console.error(error);
        }
    }

    const updateData = (key, newValue) => {
        setData(d => ({ ...d, [key]: newValue }));
    };

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5 justify-content-center">

                    <div className="col-md-8 col-12 mb-5 d-flex justify-content-between align-items-center">
                        <h1 className="fw-bold flex-wrap w-75">Upload new Photo</h1>
                        <span className={`${styleCreate.buttons}`} onClick={handleBack} ><MdArrowBackIosNew /></span>
                    </div>

                    <div className="col-12 col-md-8 pb-5 text-center">

                        <form onSubmit={handleSubmit} method="post">

                            <div className="mb-3">
                                <label htmlFor="title" className="form-label fs-5 fw-medium d-block">Title</label>
                                <input
                                    type="text"
                                    className={`${styleCreate.input}`}
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => updateData('title', e.target.value)}
                                />
                            </div>

                            <div className="mb-3">

                                <label htmlFor="image" className="form-label fs-5 fw-medium d-block">Image</label>

                                {preview && <img src={preview} alt='preview' className={`${styleCreate.img} mb-3`} />}

                                <input
                                    type="file"
                                    name="image"
                                    className={`${styleCreate.input}`}
                                    id="image"
                                    onChange={(e) => { updateData('image', e.target.files[0]); handleImageChange(e) }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className='form-label fs-5 fw-medium d-block'>Description</label>
                                <textarea
                                    className={`${styleCreate.input} ${styleCreate.description_input}`}
                                    id="description"
                                    rows="10"
                                    value={data.description}
                                    onChange={(e) => updateData('description', e.target.value)}
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="categories" className='form-label fs-5 fw-medium d-block'>Categories</label>
                                <div className={`d-flex flex-wrap gap-2 justify-content-center`}>

                                    {category.map((c) => (
                                        <div key={c.id}>
                                            <input
                                                type="checkbox"
                                                id={`category-${c.id}`}
                                                value={c.id}
                                                checked={categorySelected.includes(c.id)}
                                                onChange={() => handleCategoryChange(c.id)}
                                            />
                                            <label htmlFor={`category-${c.id}`}>{c.name}</label>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="checkbox"
                                    id='visible'
                                    checked={Boolean(data.visible)}
                                    onChange={(e) => updateData('visible', e.target.checked)}
                                />
                                <label htmlFor='visible'><b>Published?</b></label>
                            </div>

                            <button type="submit" className="btn btn-outline-primary w-50">Submit</button>

                        </form>

                    </div>
                </div>
            </div >
        </>
    )
}