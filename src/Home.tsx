import {useRef, useState} from 'react'
import {v4} from 'uuid'

 

function Home() { 
  const [produtos, setProdutos] = useState([])
  const inputRef = useRef()
  const [mensagemErro, setmensagemErro] = useState('')
  

  function cliqueiNoBotao(){
    const valor = inputRef.current.value.trim()
    

    if(valor === ''){
      setmensagemErro('Você precisa digitar algo!')

    }else{
      setmensagemErro('')
      setProdutos([{id: v4(), nome: inputRef.current.value}, ...produtos])
      inputRef.current.value = ''
    }
  }

  function deletarProduto(id){
    setProdutos(produtos.filter(produto => produto.id !== id))
  }

  return (
    <div className='tarefas'>
      <h1>Lista de tarefas</h1>
      <div className="campos">
        <input className="form-control" type="text" placeholder="Tarefa..." ref={inputRef} onKeyDown={(event) => {
        if (event.key === 'Enter') {
          cliqueiNoBotao()
        }
        }} />

        <button type="button" className="btn btn-primary adicionar" onClick={cliqueiNoBotao}>Adicionar</button>
      </div>
      {mensagemErro && <div className="alert alert-danger" role="alert">{mensagemErro}</div>}

      
      <ul className='lista'>
      {produtos.map( produto => (
          <li key={produto.id} className='item-lista'>
            <div>{produto.nome}</div>
            <button onClick={() => deletarProduto(produto.id)}>Deletar</button>
          </li>
        ))
      }
      </ul>
    </div>
    
  )
}

export default Home
