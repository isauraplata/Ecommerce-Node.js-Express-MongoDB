import {Schema,model} from "mongoose"
import bcycript from "bcryptjs"

const userSchema= new Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        require:true
    }, 
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role", 
        required: true
    },
},{
    timestamps:true,
    versionKey:false
});

userSchema.statics.encryptPassword = async(password)=>{
    const salt= await bcycript.genSalt(10)
    return await bcycript.hash(password, salt)
}
userSchema.statics.comparePassword = async(password,receivedPassword)=>{

    return await bcycript.compare(password,receivedPassword)
};

export default model("User", userSchema);