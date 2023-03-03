const mongoose = require("mongoose"); //mongoose modülü dahil edilir.
const userShema = mongoose.Schema({

      username: {
        type: String,
        required: [true, "Please add the user name"],
      },
      email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique:[true,"Email address already taken"],
      },
      password: {
        type: String,
        required: [true, "Please add the user password"],
      },
},
{
    timestamps: true //"timestamps" ile her belge için oluşturma ve güncelleme tarihleri otomatik olarak kaydedilir.
}
);
module.exports=mongoose.model("User",userShema)
//Contact adında bir model oluşturulur ve bu model, Mongoose model yöntemi ile "contacts" koleksiyonu ile ilişkilendirilir. Bu model, Contact şemasını kullanarak yeni belgeler oluşturmak, var olan belgeleri güncellemek, silmek ve sorgulamak için kullanılabilir.