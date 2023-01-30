import React from "react";
import "./Detail.css";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePokemon, getPokemonById } from "../../redux/actions.js";


const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemonDetail = useSelector((state) => state.pokemonDetail);
  const handleDelete = (event) => {
    dispatch(deletePokemon(pokemonDetail.id));
    alert("Se ha eliminado correctamente el pokemon");
    history.push("/home");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getPokemonById(id));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (
    pokemonDetail.hasOwnProperty("name") &&
    (pokemonDetail.id === parseInt(id) || pokemonDetail.id === id)
  ) {
    return (
      <>
        <div className="bodyDetail">
          <div className="NavLinkContainerDetail">
            <NavLink className="NavLinkDetail" to="/home">
              Volver a Home
            </NavLink>
          </div>
          <div className="pokemonContainer">
            <h1 className="pokemonTitle">
              {pokemonDetail.name.charAt(0).toUpperCase() +
                pokemonDetail.name.slice(1)}
            </h1>
            <img className="pokemonImg" src={pokemonDetail.image} alt="" />
            <p className="p-item">Hp: {pokemonDetail.hp}</p>
            <p className="p-item">Attack: {pokemonDetail.attack}</p>
            <p className="p-item">Defense: {pokemonDetail.defense}</p>
            <p className="p-item">Speed: {pokemonDetail.speed}</p>
            <div>
              <p className="p-item">Height: {pokemonDetail.height}</p>
              <p className="p-item">Weight: {pokemonDetail.weight}</p>
            </div>
            <p className="span-item">
              Types:
              {pokemonDetail.types.map((type) => {
                return (
                  <span key={type.name} className="type">
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </span>
                );
              })}</p>
               {pokemonDetail.createdInDb && (
              <div>
                <button className="buttonDelete" onClick={(event) => handleDelete(event)}>Delete</button>
                <NavLink className="buttonEdit" to={`/edit/${pokemonDetail.id}`}>Edit</NavLink>
              </div>
            )}
            
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="loadingContainer">
        <div className="container">
            <h1 className="loadingH2">Loading...</h1>
        <img
          className="loadingImg"
          src=""
          alt=""
        />
      </div>
        </div>
      
    );
  }
};

export default Detail;