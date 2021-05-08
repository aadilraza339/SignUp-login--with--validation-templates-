  
const knex=require("./Connection")

let register = (data)=>{
    return knex('users').insert(data)
}

let  IsUser = (field, value ) => {
    console.log(field,value)
    return knex('users').select('*').where(field,value)
}
let newpost = (user_id,caption,post_url) => {    
    return knex('mypost').insert({"user_id":user_id,"caption":caption,"img_url":post_url})
}

let get_post = () => {
    return knex ('mypost').select("users.user_id", "users.username","mypost.caption","mypost.img_url").join('users',"mypost.user_id",'=','users.user_id')
}  

module.exports = {
    get_post,
    register,
    newpost,
    IsUser
};