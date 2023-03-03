//const { request } = require("express");

const express = require("express"); //Express modülünü alır.
const errorHandler = require("./middleware/errorhandler"); //Hata yakalama için bir middleware modülü alır.
const dotenv = require("dotenv").config(); //.env dosyasını alarak kullanılabilir hale getirir.
const connectDb= require("./config/dbConnection"); // veritabanı bağlantısı yapmak için dbConnection modülünü alır.
const port=process.env.PORT || 5001; //port numarasını belirler, eğer .env dosyasında PORT değişkeni tanımlıysa onu kullanır, tanımlı değilse 5001 portunu kullanır.

connectDb(); //veritabanı bağlantısını gerçekleştirir.
const app = express(); //yeni bir Express uygulaması oluşturur.

app.use(express.json()); // json veri gönderimini desteklemek için middleware ekler.
app.use("/api/contacts",require("./routes/contactRoutes")); ///api/contacts rotası için contactRoutes modülünü kullanır.
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler); // hata yakalama middleware'ini kullanır.

app.listen(port, () => {
    console.log(`Server running on port ${port}`); //sunucuyu başlatır ve belirlenen portta dinlemeye başlar.
  });
