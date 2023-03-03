const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    // jsonwebtoken kütüphanesi verify metodunu kullanarak token'in geçerli olup olmadığını kontrol eder. Eğer token geçersizse, yanıt olarak 401 Unauthorized HTTP durum kodu ve bir hata mesajı döndürülür. Eğer token geçerliyse, token'dan çözülen kullanıcı bilgileri req.user nesnesine atanır ve sonraki middleware işlevine (next) geçiş yapılır.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;