import mongoose from "mongoose"

const UserSchema = mongoose.Schema(
    {
        username : {
            type : String,
            required : [true, "Enter username"],
            trim: true,
            unique: true,
        },
        password : {
            type : String,
            required : [true, "Enter password"],
        },
        selected_booth: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booth',
            default: null,
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', UserSchema)