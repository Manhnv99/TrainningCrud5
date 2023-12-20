import '../scss/error.scss'

const Error=({message})=>{
    return(
        <>
            <div className="toast__container">
                <div className="toast__icon">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div className="toast__body">
                    <div className="toast__title">
                        <p>Warning</p>
                    </div>
                    <div className="toast__message">
                        <span>{message}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error