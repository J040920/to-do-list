# To-Do List

Uma aplicação web simples para gerenciar tarefas com interface amigável e backend Flask.

## Características

- ✅ Adicionar novas tarefas
- ✏️ Editar tarefas existentes
- 🗑️ Deletar tarefas
- 💾 Persistência de dados em MySQL
- 🎨 Interface responsiva com cards

## Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python Flask
- **Banco de Dados**: MySQL
- **Dependências**: `flask`, `mysql-connector-python`, `flask-cors`

## Instalação

### Pré-requisitos

- Python 3.7+
- MySQL Server instalado e rodando

### Passos

1. Clone ou baixe o projeto
2. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure o banco de dados executando [todo.sql](todo.sql):
   ```sql
   -- Execute no MySQL
   mysql -u seu_usuario -p < todo.sql
   ```

4. Atualize as credenciais do MySQL em [app.py](app.py):
   ```python
   DB_CONFIG = {
       'host': 'localhost',
       'user': 'seu_usuario',
       'password': 'sua_senha',
       'database': 'todo_db'
   }
   ```

## Como Usar

1. Inicie o servidor Flask:
   ```bash
   python app.py
   ```

2. Abra [todo.html](todo.html) no navegador (ou acesse `http://localhost:5000` se configurar para servir o arquivo)

3. Adicione, edite ou delete suas tarefas

## Estrutura do Projeto

```
to-do-list/
├── app.py              # Backend Flask com APIs
├── todo.html           # Página principal
├── todo.js             # Lógica do frontend
├── todo.css            # Estilos
├── todo.sql            # Script de banco de dados
└── requirements.txt    # Dependências Python
```

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks` | Retorna todas as tarefas |
| POST | `/tasks` | Cria uma nova tarefa |
| PUT | `/tasks/<id>` | Atualiza uma tarefa |
| DELETE | `/tasks/<id>` | Deleta uma tarefa |

## Notas

- O servidor roda em `http://127.0.0.1:5000` por padrão
- CORS está habilitado para permitir requisições do frontend
- As tarefas são ordenadas por ID em ordem decrescente (mais recentes primeiro)