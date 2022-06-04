<h1>Test Backend Nodejs - Aluguel de Livors</h1>


<h1>Objetivo</h1>
<p align="justify">
  Desenvolver uma aplicação em backend para alugar livros.
</p>


<h1>Visão Geral</h1>
<p align="justify">
  A aplicação consiste em alugar livros para clientes com alguns controles de não pertimir aludar um livro já alugado, não poder editar e deletar um livro alugado, controle de retorno do livro com data de previsão e caso atrase é aplicado uma taxa de 1% sobre o valor do aluguel e somente pertir o acesso a aplicação com usuário autenticado por login e senha.
</p>

<h1>Modelo ER do Banco de dados</h1>

![myimage-alt-tag](https://pdf-service-lucidchart-com.s3.amazonaws.com/4da3edf1-1213-49d5-b59b-3b5b285aa937?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCrarTKCC0PmaQDOpxO0wr20eFezuWI0qEEqTxVACvM2AIgfEoNQDVa7QWBJl7dX3UfKVrnsfQmOjyR8NuYuBqvrg8q2wQIk%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5MzU2MDY5MjYxODIiDCBJfMBTX3DQ90jcjSqvBI7g677%2FGlxc9rOaQBGvmwtdTobQAxmVY9ROwjfiCvU48SH0RW6sR1Z%2BvAyQGbsFJO0SExwSn1tgRu6aE1k4DgITlfhIGG2Ln6wHKHd8O2yohU29l361tyIPmKOFXiacoNPxkdNQXo5j9iVJWAagrQFgm0ExHhe2yXpzVOzCQy%2FUdh8k4t0B7EEgW6ujJsHmVmA1JsY%2B4QiU%2BJsQOy18fNzsUXd1L2roc6YfCV33SnabMjefLNDTicEm3oro85TlwNRFNA9iytftXlf8Lc4nfBXBeQZLYdaSXpPcBeNFmIQf6l2JtSYy6YiRJii%2BhGrWAAtrefYoJdY%2Fx8W6ekKmjf9x%2BOK%2F%2FOIquWeOPGCs%2FUsVIFoTe%2FMZB30bBc4%2Bkgy2qJhm7AMkCP%2F9f5Zg9oQ905wIZS%2FSr4DDgya5OpvG3dhqQwAMN1TUskB8XaToc%2F8vv0PEedlgmhkw9BJuF0Kx4DGYqWN6IuVR5i04Z0nsNfIZsYvLUSTuoO5jml%2F4vNaJRcE2MmYF%2Bvr56%2FID5U%2F6%2BA6TKSsCy2W93dSlvm%2FZF4m9Jdpj1Ov%2BM1GcqMMZHKjdYd9FsQC8cwXABTKBYP7PoUJ5VxmqdzMV8N4kbqZ%2FKiZt8NNS7V0VE3SZhU9KlZc5aK9Z8UNJGIz3r8dMAt%2F49QjNGrYeVDapLVsBKdl7T10JwEicMa78mj%2FSKBRDgXrCd4M9eifTr0g9AuyBHSCRIdWHtPAGXppLcFB5fnsdo5YwmLfulAY6qQGmVv1FTjkty1BJ7GSCSlEDg%2FlMVYUfN04rbR42fYMjji74ykyh9OeX%2FY%2FI6eaTsVopCzOEKUtD5PROyFGrk94TzBZy6H%2FfUiTduUEPdCYbfi3YVd2V7HsGIkFzWoNb30uKIZva0NZwrK9dC4BvZYNLgeEnd0AjRxs%2FPy3NYq7EOizJqNH3aXHZwFQsTPKi5GlWslg7cLpgDfKP%2FI1nHZMEcx7UZaq%2FEKRl&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220604T185613Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=ASIA5TVUEXNTFY7JYEXA%2F20220604%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e7875a0d7416a867ae2f3b86c6a97135739d1da1d374c607a89be4b1019d41a7)

<h1>Endpoints</h1>

<p align="justify">
  BaseUrl: http://localhost:3345
</p>

<h3>Módulo "Users"</h3>
<p align="justify">
  Módulo de usuários que necessitam de autenticação por login gerando um token para acessar a os outros endpoints da aplicação e poder operar suas funcionalidades.
</p>

<h4>Enviar nova senha</h4>
<p align="justify">
  Irá enviar um e-mail com um link e token para resetar a senha. Para o teste é necessário somente pegar o token do link para inserir no proóximo endpoint "/reset" para mudar a senha.
</p>
<p align="justify">
  Método: POST
  Path: /password/user/forgot

  Request Body:

  ```json
  {
    username: string;
  }
  ```

  Retorno Status 204.
</p>

<h4>Mudar a senha</h4>
<p align="justify">
  Método: POST
  Path: /password/user/reset

  Request Body:

  ```json
  {
    password: string;
    password_confirmation: string;
    token: string;
  }
  ```

  Retorno Status 204.
</p>

<h4>Login</h4>
<p align="justify">
  Autenticação com token para acessar todos os endpoints da aplicação.
</p>
<p align="justify">
  Método: POST
  Path: /sessions/user

  Request Body:

  ```json
  {
    username: string;
    password: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    user: {
      id: string,
      files_id: string,
      username: string,
      name: string,
      email: string,
      created_at: timestamp,
      updated_at: timestamp,
      file: {
        id: string;
        file_url: string;
      }
    },
    token: string;
  }
  ```

</p>

<h4>Criar usuário</h4>
<p align="justify">
  Método: POST
  Autenticação: Authorization: Bearer token
  Path: /user

  Request Body:

  ```json
  {
    files_id: string;
    username: string required;
    name: string required;
    email: string required;
    password: string required;
    password_confirmation: string required;
  }
  ```

  Retorno JSON:

  ```json
  {
    id: string;
  }
  ```

</p>

<h4>Atualizar usuário</h4>
<p align="justify">
  Método: PUT
  Autenticação: Authorization: Bearer token
  Path: /user

  Request Body:

  ```json
  {
    users_id: string required;
    username: string required;
    name: string required;
    email: string required;
  }
  ```

  Retorno JSON:

  ```json
  {
    id: string required;
  }
  ```

</p>

<h4>Deletar usuário</h4>
<p align="justify">
  Não é permitido deletar o usuário principal.
</p>
<p align="justify">
  Método: DELETE
  Autenticação: Authorization: Bearer token
  Path: /user/:id

  Params:

  ```json
  {
    id: string required;
  }
  ```

  Retorno Status 204
</p>

<h4>Lista de usuários</h4>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /user/

  Query:

  ```json
  {
    search_username: string;
    search_name: string;
    sort_field: string;
    sort_order: string;
    page: string;
    rowsperpage: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    users [Array]: [
      {
        id: string,
        files_id: string,
        username: string,
        name: string,
        email: string,
        created_at: timestamp,
        updated_at: timestamp,
        file: {
          id: string;
          file_url: string;
        }
      }
    ],
    userstotal: number
  }
  ```

</p>

<h4>Exibe detalhes do usuário</h4>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /user/show/:id

  Params:

  ```json
  {
    id: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    user: {
      id: string,
      files_id: string,
      username: string,
      name: string,
      email: string,
      created_at: timestamp,
      updated_at: timestamp,
      file: {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h4>Atualizar avatar do usuário</h4>
<p align="justify">
  Método: PATCH
  Autenticação: Authorization: Bearer token
  Path: /user/avatar

  Query:

  ```json
  {
    filesid: string - (caso já exista alguma imagem atribuir o id do arquivo na query);
  }
  ```

  Multipart Form:

  ```json
  {
    file: caminho do arquivo;
    users_id: string - (id do usuário);
  }
  ```

  Retorno JSON:

  ```json
  {
    user: {
      id: string,
      files_id: string,
      username: string,
      name: string,
      email: string,
      created_at: timestamp,
      updated_at: timestamp,
      file: {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h3>Módulo "Customers"</h3>
<p align="justify">
  São os clientes que poderão alugar os livros.
</p>

<h4>Criar cliente</h4>
<p align="justify">
  Método: POST
  Autenticação: Authorization: Bearer token
  Path: /customer

  Request Body:

  ```json
  {
    files_id: string;
    name: string required;
    email: string required;
    cellphone: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    customer: {
      id: string;
      files_id: string;
      name: string;
      email: string;
      cellphone: string;
      created_at: timestamp;
      updated_at: timestamp;
    }
  }
  ```

</p>

<h4>Atualizar cliente</h4>
<p align="justify">
  Método: PUT
  Autenticação: Authorization: Bearer token
  Path: /customer

  Request Body:

  ```json
  {
    customers_id: string required;
    name: string required;
    email: string required;
    cellphone: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    customer: {
      id: string;
      files_id: string;
      name: string;
      email: string;
      cellphone: string;
      created_at: timestamp;
      updated_at: timestamp;
      file: null | {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h4>Deletar cliente</h4>
<p align="justify">
  Não é permitido deletar cliente com livro alugado.
</p>
<p align="justify">
  Método: DELETE
  Autenticação: Authorization: Bearer token
  Path: /customer/:id

  Params:

  ```json
  {
    id: string required;
  }
  ```

  Retorno Status 204
</p>

<h4>Lista de Clientes</h4>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /customer/

  Query:

  ```json
  {
    search_name: string;
    search_email: string;
    search_cellphone: string;
    sort_field: 'name' | 'email' | 'cellphone';
    sort_order: 'ASC' | 'DESC';
    page: number;
    rowsperpage: number;
  }
  ```

  Retorno JSON:

  ```json
  {
    customers [Array]: [
      {
        id: string,
        files_id: string,
        name: string,
        email: string,
        cellphone: string,
        created_at: timestamp,
        updated_at: timestamp,
      }
    ],
    customerstotal: number
  }
  ```

</p>

<h4>Exibe detalhes do cliente</h4>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /customer/show/:id

  Params:

  ```json
  {
    id: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    customer: {
      id: string,
      files_id: string,
      name: string,
      email: string,
      cellphone: string,
      created_at: timestamp,
      updated_at: timestamp,
      file: null | {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h4>Atualizar avatar do cliente</h4>
<p align="justify">
  Método: PATCH
  Autenticação: Authorization: Bearer token
  Path: /customer/avatar

  Query:

  ```json
  {
    filesid: string - (caso já exista alguma imagem atribuir o id do arquivo na query);
  }
  ```

  Multipart Form:

  ```json
  {
    file: caminho do arquivo;
    customers_id: string - (id do cliente);
  }
  ```

  Retorno JSON:

  ```json
  {
    customer: {
      id: string,
      files_id: string,
      name: string,
      email: string,
      cellphone: string,
      created_at: timestamp,
      updated_at: timestamp,
      file: {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h3>Módulo "Books"</h3>
<p align="justify">
  Módulo de cadastro dos livros para aluguel.
</p>

<h4>Cadastrar livro</h4>
<p align="justify">
  Método: POST
  Autenticação: Authorization: Bearer token
  Path: /book

  Request Body:

  ```json
  {
    files_id: string;
    title: string required;
    description: string required;
    author: string required;
    year_edition: number required;
    number_edition: number required;
    year: number required;
    language: string required;
    country: string required;
    pages: number;
    weight: number;
    lease_value: number;
    status: boolean;
  }
  ```

  Retorno JSON:

  ```json
  {
    book: {
      id: string,
      files_id: string;
      title: string required;
      description: string required;
      author: string required;
      year_edition: number required;
      number_edition: number required;
      year: number required;
      language: string required;
      country: string required;
      pages: number;
      weight: number;
      lease_value: number;
      status: boolean;
      created_at: timestamp,
      updated_at: timestamp
    }
  }
  ```

</p>

<h4>Atualizar livro</h4>
<p align="justify">
  Não é permitido editar livro se está alugado.
</p>
<p align="justify">
  Método: PUT
  Autenticação: Authorization: Bearer token
  Path: /book

  Request Body:

  ```json
  {
    books_id: string required;
    title: string required;
    description: string required;
    author: string required;
    year_edition: number required;
    number_edition: number required;
    year: number required;
    language: string required;
    country: string required;
    pages: number;
    weight: number;
    lease_value: number;
    status: boolean;
  }
  ```

  Retorno JSON:

  ```json
  {
    book: {
      id: string,
      files_id: string;
      title: string required;
      description: string required;
      author: string required;
      year_edition: number required;
      number_edition: number required;
      year: number required;
      language: string required;
      country: string required;
      pages: number;
      weight: number;
      lease_value: number;
      status: boolean;
      file: null | {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h4>Deletar livro</h4>
<p align="justify">
  Não é permitido deletar livro se está alugado.
</p>
<p align="justify">
  Método: DELETE
  Autenticação: Authorization: Bearer token
  Path: /customer/:id

  Params:

  ```json
  {
    id: string required;
  }
  ```

  Retorno Status 204
</p>

<h4>Lista de livros</h4>
<p align="justify">
  Lista os livros para escolha do cliente alugar.
</p>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /book/

  Query:

  ```json
  {
    search_title: string;
    search_author: string;
    search_year_edition: string;
    search_number_edition: string;
    search_year: string;
    search_language: string;
    search_country: string;
    search_status: 'habilitado' | 'desabilitado' | '';
    sort_field: 'title' | 'author' | 'year_edition' | 'number_edition' | 'year' | 'language' | 'country' | 'status';
    sort_order: 'ASC' | 'DESC';
    page: string;
    rowsperpage: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    books [Array]: [
      {
        id: string,
        files_id: string;
        title: string required;
        description: string required;
        author: string required;
        year_edition: number required;
        number_edition: number required;
        year: number required;
        language: string required;
        country: string required;
        pages: number;
        weight: number;
        lease_value: number;
        status: boolean;
        created_at: timestamp,
        updated_at: timestamp,
        file: null | {
          id: string;
          file_url: string;
        }
      }
    ],
    bookstotal: number
  }
  ```

</p>

<h4>Exibe detalhes do livro</h4>
<p align="justify">
  Visualiza os detalhes do livro para obter mais informações.
</p>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /book/show/:id

  Params:

  ```json
  {
    id: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    book: {
      id: string,
      files_id: string;
      title: string required;
      description: string required;
      author: string required;
      year_edition: number required;
      number_edition: number required;
      year: number required;
      language: string required;
      country: string required;
      pages: number;
      weight: number;
      lease_value: number;
      status: boolean;
      created_at: timestamp,
      updated_at: timestamp,
      file: null | {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h4>Atualizar avatar do livro</h4>
<p align="justify">
  Não é permitido editar a imagem do livro se está alugado.
</p>
<p align="justify">
  Método: PATCH
  Autenticação: Authorization: Bearer token
  Path: /book/image

  Query:

  ```json
  {
    filesid: string - (caso já exista alguma imagem atribuir o id do arquivo na query);
  }
  ```

  Multipart Form:

  ```json
  {
    file: caminho do arquivo;
    books_id: string - (id do livro);
  }
  ```

  Retorno JSON:

  ```json
  {
    book: {
      id: string,
      files_id: string;
      title: string required;
      description: string required;
      author: string required;
      year_edition: number required;
      number_edition: number required;
      year: number required;
      language: string required;
      country: string required;
      pages: number;
      weight: number;
      lease_value: number;
      status: boolean;
      created_at: timestamp,
      updated_at: timestamp,
      file: null | {
        id: string;
        file_url: string;
      }
    }
  }
  ```

</p>

<h3>Módulo "Book Rental"</h3>
<p align="justify">
  Módulo de aluguel de livros controlando quem levou, quando levou, a data de previsão de retorno, quando retorno, o valor e se teve atraso a taxa por atraso.
</p>

<h4>Alugar livro para o cliente</h4>
<p align="justify">
  Enquanto o livro estiver alugado, não pode ter uma outra operação de aluguel no mesmo período, não pode excluir ou editar o livro e não pode excluir o cliente.
</p>
<p align="justify">
  Método: POST
  Autenticação: Authorization: Bearer token
  Path: /book-rental

  Request Body:

  ```json
  {
    customers_id: string required;
    books_id: string required;
    lease_value: number;
  }
  ```

  Retorno JSON:

  ```json
  {
    bookrental: {
      id: string;
      customers_id: string;
      books_id: string;
      withdrawal_date: timestamp;
      expected_return_date: timestamp;
      return_date: timestamp;
      lease_value: number;
      late_fee: number;
      total: number;
      created_at: timestamp;
      updated_at: timestamp;
    }
  }
  ```

</p>

<h4>Retorno do livro</h4>
<p align="justify">
  Ao retornar o livro é verificado se há atrasos para aplicar a taxa configurada estaticamente em @config/bookRentalSetting.ts e se já houve baixa no retorno do mesmo.
</p>
<p align="justify">
  Método: PUT
  Autenticação: Authorization: Bearer token
  Path: /book-rental/return

  Request Body:

  ```json
  {
    book_rentals_id: string required;
  }
  ```

  Retorno JSON:

  ```json
  {
    bookrental: {
      id: string;
      customers_id: string;
      books_id: string;
      withdrawal_date: timestamp;
      expected_return_date: timestamp;
      return_date: timestamp;
      lease_value: number;
      late_fee: number;
      total: number;
      created_at: timestamp;
      updated_at: timestamp;
    }
  }
  ```

</p>

<h4>Listar alugueis</h4>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /book-rental/

  Query:

  ```json
  {
    search_customers: string;
    search_books: string;
    search_withdrawal_date_start: string;
    search_withdrawal_date_end: string;
    search_return_date_start: string;
    search_return_date_end: string;
    select_only_withdrawn_books: 'yes' | 'no';
    select_only_returned_books: 'yes' | 'no';
    sort_field: 'title' | 'name' | 'withdrawal_date' | 'return_date';
    sort_order: 'ASC' | 'DESC';
    page: string;
    rowsperpage: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    bookrentals [Array]: [
      {
        id: string;
        customers_id: string;
        books_id: string;
        withdrawal_date: timestamp;
        expected_return_date: timestamp;
        return_date: timestamp;
        lease_value: number;
        late_fee: number;
        total: number;
        created_at: timestamp;
        updated_at: timestamp;
        customer: {
          id: string,
          files_id: string,
          name: string,
          email: string,
          cellphone: string,
          created_at: timestamp,
          updated_at: timestamp,
        },
        book: {
          id: string;
          files_id: string;
          title: string required;
          description: string required;
          author: string required;
          year_edition: number required;
          number_edition: number required;
          year: number required;
          language: string required;
          country: string required;
          pages: number;
          weight: number;
          lease_value: number;
          status: boolean;
          created_at: timestamp,
          updated_at: timestamp
        }
      },
    ],
    bookstotal: number
  }
  ```

</p>

<h4>Exibe detalhes do aluguel</h4>
<p align="justify">
  Método: GET
  Autenticação: Authorization: Bearer token
  Path: /book-rental/show/:id

  Params:

  ```json
  {
    id: string;
  }
  ```

  Retorno JSON:

  ```json
  {
    bookrental: {
      id: string;
      customers_id: string;
      books_id: string;
      withdrawal_date: timestamp;
      expected_return_date: timestamp;
      return_date: timestamp;
      lease_value: number;
      late_fee: number;
      total: number;
      created_at: timestamp;
      updated_at: timestamp;
    }
  }
  ```

</p>


<h1>Middlewares</h1>
<p align="justify">
  A aplicação contem um middleware de autenticação de login do usuário. A autenticação ocorre por verificação do username, da senha criptografada e do token gerado pela biblioteca JWT.
</p>


<h1>Funcionalidades</h1>

  :heavy_check_mark: CRUD de usuários;

  :heavy_check_mark: CRUD de clientes;

  :heavy_check_mark: CRUD de livros;

  :heavy_check_mark: Aluguel de livros para os clientes;

  :heavy_check_mark: Listagem dos alugueis com filtros de pesquisa;

  :heavy_check_mark: Autenticação por login e token;

  :heavy_check_mark: Recuperação de senha enviada por email com validação por token;

  :heavy_check_mark: Upload de imagens utilizando a biblioteca multer;


<h1>Ferramentas Utilizadas</h1>
<p align=justify>
  Para o desenvolvimento desta aplicação utilizamos:
</p>

  :heavy_check_mark:Node Js;

  :heavy_check_mark:Typescript;

  :heavy_check_mark:Jest para testes unitários;

  :heavy_check_mark:Docker/Docker Compose;

  :heavy_check_mark:TypeORM utilizando banco de dados postgres;

  :heavy_check_mark:ESLint/Prettier;


<h1>Principais Bibliotecas do Projeto</h1>
<p align="justify">
  As libs (bibliotecas) são conjuntos de funcionalidades que são instaladas no projeto da aplicação para resolver problemas específicos, são elas:
</p>

  :heavy_check_mark:JsonWebToken: para geração e autenticação de token;

  :heavy_check_mark:BCryptJS: para criptografia;

  :heavy_check_mark:Cors;

  :heavy_check_mark:Date-Fns: para manuseio de datas;

  :heavy_check_mark:Multer: para manipulação de arquivos;

  :heavy_check_mark:Reflect-Metadata: uso de Decorators na aplicação;

  :heavy_check_mark:TSyringe: para injeções de dependências;

  :heavy_check_mark:Celebrate: para fazer validação dos campos;

  :heavy_check_mark:Handlebars: para criação do layout do e-mail com base em html;

  :heavy_check_mark:Nodemailer: possibilita o envio de e-mail para um usuário.


<h1>Como rodar a aplicação</h1> :arrow_forward:
<p align="justify">
  <strong>Passo 1:</strong> Em seu terminal, clone o projeto:
</p>

```
git clone https://github.com/rszaneti/book-rental-test
```

<p align="justify">
  <strong>Passo 2:</strong> Acessando a pasta digite o comando: <docker-compose up -d> para instalação do container. (Partimos do princípio que já está com o docker instalado no computador/notebook).
</p>

<p align="justify">
  <strong>Passo 3:</strong> Execute o comando no CLI do container criado "test-softdesing-node": <yarn typeorm migration:run> para criar a base de dados no postgres.
</p>

<p align="justify">
  <strong>Passo 4:</strong> Execute o comando no CLI do container criado "test-softdesing-node": <yarn seed:run> para criar o usuário principal da aplicação este denominado como {usernam: 'admin', password: 'admin'}.
</p>

<p align="justify">
  <strong>Passo 5:</strong> Utilize alguma ferramenta para testar as rotas como Insomnia ou Postman. Em anexo ao projeto na pasta ./src/assest/insomnia está o arquivo exportado com as rotas para teste.
</p>

<h1>Como rodar os testes</h1>
<p align="justify">
  <strong>Passo 1:</strong> Em seu terminal, clone o projeto:.
</p>

```
git clone https://github.com/rszaneti/book-rental-test
```

<p align="justify">
  <strong>Passo 2:</strong> Em seu terminal, na pasta raiz do projeto execute o comando npm/yarn test.
</p>

<h1>Melhorias</h1>
<p align="justify">
  Abaixo uma descrição das melhorias que podem ser implementadas na aplicação:
</p>

:memo: Criação de perfil do cliente com acesso por login para poder ver seus alugueis de livros e o que gastou;

:memo: Poder alugar por um site os livros e receber em casa por uma empresa de trasnporte;

:memo: Poder renovar o aluguel caso não termine no prazo de devolução;
