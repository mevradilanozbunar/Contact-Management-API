const asyncHandler = require("express-async-handler");
//asyncHandler adlı bir middleware fonksiyonu, express-async-handler kütüphanesi ile kullanılarak tanımlanıyor. Bu middleware fonksiyonu, asenkron işlevlerin hatalarını yakalamak ve hatayı özel bir hata işleyicisine yönlendirmek için kullanılıyor.
const User= require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }
//hash password
//Kullanıcının girdiği parola önce bcrypt.hash() fonksiyonu kullanılarak şifreleniyor. Bu işlem asenkron olarak gerçekleştiriliyor ve hashedpassword değişkenine atanıyor.
const hashedpassword=await bcrypt.hash(password,10);
console.log(`hashedpassword : ${hashedpassword}`);
//console.log("hashedpassword : ",hashedpassword);

const user= await User.create ({
    username,email,password:hashedpassword,
});
//Eğer kullanıcı başarıyla oluşturulursa, HTTP 201 (Created) yanıtı gönderiliyor ve _id ve email özellikleriyle birlikte JSON verisi yanıt olarak döndürülüyor. Eğer kullanıcı oluşturulamazsa, hata durumu oluşuyor ve bir hata mesajıyla birlikte 400 (Bad Request) HTTP yanıtı gönderiliyor.
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data us not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => { //loginUser adında bir fonksiyon tanımlanıyor. Bu fonksiyon, asenkron işlemlerle çalışacak ve gelen istek (request) ve cevap (response) nesnelerini parametre olarak alacak.
  const { email, password } = req.body; //email ve password değişkenleri, gelen isteğin gövdesinden (body) alınarak tanımlanıyor.
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!"); //Eğer email veya password değişkenleri boş ise, isteğe yanıt olarak 400 (Hatalı İstek) kodu döndürülüyor ve bir hata fırlatılıyor.
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    //jsonwebtoken kütüphanesi kullanılarak bir erişim anahtarı (access token) oluşturuluyor. Bu anahtar, kullanıcının adı, e-posta adresi ve kimlik numarası gibi bilgilerini içerecek şekilde bir nesne içine yerleştiriliyor. Anahtarın geçerlilik süresi 15 dakika olarak ayarlanıyor. Oluşturulan erişim anahtarı, JSON formatında bir nesne içinde yerleştirilerek 200 (Başarılı) kodlu bir yanıt olarak gönderiliyor.Bu kod, doğru kullanıcı bilgileri sağlandığında bir erişim anahtarı oluşturuyor ve bu anahtarı kullanarak erişim izni sağlıyor.
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      //bir environment variablenin değerine erişmek için kullanılır. Bu değişkenin değeri,secret key içermesi gereken bir string olmalıdır.Bu key, jsonwebtoken kütüphanesi tarafından kullanılarak erişim anahtarı oluşturulurken kullanılan şifreleme işlemi için gereklidir. Erişim anahtarı oluşturulurken kullanılan şifreleme anahtarı, anahtarın gizli olmasının önemli olduğu hassas uygulamalarda özellikle önemlidir.Bu nedenle, ACCESS_TOKEN_SECRET değişkeni, uygulama sunucusunda veya bulut servislerinde güvenli bir şekilde saklanmalı ve kimse tarafından ele geçirilmesine izin verilmemelidir. Bu değişken, uygulamanın başlatılması sırasında veya uygulama sunucusunda başka bir yolla ayarlanabilir.
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else { //Eğer şifre doğru değilse veya kullanıcı kaydı bulunamazsa, 401 (Yetkisiz Erişim) kodlu bir yanıt döndürülüyor ve bir hata fırlatılıyor.
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };