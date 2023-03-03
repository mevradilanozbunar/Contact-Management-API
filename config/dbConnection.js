const mongoose = require("mongoose"); //Mongoose modülünü alır.

const connectDb= async() => { //connectDb adlı bir async fonksiyon tanımlar.
    try{ // Bağlantı denemesine başlamak için try bloğu oluşturur.
        const connect = await mongoose.connect(process.env.CONNECTION_STRING); //Mongoose ile MongoDB veritabanına bağlanmak için CONNECTION_STRING değişkenini kullanarak bağlantıyı gerçekleştirir ve bağlantı nesnesini connect değişkenine atar.
        console.log("database connected",connect.connection.name);
    }
    catch(err) { //Eğer bağlantıda hata varsa, catch bloğu çalışır.
        console.log(err);
        process.exit(1); //Hata durumunda uygulamadan çıkmak için process.exit kullanılır.
    }
};

module.exports = connectDb;


