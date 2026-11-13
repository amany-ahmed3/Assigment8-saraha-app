import {User} from '../../common/db/user.model.js';

export async function findUserByEmail(email){
    return  User.findOne({email:email});
}
export async function createUser(userName,email,hashedPassword){
      const user = new User({userName:userName,email:email,password:hashedPassword});
      return await user.save();
}

export async function updateUser (userId,data){

   return await User.findOneAndUpdate({_id:userId}, data , {returnDocument:"after"});
}