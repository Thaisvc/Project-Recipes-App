
# Recipes App 🍽️📱

Projeto de estudo desenvolvido durante a formação em **Desenvolvimento Web da Trybe**.  
Uma aplicação de receitas onde você pode buscar, filtrar e acompanhar instruções de preparo de comidas e drinks — tudo com **React** e boas práticas de front-end.

---

## 💡 Sobre

O *Recipes App* é uma aplicação web de receitas que permite ao usuário:

✔️ Buscar receitas por nome, ingrediente ou categoria  
✔️ Filtrar por tipo (comida ou bebida)  
✔️ Ver detalhes completos de uma receita  
✔️ Acompanhar o preparo passo a passo  
✔️ Marcar como **favorita**  
✔️ Ver receitas recomendadas  
✔️ Continuar preparo interrompido

Esse projeto reforça conceitos de estados, rotas, efeitos, lógica de filtros e consumo de APIs.

---

## 🛠 Tecnologias utilizadas

- **React**
- **JavaScript / JSX**
- **React Router**
- **CSS (ou Styled Components)**
- APIs públicas (TheMealDB, TheCocktailDB)
- HTML5

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Thaisvc/Project-Recipes-App.git
cd Project-Recipes-App
````

### 2. Instale as dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 3. Inicie o projeto

```bash
npm start
```

ou

```bash
yarn start
```

A aplicação será aberta em:

```
http://localhost:3000
```

---

## 📌 Funcionalidades

### 🔎 Busca de receitas

Permite encontrar receitas por:

* Nome
* Ingrediente
* Primeira letra


### 🍛 Filtros por categoria

Na página principal, o usuário pode escolher categorias como:

* Beef
* Chicken
* Dessert
  *(exemplos, depende da API utilizada)*



### 📖 Detalhes da receita

Em cada receita você encontra:

* Lista de ingredientes
* Instruções de preparo
* Imagem e categoria
* Botões de favoritar e compartilhar



### 🧠 Progresso de preparo

Ao iniciar uma receita:

✔️ Marque passos conforme concluir <br>
✔️ Continue depois sem perder o progresso <br>



### ⭐ Favoritos

O app salva suas receitas favoritas e permite acessar depois.

---

## 📁 Estrutura do projeto

```
Project-Recipes-App/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

---


## 📚 Aprendizado

Com esse projeto consolidou:

✔️ Componentes React e organização de pastas <br>
✔️ Consumo de APIs externas <br>
✔️ Estados e efeitos com Hooks (useState, useEffect) <br>
✔️ Navegação de rotas (React Router) <br>
✔️ Lógica de filtros e progressão de estado <br>
✔️ Interação com usuário e persistência (localStorage) <br>

---
