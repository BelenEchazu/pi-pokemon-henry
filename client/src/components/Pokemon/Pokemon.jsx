import { NavLink } from "react-router-dom";
import "./Pokemon.css";
export const Pokemon = ({ name, image, types, id }) => {
  return (
    <>
      <NavLink className="pokemonContainer" to={`/home/${id}`}>
        <h3 className="pokemonTitle">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
        <img className="pokemonImg" src={image} alt="ImageCard" />
        {types.map((type) => (
          <div key={type.name} className="type">
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </div>
        ))}
      </NavLink>
    </>
  );
};
export default Pokemon;
