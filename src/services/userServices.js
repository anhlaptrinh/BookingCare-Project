import db from "../models/index";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
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
export let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
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
            exclude: ["password"],
          },
        });
      }

      if (userid && userid !== "ALL") {
        users = await db.User.findOne({
          where: { id: userid },
          attributes: {
            exclude: ["password"],
          },
        });
        if (!users) users = "id not found";
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

export let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check) {
        return resolve({
          errCode: 1,
          message: "Your email is already exist",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstname,
        lastName: data.lastname,
        phoneNumber: data.phonenumber,
        address: data.address,
        roleId: data.role,
        gender: data.gender === 1 ? true : false,
      });
      resolve({
        errCode: 0,
        errMessage: "Create successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

export let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      return resolve({
        errCode: 2,
        message: "User not found",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: "Delete User successfully",
    });
  });
};

export let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.id){
        return(
          resolve({
            errCode: 2,
            message: "Missing require parameters",
          })
        )
      }
      const user = await db.User.findOne({ where: { id: data.id }, raw: false });
      if (user) {
        // await user.save();
        user.firstName = data.firstname;
        user.lastName = data.lastname;
        user.address = data.address;
        await user.save();
        resolve({
          errCode:0,
          errMessage: 'Update successfully'
        })
      }else{
        resolve({
          errCode: 1,
          errMessage: 'User not found'
        })
      }
    } catch (error) {
      reject(error);
    }
  });
};
