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
            required:true,
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
        avatar:{
            type:String,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0db5d-O0o7FdalxaxW8FImCIYJwcV3KJJVQ&s'
        },
        dateOfBirth:{
            type:Date
        },    
    }
)

module.exports=mongoose.model('User',userSchema)
