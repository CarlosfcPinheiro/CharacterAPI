# Charpi

A 2D character creator _REST API_ to compose a full-stack application. The application was made to apply some concepts that I never used on my previous projects, so ignore the bugs :)

## 📖 Summary

-   [1. Features](#1--features)
-   [2. Tecnologies](#2--tecnologies)
-   [3. How-to-Run-it-Locally](#3--how-to-run-it-locally)
    -   [3.1 Requirements](#31-requirements)
    -   [3.2 Clone-the-Repository](#32-clone-the-repository)
    -   [3.3 Run-docker-compose-file](#33-run-docker-compose-file)
-   [4. Routes](#4--routes)
-   [5. Documentation](#5--documentation)
-   [6. To-do list](#5--to-do-list)

## 1. ⚙️ Features

The application provides the features:

-   CRUD operations
-   Json responses
-   HTTP requests
-   Error handling
-   Image building

## 2. 📦 Tecnologies

-   Express (server construction)
-   Sequelize (ORM)
-   PostgreSQL (Database)
-   JWT (for Bearer Auth)
-   Jest (Unit Tests)
-   Docker (Image building)

## 3. 🏠 How to run it locally?

The application has a docker-compose file to make more easy to build and use.

### 3.1 📝 Requirements

If you use 🪟Windows or 🍎Mac:

-   Docker desktop
-   WSL 2 (or other tool to Linux virtualization)
-   Docker package (Installed on your linux subsystem)
-   Git

Or to 🐧Linux users:

-   Docker package installed (see how to do it with your package manager)
-   Git

### 3.2 Clone the repository

First of all, clone this repository and enter on directory:

```bash
git clone https://github.com/CarlosfcPinheiro/CharacterAPI.git && cd CharacterAPI
```

### 3.3 Run docker-compose file

And now, you can run the docker-compose file in the root directory of the project.

```bash
docker-compose up --build -d
```

API is ready now!

## 4. ➡️ Routes

The base URI to all requests is `/api/v1`.

## 5. 📄 Documentation

API docs with Swagger pattern is avaliable at `/docs`.

## 6. ✅ To-do list

To-do new features/refactor list

-   [ ] Dev database version
-   [x] Character swagger docs
-   [ ] Typescript implementation
-   [ ] Character service unit tests
-   [x] Create service layer
-   [ ] Alterar nome do atributo user-creator
-   [ ] Refatorar controller para classe
