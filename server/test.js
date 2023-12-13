const bcrypt = require('bcrypt');

pwd = "1234";

async function hashPassword(pwd) {
  const hashedPassword = await bcrypt.hash(pwd, 10);
  console.log(hashedPassword);
}

hashPassword(pwd);
