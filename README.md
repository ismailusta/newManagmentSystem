# Yönetim Sistemi

Bu proje, modern bir yönetim sistemi uygulamasıdır. Node.js ve Express.js kullanılarak geliştirilmiş bir backend uygulamasıdır.

## Özellikler

- Kullanıcı yönetimi ve kimlik doğrulama
- Dosya yükleme sistemi
- E-posta bildirimleri
- SMS bildirimleri (Twilio entegrasyonu)
- Ödeme sistemi (iyzipay entegrasyonu)
- API dokümantasyonu (Swagger)
- MongoDB veritabanı entegrasyonu

## Teknolojiler

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Swagger
- Twilio
- iyzipay
- Nodemailer
- Multer (Dosya yükleme)
- Bcrypt (Şifreleme)

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ayarlayın:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
IYZIPAY_API_KEY=your_iyzipay_key
IYZIPAY_SECRET_KEY=your_iyzipay_secret
```

4. Uygulamayı başlatın:
```bash
npm start
```

Geliştirme modunda çalıştırmak için:
```bash
npm run dev
```

## API Dokümantasyonu

Swagger UI üzerinden API dokümantasyonuna erişebilirsiniz:
```
http://localhost:3000/api-docs
```

## Lisans

ISC 