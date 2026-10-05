import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value: string) {
        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(value.toLowerCase())) {
          throw new Error('Gender must be either male, female, or other');
        }
      },
    },
    photoUrl: {
      type: String,
      default: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    about: {
      type: String,
      default: 'This is the default about section. You can update it later.',
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
