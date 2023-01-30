import React from "react";
import style from "./Paginado.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"
export default function Paginado({
  pokemonsPerPage,
  allPokemons,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        {currentPage !== 1 && (
          <li className={style.liPaginado}>
            <button
              className={style.buttonPaginado}
              onClick={() => paginado(--currentPage)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </li>
        )}
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li className={style.paginadoLi} key={number}>
                <button
                  className={style.buttonPaginado}
                  onClick={() => paginado(number)}
                >
                  {number}
                </button>
              </li>
            );
          })}
        {currentPage !== pageNumbers.length && (
          <li className={style.liPaginado}>
            <button
              className={style.buttonPaginado}
              onClick={() => paginado(++currentPage)}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
