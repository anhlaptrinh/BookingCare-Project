import { createNewUser, getAllUser, getUserInfoById, updateUserData } from "../services/CRUDServices";

let getHomePage = (req,res)=> {
    return res.render("homepage.ejs")
}

let getCRUD = (req,res)=>{
    return res.render("crud.ejs")
}
let postCRUD=async(req,res)=>{
    let message=await createNewUser(req.body);
    console.log(message);
    return res.send("post crud")
}
let displayGetCRUD=async(req,res)=>{
    let data = await getAllUser();
    console.log(data);
    return res.send('display get crud from controller')
}
let getEditCRUD=async(req,res)=>{
    let userid=req.query.id
    if(userid){
        let userData=await getUserInfoById(userid);
        console.log(userData);
        if(userData)
            return res.send("found User");
        else  
            return res.send("Not found User");

    }
    else
        return res.send("User not found")
}

let putCRUD = async(req,res) => {
    let data=req.body;
    await updateUserData(data);
    return res.send("update done")
};

let deleteCRUD=async(req,res)=>{
    let id=req.query.id
    await deleteUserById(id);
    return res.send("delete done");
}
module.exports= {
    getHomePage,
    getCRUD,
    displayGetCRUD,
    deleteCRUD,
    getEditCRUD,
    putCRUD,
    postCRUD
}