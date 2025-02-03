import mongoose from "mongoose"

const BoothSchema = mongoose.Schema(
    {
        boothname : {
            type : String,
            required : [true, "pls enter booth"]
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
const Booth = mongoose.model('Booth', BoothSchema)
export default Booth