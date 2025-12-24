const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'user201296'; // the password you want
  const hash = await bcrypt.hash(password, 10); // 10 = salt rounds
  console.log('Hashed password:', hash);
}

generateHash();
