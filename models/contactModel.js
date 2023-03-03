const mongoose = require("mongoose"); //mongoose modülü dahil edilir.
const contactShema = mongoose.Schema({

//contactShema adında bir Mongoose şema nesnesi oluşturulur. Bu şema nesnesi, "name", "email" ve "phone" alanlarından oluşan bir belge yapısını tanımlar. Her alanın veri tipi belirtilir ve "required" anahtar kelimesi kullanılarak alanların zorunlu olduğu belirtilir.
      name: {
        type: String,
        required: [true, "Please add the contact name"],
      },
      email: {
        type: String,
        required: [true, "Please add the contact email address"],
      },
      phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
      },
},
{
    timestamps: true //"timestamps" ile her belge için oluşturma ve güncelleme tarihleri otomatik olarak kaydedilir.
}
);
module.exports=mongoose.model("Contact",contactShema)
//Contact adında bir model oluşturulur ve bu model, Mongoose model yöntemi ile "contacts" koleksiyonu ile ilişkilendirilir. Bu model, Contact şemasını kullanarak yeni belgeler oluşturmak, var olan belgeleri güncellemek, silmek ve sorgulamak için kullanılabilir.