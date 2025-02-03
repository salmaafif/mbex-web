import mongoose from "mongoose"

const BoothSchema = mongoose.Schema(
    {
        boothname : {
            type : String,
            required : true
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            default: null,
        },
    },
    {
        timestamps: true
    }
)

export const Booth = mongoose.model('Booth', BoothSchema)