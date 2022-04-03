const jwt = require("jsonwebtoken");

//Funcion que verifica si el token(header) del usuario es valido
function verify(req, res, next) {
  const autHeader = req.headers.token;
  if (autHeader) {
    const token = autHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY,(err, user) =>{
        if(err) res.status(403).json("Token is not valid!")
        req.user = user;
        next();
    })
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
