import mongoose, { Schema, type HydratedDocument, type Model } from 'mongoose'
import bcrypt from 'bcrypt'

interface User {
  username: string
  password?: string
  name: string
  lastLogin: Date
}

interface UserMethods {
  comparePassword: (password: string) => Promise<boolean>
}

export type UserDocument = HydratedDocument<User, UserMethods>

// eslint-disable-next-line @typescript-eslint/ban-types
type UserModel = Model<User, {}, UserMethods>

const SALT_WORK_FACTOR = 10

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 32,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'Username is required.'],
    },

    password: { type: String },

    name: {
      type: String,
      minlength: 3,
      maxlength: 32,
      trim: true,
      required: true,
    },

    lastLogin: {
      type: Date,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      default: () => new Date(),
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function () {
  // only hash the password if it has been modified (or is new)
  if (this.password && this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR)
    // Store hash in your password DB.
    this.password = hash
  }
})

userSchema.method('comparePassword', async function (password: string): Promise<boolean> {
  if (!this.password) {
    throw new Error('User password does not exists to compare, make sure to select password field if using projection.')
  }
  return await bcrypt.compare(password, this.password)
})


const UserModel =  mongoose.model<User, UserModel, UserMethods>('User', userSchema, 'Users')
export default UserModel