const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());



// Función para crear un token que incluye la marca de tiempo
const createTokenWithTimestamp = () => {
    const timestamp = Date.now(); 
    const uniqueValue = crypto.randomBytes(16).toString('hex'); 
    const token = `${uniqueValue}_${timestamp}`;
    return token;
};

const isTokenValidTime = (token) => {
    const [, timestamp] = token.split('_'); 
    const tokenTime = parseInt(timestamp);

    // Calcula si han pasado menos de 60 minutos
    const currentTime = Date.now();
    const timeDiff = (currentTime - tokenTime) / (1000 * 60); // Diferencia en minutos

    return timeDiff < 60; // True si paso menos de 60 minutos
};






const users = [
    { id: 1, usuario: 'usuario1', clave: 'clave1', estado: true },
    { id: 2, usuario: 'usuario2', clave: 'clave2', estado: true },
    { id: 3, usuario: 'usuario3', clave: 'clave3', estado: true },
    { id: 4, usuario: 'usuario4', clave: 'clave4', estado: true },
];

const tokens = [
    { token: 'token1_value', user_id: 1, estado: true },
    { token: 'token2_value', user_id: 2, estado: true },
    { token: 'b149930ebd42f2fce2d1f12d43ab0a43_1727658401142', user_id: 3, estado: true },
];

const router = express.Router();


// Ruta para crear un nuevo token
router.post('/login', (req, res) => {
    const { usuario, clave } = req.body;

    // Verificar que usuario y clave estén presentes en la solicitud
    if (!usuario || !clave) {
        return res.status(400).json({ error: 'Campos incompleto' });
    }

    // Verificar si el usuario existe
    const user = users.find(u => u.usuario === usuario);
    if (!user) {
        return res.status(404).json({ error: 'Clave o Usuario incorrecto' });
    }

    // Verificar si la clave es correcta
    if (user.clave !== clave) {
        return res.status(401).json({ error: 'Clave o Usuario incorrecto' });
    }

    // Si pasa las verificaciones, generar un token simple (ejemplo)
    const createToken = { token: createTokenWithTimestamp() , user_id: user.id, estado: true };
    tokens.push(createToken);
    console.log(createToken);
    
    // Enviar el token generado
    return res.status(201).json({message:"ok", token: createToken.token});
});



// Ruta para obtener un token específico
router.get('/login/:utoken', (req, res) => {
    const { utoken } = req.params;
    
    if (!utoken) {
        return res.status(404).send({ err: 'Token nulo' });
    }

    // Verificar si el token es válido en tiempo
    if (!isTokenValidTime(utoken)) {
        return res.status(404).send({ err: 'Token expirado' });
    }

    // Buscar el token
    const foundToken = tokens.find(t => t.token === utoken);

    if (!foundToken) {
        return res.status(404).send({ message: 'Token no encontrado.' });  
    }

    // Generar un nuevo token
    const newToken = createTokenWithTimestamp();
    tokens.push({ token: newToken, user_id: foundToken.user_id, estado: true });

    return res.status(200).send({ message: 'ok', token: newToken }); // Devolver el token encontrado y el nuevo token
});
app.use(router);

module.exports = app;