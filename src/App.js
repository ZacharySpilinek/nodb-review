import React, {Component} from 'react';
import './App.css';
import Header from './components/Header'
import Finder from './components/Finder'
import Pokedex from './components/Pokedex'
import axios from 'axios'
import ashVoice from './assets/ashketchum.m4a'

class App extends Component {
  constructor(){
    super()
    this.state = {
      pokemonCaught: [],
      pokemonLogo: 'https://fontmeme.com/permalink/190904/f87c04db0b54e3b89caa3d1d3ee405fb.png'
    }
    /* this.catchPokemon = this.catchPokemon.bind(this) */
  }

  componentDidMount() {
    axios.get('/api/pokemon').then(res => {
      this.setState({pokemonCaught: res.data})
    })
  }

  catchPokemon = (body) => {
    axios.post(`/api/pokemon`, body).then(res => {
      this.setState({
        pokemonCaught: res.data
      })
    })
  }

  saveName = (id, body) => {
    axios.put(`/api/pokemon/${id}`, body).then(res => {
      this.setState({pokemonCaught: res.data})
    })
  }

  releasePokemon = (id) => {
    axios.delete(`/api/pokemon/${id}`).then(res => {
      this.setState({
        pokemonCaught: res.data
      })
    })
  }

  render() {
    const talk = new Audio(ashVoice)
    return (
      <div className="App">
        <Header image={this.state.pokemonLogo}/>
        <Finder catchFn={this.catchPokemon}/>
        <h2 onClick={() => talk.play()}>Pokédex</h2>
        <Pokedex pokemonList={this.state.pokemonCaught} saveFn={this.saveName} releaseFn={this.releasePokemon}/>
      </div>
    );
  }
}

export default App;
