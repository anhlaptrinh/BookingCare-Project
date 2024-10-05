import {
  createNewUser,
  deleteUser,
  getAllUsers,
  handleUserLogin,
  updateUser,
} from "../services/userServices";

export let handleLogin = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!.",
    });
  }
  let userData = await handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

export let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL, SINGLE
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing inputs parameter!",
      users: [],
    });
  }
  let users = await getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

export let handleCreateNewUser = async (req, res) => {
  let message = await createNewUser(req.body);
  return res.status(200).json(message);
};

export let handleEditNewUser =async (req, res) => {
  let data=req.body;
  let message=await updateUser(data)
  return res.status(200).json(message)
};

export let handleDeleteNewUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let message = await deleteUser(req.body.id);
  return res.status(200).json(message);
};
