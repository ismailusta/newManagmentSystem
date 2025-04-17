const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/apartment-management';

const resetFlats = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB bağlantısı başarılı');

        // Drop the flats collection
        await mongoose.connection.collection('flats').drop();
        console.log('Flats collection başarıyla silindi');

        // Create new indexes
        await mongoose.connection.collection('flats').createIndex(
            { apartment: 1, block: 1, floor: 1, number: 1 },
            { unique: true }
        );
        console.log('Yeni indexler oluşturuldu');

    } catch (error) {
        console.error('Hata:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB bağlantısı kapatıldı');
    }
};

resetFlats(); 