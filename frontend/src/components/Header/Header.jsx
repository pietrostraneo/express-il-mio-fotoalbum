// Importing components
import Dropdown from './Dropdown/Dropdown.jsx'

// Importing styles
import styleHeader from './Header.module.scss';

// Importing Icons
import { MdOutlineSearch, MdOutlineBookmarkBorder, MdArrowLeft, MdArrowDropDown } from "react-icons/md";
import { FaRegHeart, FaRegCompass, FaUser, FaPlus } from "react-icons/fa";

// Importing middlewares
import checkLogin from '../../middlewares/checkLogin';

// Importing 
import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";

export default function Header() {

    const [search, setSearch] = useState('');

    const loginStatus = checkLogin();
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData)

    const [drop, setDrop] = useState(false);

    const handleDropdown = () => {
        setDrop(() => {
            return !drop;
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row p-3 align-items-center">
                    <div className="col-12 d-flex justify-content-between align-items-center">

                        <div className="logo w-50">
                            <img src="/logo.png" alt="logo" className={`img-fluid ${styleHeader.logo_img}`} />
                        </div>

                        <div className="nav d-flex gap-3">

                            <div className={`${styleHeader.searchbar}`}>
                                <MdOutlineSearch className={`${styleHeader.search_icon}`} />
                                <input type="text" name="search" id="search" placeholder='Search for inspiration…' value={search} onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                            </div>

                            <div className="buttons d-flex gap-3">

                                {/* Explore - Liked - Bookmarks */}
                                <ul className="d-flex gap-2 list-unstyled align-items-center justify-content-center m-0">
                                    <li className={`${styleHeader.nav_items}`}><FaRegCompass /></li>
                                    <li className={`${styleHeader.nav_items}`}><FaRegHeart /></li>
                                    <li className={`${styleHeader.nav_items}`}><MdOutlineBookmarkBorder /></li>
                                </ul>

                                {/* User */}
                                <ul className="d-flex gap-2 list-unstyled align-items-center justify-content-center m-0">
                                    {loginStatus ? (<>
                                        <li className={`${styleHeader.nav_items}`}><Link to='/photo/create'><FaPlus /></Link></li>
                                        <li className='position-relative'>
                                            <img src={`http://localhost:3000/uploads/user/${user.image}` || 'https://i.pravatar.cc/300'} alt={user.username} className={`img-fluid ${styleHeader.profile_pic}`} onClick={() => {
                                                handleDropdown()
                                            }} />
                                            {drop ? (<>
                                                <MdArrowDropDown className='fs-3' />
                                                <Dropdown />

                                            </>
                                            ) : (<MdArrowLeft className='fs-3' />)}

                                        </li>
                                    </>) : (<>

                                        <li className={`${styleHeader.nav_items}`}><Link to="/login"><FaUser /></Link></li>
                                    </>)}
                                </ul>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}