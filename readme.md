# 📘 TechChallenge 4 - App Blog

## 📑 Índice

- [Introdução](#Introdução)
- [Recursos Principais](#recursos-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Uso](#Instalação-e-Uso)
- [Observações Importantes](#observacoes-importantes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dependências](#dependências)
- [Relatos e desafios no desenvolvimento](#relatos-e-desafios-no-desenvolvimento)
- [Equipe de Desenvolvimento](#equipe-de-desenvolvimento)

---

## Introdução

BlogPosTech é um aplicativo mobile desenvolvido em **React Native** para gerenciamento de postagens e usuários, com autenticação via **Firebase**. O app permite que professores publiquem, editem e visualizem posts, além de um painel administrativo para gestão de usuários e conteúdos.

---

## Recursos Principais

- **Autenticação de Usuários:** Sistema de login e cadastro via Firebase.
- **Gestão de Postagens:** Publicação, edição e exclusão de artigos e notícias.
- **Painel Administrativo:** Controle de usuários e conteúdos para administradores.
- **Navegação Intuitiva:** Interface amigável para uma experiência de usuário fluida.

---

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas principais:

- **Framework Principal:** `React Native`
- **Backend as a Service (BaaS):** `Firebase` (para Autenticação, Firestore e Functions)
- **Ambiente de Desenvolvimento:** `Expo` (para gerenciamento de assets e permissões)

---

## Instalação e Uso

1. Clone o repositório:
   ```sh
   git clone https://github.com/gp33postech/app

2. Instale as dependências:

   ```sh
   npm install

3. Configure o Firebase em src/services/firebaseConfig.js se necessário.

4. Inicie o projeto:
   ```sh
   npx expo start

## Observacões Importantes
- O backend de posts está configurado em src/config/apiConfig.js.
- O painel administrativo é acessível apenas para usuários com permissão de admin.
- Para editar funções do usuário, ajuste o contexto em src/context/UserContext.jsx.

## Estrutura do Projeto
```
app/
├── src/
│   ├── components/         # Componentes reutilizáveis (Header, PostItem, etc)
│   ├── config/             # Configurações globais (API, etc)
│   ├── context/            # Contextos globais (UserContext)
│   ├── hooks/              # Hooks customizados (useFetch, useFetchPosts)
│   ├── navigation/         # Navegação entre telas (AppNavigator)
│   ├── screens/            # Telas do app (Login, Home, Admin, CRUD)
│   ├── services/           # Integração com Firebase
│   ├── styles/             # Estilos customizados
│── assets/                 # Imagens e recursos estáticos
├── app.json                # Configuração do Expo
├── app.jsx                 # Ponto de entrada do app
├── index.js                # Inicialização do projeto
├── package-lock.json       # Gerenciamento de dependências
└── readme.rd               # Documentação do projeto
```

## Dependências
- React Native: Framework principal
- Expo: Gerenciamento de assets e permissões
- Firebase: Autenticação, Firestore e Functions
- @react-navigation/native: Navegação entre telas
- @react-native-picker/picker: Picker para seleção de opções
- @react-native-async-storage/async-storage: Persistência local
- @expo/vector-icons: Ícones
- @react-navigation/material-top-tabs: Navagação entre as páginas Aluno ou Professor
- @react-navigation/stack: Navagação entre as páginas
- expo-image-picker : para selecionar imagem da galeria


## Relatos e desafios no desenvolvimento
Alguns dos desafios encontrados pela equipe durante o desenvolvimento foram a configuração do ambiente para funcionamento dos emuladores, emuladores muito pesados, quebra do build conforme evolução do projeto dificultando a validação e integração de todo o conteúdo teórico com a abordagem prática exigida no desafio em grupo.

## Equipe de Desenvolvimento
Grupo 14
- ADRIANO BATISTA DE ARAÚJO - RM: 360317
- FILIPE ARAÚJO DA COSTA - RM: 360594
- GABRIELA MIDORI AFUSO - RM: 360009
- PEDRO CARVALHO CALLEJAS - RM: 360449