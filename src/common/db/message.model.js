import {model,Schema} from "mongoose";

const schema = new Schema({
        content: {type: String, trim:true ,required: true, minLength: 1, maxLength: 200},
        receiver: {type: Schema.Types.ObjectId, ref: "User", required: true},
        sender: {type: Schema.Types.ObjectId, ref: "User"}
    },{

    timestamps:true

    }
)

export const Message = model("Message",schema);