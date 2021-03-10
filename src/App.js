import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import carregando from '../src/images/Spinner-1s-64px.gif'

//JSX Java Script Extension
function App(){
  const [pessoas, setPessoas] = useState([])
  const [carregando, Setcarregando] = useState(false)

function ListaPessoas(){
  const listagemPessoas = pessoas.map((pessoa)=>
  <img key={pessoa.id} src={pessoa.urls[4][512]} title="Gerada por IA"
    alt="Gerado por IA" />
  )
  return (
    <> {listagemPessoas}</>
  )
}

  async function obterFoto(){
    Setcarregando(true)
    let url = "https://api.generated.photos/api/v1/faces?api_key=7eLbLsAyGZDJO8fauA7ftA"
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setPessoas(data.faces)
      console.log('Dados carregados com sucesso')
    })
    .catch(function (error) {
      console.error('Houve um problema na requisição'+error.message)
    })
    Setcarregando(false)
  }

  return(
    <div class="App">
      <h1>Gerador de Fotos via IA</h1>
      <Robot />
      {carregando &&
      <img src={carregando} title="Aguarde..." alt="Aguarde, dados sendo carregados" />
      }
      <div className="fotos">
      <ListaPessoas />
      </div>
      <button type='button' onClick={obterFoto}>
        Obter imagens
      </button>
    </div>
  )
}
export default App