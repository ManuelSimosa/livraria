# Servidor de Livraria

## Funcionalidades
- Serviço para login
- Não é possível acessar os outros serviços sem realizar o login. 
- Serviço para exibir uma lista com todos os livros cadastrados, com opção para pesquisa
- Serviço para exibir detalhes de um livro
- Serviço para permitir alugar um livro
- Não permite alugar um livro já alugado
- Serviço para cadastro, edição e remoção de livros
- Não permite editar e remover livros que estão alugados

## Rotas
**Login**
- *Criar novo usuario:* 
  - O type 1 é para Administrador e o 0 para usuarios normais.
  - method: 'POST', 
    url: 'http://localhost:3001/login/new', 
    headers: {'Content-Type': 'application/json'}, 
    data: {
      type: 1, 
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      token: ''
    }

- *Authenticar usuario:*
  - method: 'POST',
    url: 'http://localhost:3001/login/auth',
    headers: {'Content-Type': 'application/json'},
    data: {email: '', password: ''}

**Livros**
- *Criar novo livro:* 
  - Ao criar, o numero de "stock" deve ser igual a "quant"
  - method: 'POST',
    url: 'http://localhost:3001/books/',
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    },
    data: {
      title: '',
      author: '',
      relDate: '',
      stock: 10,
      genre: '',
      quant: 10
    }

- *Listar Livros com e sem termo de pesquisa:*
  - O body é opcional pro termo de pesquisa
  - method: 'GET',
    url: 'http://localhost:3001/books/',
    params: {'': ''},
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    }

  - method: 'GET',
    url: 'http://localhost:3001/books/',
    params: {'': ''},
    headers: {
        'Content-Type': 'application/json',
        user_id: 'id_Aministrador',
        token: 'token_Aministrador'
    },
    data: {genre: 'Novela'}

- *Editar Livro:*
  - method: 'PUT',
    url: 'http://localhost:3001/books/id/id_livro',
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    },
    data: {
      title: '',
      author: '',
      relDate: '',
      stock: 10,
      genre: '',
      quant: 10
    }

- *Obter livro pelo id:*
  - method: 'GET',
    url: 'http://localhost:3001/books/id/:id_livro',
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    }

- *Deletar livro:*
  - method: 'DELETE',
    url: 'http://localhost:3001/books/id/:id_livro',
    headers: {
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    }

**Usuarios**
- *Listar usuarios:*
  - method: 'GET',
    url: 'http://localhost:3001/users/',
    params: {'': ''},
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    }

- *Editar Usuario:*
  - method: 'PUT',
    url: 'http://localhost:3001/users/id/:id_usuario',
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    },
    data: {
        type: 1, 
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        token: ''
    }

- *Obter usuario pelo id:*
  - method: 'GET',
    url: 'http://localhost:3001/users/id/:id_usuario',
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    }

- *Deletar Usuario:*
    - method: 'DELETE',
  url: 'http://localhost:3001/users/id/:id_usuario',
  headers: {
    user_id: 'id_Aministrador',
    token: 'token_Aministrador'
  }

**Alugueis**
- *Alugar um livro:*
  - method: 'POST',
    url: 'http://localhost:3001/rents/id/:id_livro',
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    },
    data: {renterId: 'id_UsuarioNormal'}

- *Listar alugueis:*
  - method: 'GET',
    url: 'http://localhost:3001/rents/',
    headers: {
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    }

- *Retornar um livro*
  - method: 'PUT',
    url: 'http://localhost:3001/rents/return/id/:id_livro',
    headers: {
      'Content-Type': 'application/json',
      user_id: 'id_Aministrador',
      token: 'token_Aministrador'
    },
    data: {renterId: 'id_UsuarioNormal'}


## Testes
Para teste: `mocha -timeout 10000`

A serie de testes automatizados tem a seguinte sequencia:
   
    ✓ Registrar novo usuario (Administrador) - Sucesso
    ✓ Registrar novo usuario (Normal) - Sucesso
    ✓ Registrar novo usuario (Segundo Normal) - Sucesso
    ✓ Login (Administrador) - Sucesso
    ✓ Login (Usuario Normal) - Sucesso
    ✓ Inserir Livro (Casas Muertas) - Sucesso
    ✓ Inserir livro (Pantaleon y las visitadoras) - Sucesso 
    ✓ Ver livro - Sucesso
    ✓ Alugar livro - Sucesso
    ✓ Alugar livro - erro "livro não está em stock"
    ✓ Editar livro - erro "Não está em stock"
    ✓ Retornar livro - successo
    ✓ Editar livro - Sucesso
    ✓ Deletar livro - Sucesso
    ✓ Listar livros - Sucesso
    ✓ Listar livros por genero - Sucesso