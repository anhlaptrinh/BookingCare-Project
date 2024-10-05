import bcrypt from "bcrypt";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

export let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("Create user success");
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

export let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

export let getUserInfoById = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: userid }, raw: true });
      if (user) {
        resolve(user);
      } else resolve(null);
    } catch (e) {
      reject(e);
    }
  });
};

export let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: data.id }, raw: true });
      if (user) {
        user.firstName = data.firstname;
        user.lastName = data.lastname;
        user.address = data.address;
        await user.save();

        let allUser = await db.User.findAll();
        resolve(allUser);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export let deleteUserById = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userid }, raw: true });
      if (user) {
        user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
