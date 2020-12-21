import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    //첫 번째 파라메터에서는 토큰안에 넣고 싶은 데이터를 집어 넣어줍니다.
    { _id: this.id, username: this.username },
    //두번쩨 파라메터에서는 JWT 암호를 넣어줍니다.
    process.env.JWT_SECRET,
    // 세번째 파라메터에서는 유효기간에 대한 값을 설정하여 줍니다.
    {
      expiresIn: '7d',
    },
  );
  return token;
};
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username: username });
};

const User = mongoose.model('User', UserSchema);
export default User;
