import React from 'react';
import { useSelector } from 'react-redux';
import style from "./Error.module.css"
const Error=()=>{
    const reload=()=>{
        window.location.reload()
    }
    const error=useSelector(state=>state.error)
    return(
        <div className={style.errorBackground}>
        <h1 className={style.titleError}>Lo siento, ha ocurrido un error</h1>
        <h4>{error}</h4>
        <br />
        <p className={style.textError}>Vuelve a casa por favor</p>
        <button className={style.buttonError} onClick={reload}>Volver a Home</button>
        </div>
        
    )
}
export default Error;