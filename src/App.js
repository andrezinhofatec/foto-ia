import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import carregando from '../src/images/Spinner-1s-64px.gif'

//JSX Java Script Extension
function App(){
  const [pessoas, setPessoas] = useState([])
  const [carregando, Setcarregando] = useState(false)
  const [idade, setIdade] = useState('')
  const [etnia, setEtnia] = useState('')

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
    let chaveAPI = process.env.REACT_APP_APIKEY
    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
    const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''
    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}&order_by=random`
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
      <div className="linha">
        <ListaPessoas />
      </div>

      <div className="linha">
        <label>Idade:</label>
        <select onChange={event => setIdade(event.target.value)}>
          <option value="">Todas</option>
          <option value="infantil">infantil</option>
          <option value="child">Criança</option>
          <option value="young-adult">Jovem</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Idoso</option>
        </select>
        <label>Etnia:</label>
        <select onChange={e => setEtnia(e.target.value)}>
          <option value="">Todas</option>
          <option value="White">Branco</option>
          <option value="Latino">Latino</option>
          <option value="Asian">Asiático</option>
          <option value="Black">Negro</option>
        </select>
      </div>

      <div className="linha">
        <button type='button' onClick={obterFoto}>
          Obter imagens
        </button>
        {pessoas.length > 0 &&
        <button type='button' onClick={() => setPessoas([])}>
        Limpar imagens
        </button>
        }
      </div>
    </div>
  )
}
export default App