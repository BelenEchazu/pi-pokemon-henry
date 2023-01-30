import React from "react";
import { NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";
const LandingPage = () => {
  return (
    <>
      <div className={style.bodyLandingPage}>
        <div className={style.titleContainer}>
          <div className={style.linkContainer}>
            <h1 className={style.titleLandingPage}>POKEMON</h1>
            <br />
            <p className={style.p}>
              BIENVENIDOS A ESTA AVENTURA
            </p><br />
            <NavLink className={style.btnLandingPage} to="/home">
              EMPEZAR
            </NavLink>
          </div>
          <div className={style.imgContainer}>
            <img
              className={style.img}
              src=" "
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingPage;
