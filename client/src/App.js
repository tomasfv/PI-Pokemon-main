import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path= '/home' component={Home}/>
        <Route path='/pokemon' component={PokemonCreate}/>
        <Route path='/home/:id' component={PokemonDetail}/>     
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
