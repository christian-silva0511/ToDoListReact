import {useRef, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

type Produto = {
  id: string
  nome: string
}

function Home() { 
  const [produtos, setProdutos] = useState<Produto[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [mensagemErro, setMensagemErro] = useState('')
  

  function cliqueiNoBotao(){
    const inputEl = inputRef.current
    const valor = inputEl?.value.trim() ?? ''

    if(valor === ''){
      setMensagemErro('Você precisa digitar algo!')
      return
    }

    if (!inputEl) {
      return
    }

    setMensagemErro('')
    setProdutos([{id: uuidv4(), nome: inputEl.value}, ...produtos])
    inputEl.value = ''
  }

  function deletarProduto(id: string){
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
            <button onClick={() => deletarProduto(produto.id)}>❌</button>
          </li>
        ))
      }
      </ul>
    </div>
    
  )
}

export default Home
