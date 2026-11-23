import {User} from '../../common/db/user.model.js';

export async function findUserByEmail(email){
    return  User.findOne({email:email});
}
export async function createUser(data){
      const user = new User(data);
      return await user.save();
}

export async function updateUser (userId,data){

   return await User.findOneAndUpdate({_id:userId}, data , {returnDocument:"after"});
}

export async function findUserById(userId){
    return await User.findOne({_id:userId});
}