const express = require("express"); //express modülü projeye dahil edilir
const router = express.Router(); //Express kütüphanesini kullanarak HTTP isteklerini yönetmek için bir yönlendirici (router) nesnesi oluşturur.
const validateToken=require("../middleware/validateTokenHandler");
const {getContacts,createContact, getContact,updateContact,deleteContact,} = require("../controllers/contactController");
//contactController modülünden gerekli fonksiyonları destructuring yöntemi ile alır ve birbirleriyle ilgili HTTP istekleri için ilgili yönlendirici yöntemleri ile eşleştirir.


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
//"/" rotasına GET isteği geldiğinde getContacts fonksiyonunu, POST isteği geldiğinde createContact fonksiyonunu çalıştırmak için eşleştirir.

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
//"/:id" rotasına GET isteği geldiğinde getContact fonksiyonunu, PUT isteği geldiğinde updateContact fonksiyonunu, DELETE isteği geldiğinde deleteContact fonksiyonunu çalıştırmak için eşleştirir. ":id" parametresi, istek URL'sindeki değişken bir parçadır ve bu şekilde parametrelerle çalışmak, dinamik bir yönlendirme yapılmasını sağlar.


module.exports = router;
// router nesnesi module.exports ile dışarıya verilir ve index.js gibi diğer dosyalar tarafından kullanılabilir hale getirilir. Bu şekilde, yönlendirici dosyası, uygulama ana dosyasından ayılarak daha modüler bir yapıya sahip olur.
