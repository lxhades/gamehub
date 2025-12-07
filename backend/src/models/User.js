const mongoose= require('mongoose')
const userSchema=new mongoose.Schema(
    {
        email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex kiểm tra email hợp lệ
    },
        password:{
            type:String,
            require:true,
            minlength:6,
        },
        name:{
            type:String,
            trim:true,
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user'
        },    
    }
)

module.exports=mongoose.model('User',userSchema)
