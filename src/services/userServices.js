import db from "../models/index";
import bcrypt from "bcrypt";
export let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password"],
          raw: true,
        });
        if (user) {
          let checkPassword = await bcrypt.compareSync(password, user.password);
          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = "Login Success";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Password is incorrect";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User not found";
        }
        //bcrypt.compareSync(myPlaintextPassword, hash);
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isn't exist in system`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

export let checkUserEmail = (useremail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: useremail },
      });
      if (user) resolve(true);
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

export let getAllUsers = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userid === "ALL") {
        users = await db.User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
      }
      if (userid && userid !== "ALL") {
        users = await db.User.findOne({
          where: { id: userid },
          attributes: {
            exclude: ['password']
        }
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
