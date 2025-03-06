# Charpi
A 2D character creator *REST API* to compose a full-stack application. The application was made to apply some concepts that I never used on my previous projects, so ignore the bugs :)

## ⚙️ Features
The application provides the features:
- CRUD operations
- Json responses
- HTTP requests
- Error handling
- Image building

## 📦 Tecnologies
- Express (server construction)
- Sequelize (ORM)
- PostgreSQL (Database)
- JWT (for Bearer Auth)
- Jest (Unit Tests)
- Docker (Image building)

## 🏠 How to run it locally?
The application has a docker-compose file to make more easy to build and use.

### 📝 Requirements
If you use 🪟Windows or 🍎Mac:
- Docker desktop
- WSL 2 (or other tool to Linux virtualization)
- Docker package (Installed on your linux subsystem)
- Git

Or to 🐧Linux users:
- Docker package installed (see how to do it with your package manager)
- Git

### 1. Clone the repository
First of all, clone this repository and enter on directory:
```bash
git clone https://github.com/CarlosfcPinheiro/CharacterAPI.git && cd CharacterAPI
```

### 2. Run docker-compose file
And now, you can run the docker-compose file in the root directory of the project.
```bash
docker-compose up --build -d
```

API is ready now!

## Routes
The base URI to all requests is ```/api/v1```.