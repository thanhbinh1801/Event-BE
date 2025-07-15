import bcrypt from 'bcrypt';

export default class HashUtil {
  static async hashPW(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async verifyPW(password, PWhashed) {
    return await bcrypt.compare(password, PWhashed);
  }
}
