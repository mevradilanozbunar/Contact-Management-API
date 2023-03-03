//Bu kod, bir hata işleyicisi (error handler) modülünü tanımlar.

const {constants} = require("../constants");

const errorHandler = (err,req,res,next) => { //errorHandler fonksiyonu, dört argüman ile tanımlanır: err, req, res ve next. Bu argümanlar, Express'in hata işleme işlevlerine özeldir ve belirli bir sırayla kullanılmalıdır.

    const statusCode = res.statusCode ? res.statusCode : 500;  //errorHandler fonksiyonu, gelen hatanın durum kodunu (statusCode) belirler. Eğer durum kodu yoksa veya tanımlanmamışsa, varsayılan olarak 500 kullanılır.
    
    switch (statusCode) 
    {
        case constants.NOT_FOUND:
            res.json({
                title:"not found",
                message:err.message,
                stackTrace: err.stack
            });
        case constants.VALIDATION_ERROR:
            res.json({
                title:"validation failed",
                message:err.message,
                stackTrace: err.stack
            });
        case constants.UNAUTHORIZED:
            res.json({
                title:"un authorized",
                message:err.message,
                stackTrace: err.stack
            });
        case constants.FORBIDDEN:
            res.json({
                title:"forbidden",
                message:err.message,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            res.json({
                title:"server error",
                message:err.message,
                stackTrace: err.stack
            });
        default:
            console.log("no error")
        break;       
    }
    
    
    
    
};

module.exports=errorHandler;

