import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Form from "./components/Form/Form.jsx";
import EditPokemon from "./components/EditPokemon/EditPokemon";
import axios from "axios";
axios.defaults.baseURL='http://localhost:3001/';
function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/edit/:id" component={EditPokemon}></Route>
      <Route exact path="/home/:id" component={Detail}></Route>
      <Route exact path="/form">
        <Form />
      </Route>
    </div>
  );
}

export default App;
