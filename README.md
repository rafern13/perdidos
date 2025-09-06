# Perdidos - Banco de Pessoas Desaparecidas

Este é o repositório do frontend para a aplicação **Perdidos**, uma plataforma para visualizar, buscar e filtrar informações sobre pessoas desaparecidas.

* Nome: Rafael Fernandes do Carmo
* E-mail: rafafernandes1308@gmail.com
* Telefone: 15 99623-4146

## ✅ Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/)

## ⚙️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente.

1.  **Clone o repositório:**
    ```bash
      git clone https://github.com/rafern13/perdidos.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd perdidos
    ```

3.  **Construa o Container:**
    ```
    # Build do projeto
    docker build -t perdidos-frontend .

    # Start no container
    docker run -p 8080:80 perdidos-frontend
    ```

4.  Abra seu navegador e acesse [`http://localhost:8080`](http://localhost:8080) (ou a porta que for indicada no seu terminal).

## 📦 **Como utilizar**
   A api permite visualizar as pessoas atráves do filtro ou do explorar, no qual são carregados registros aleatórios

### Adicionando informações
   Nos detalhes do card, o usuário pode decidir postar informações a respeito da pessoa desaparecida.
