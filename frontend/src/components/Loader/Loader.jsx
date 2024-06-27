// Importing styles
import styleLoader from './Loader.module.scss'

export default function Loader() {
    return (
        <>
            <span className={`${styleLoader.loader}`}></span>
        </>
    )
}