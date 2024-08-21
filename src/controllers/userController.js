import { handleUserLogin } from "../services/userServices"

export let handleLogin=async(req,res)=>{
    let {email, password}=req.body
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message:"Missing inputs parameter!."})
    }
    let userData=await handleUserLogin(email,password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user:userData.user?userData.user:{}
    })
}

