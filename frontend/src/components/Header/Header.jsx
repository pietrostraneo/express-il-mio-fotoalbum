import styleHeader from './Header.module.scss';

export default function Header() {
    return (
        <>
            <div className="container-fluid">
                <div className="row p-3 align-items-center">
                    <div className="col-12 d-flex justify-content-between align-items-center">

                        <div className="logo">
                            <img src="/logo.png" alt="logo" className={`img-fluid ${styleHeader.logo_img}`} />
                        </div>

                        <div className="nav">
                            <ul className="d-flex list-unstyled">
                                <li className="nav-item"></li>
                                <li className="nav-item"></li>
                                <li className="nav-item"></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}