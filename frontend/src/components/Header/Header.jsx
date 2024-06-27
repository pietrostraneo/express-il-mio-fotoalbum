// Importing styles
import styleHeader from './Header.module.scss';

// Importing Icons
import { MdOutlineSearch, MdOutlineBookmarkBorder } from "react-icons/md";
import { FaRegHeart, FaRegCompass } from "react-icons/fa";

// Importing hooks
import { useState } from 'react';

export default function Header() {

    const [search, setSearch] = useState('');

    return (
        <>
            <div className="container-fluid">
                <div className="row p-3 align-items-center">
                    <div className="col-12 d-flex justify-content-between align-items-center">

                        <div className="logo">
                            <img src="/logo.png" alt="logo" className={`img-fluid ${styleHeader.logo_img}`} />
                        </div>

                        <div className="nav d-flex gap-3">

                            <div className={`${styleHeader.searchbar}`}>
                                <MdOutlineSearch className={`${styleHeader.search_icon}`} />
                                <input type="text" name="search" id="search" placeholder='Search for inspiration…' value={search} onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                            </div>

                            <div className="buttons">
                                <ul className="d-flex gap-2 list-unstyled align-items-center justify-content-center m-0">
                                    <li className={`${styleHeader.nav_items}`}><FaRegCompass /></li>
                                    <li className={`${styleHeader.nav_items}`}><FaRegHeart /></li>
                                    <li className={`${styleHeader.nav_items}`}><MdOutlineBookmarkBorder /></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}