import styleHeader from './Header.module.scss';

export default function Header() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex justify-content-between">

                        <div className="logo">
                            <img src="https://github.com/pietrostraneo/express-il-mio-fotoalbum/blob/main/frontend/src/assets/logo.png" alt="logo" className='img-fluid' />
                        </div>

                        <div className="nav">
                            <h1 className={`${styleHeader.test}`}>TEST</h1>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}