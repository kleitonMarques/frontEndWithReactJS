import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      const repository = response.data
      setRepositorys(repository)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: 'http://nodeetals',
      techs: 'node sim'
    })

    const newRepository = response.data
    setRepositorys([...repositorys, newRepository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
    setRepositorys(repositorys.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
