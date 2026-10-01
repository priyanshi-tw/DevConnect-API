import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://priyanshis_db_user:IBDcDXPfXgRGOGuU@nodejslearning.wd7d9vs.mongodb.net/devConnect'
  );
};
