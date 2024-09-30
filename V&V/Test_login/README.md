npm init --y
npm install express -S
Creamos carpeta de src donde va a alojar el codigo
#Creamos .gitingnore
touch .gitignore

#install nodemon como desarrollo
npm install --save-dev nodemon


#Creamos server.js
touch src/.gitignore

#Instalamos dotenv 
npm install dotenv -S

#Configuramos script en package.json
"scripts": {
    "start":"node src/server.js",
    "start:local":"nodemon src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}

En neo crear usuarios:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(60) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

INSERT INTO token (token, created_at, user_id) VALUES
('token1_value', CURRENT_TIMESTAMP, 1),
('token2_value', CURRENT_TIMESTAMP, 2),
('token3_value', CURRENT_TIMESTAMP, 3);

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (usuario, clave, estado) VALUES
('usuario1', 'clave1', TRUE),
('usuario2', 'clave2', TRUE),
('usuario3', 'clave3', TRUE),
('usuario4', 'clave4', TRUE);


Creamos nuestros routes

#Instalamos para hacer el test
npm i jest supertest -D

#en pachage.json hay que agregar test jest
"scripts": {
    "start": "node src/server.js",
    "start:local": "nodemon src/server.js",
    "test": "jest"
  },

#Prueba demo
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', async(req, res) => {
  res.status(200).json({ name: 'john' });
});

describe('supertest para login', () => {
    it('demo', async () => {
        const result = await request(app).get('/user')
            .expect('Content-Type', /json/)
            .expect('Content-Length', '15')
            .expect(200);
        expect(result.text).toEqual(JSON.stringify({ name: 'john' }));
    });
    
});