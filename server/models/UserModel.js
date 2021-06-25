const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
	name: {type: String, 
		minLength: [3, "The name should be at least 3 characters"],
		required: [true, "The name is required"],
	},
    email: {type: String,unique: true, required:true},
    password: {type: String,required:true},
    isAdmin: {type: Boolean, required:true, default: false}
},
    {
        timestamps: true,
    });
    
    
      userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
      userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
          next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      });
    const User = mongoose.model("User", userSchema);
    
    module.exports = User;
    