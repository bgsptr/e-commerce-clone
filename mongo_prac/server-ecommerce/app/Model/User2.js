import mongoose from "mongoose";
// import {addressSchema} from "./Address.js";
import {listSchema} from "./List.js";

const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: String,
    email: {
        type: String,
        required: [true, "User's phone number is required"],
        lowercase: true,
        unique: true,
        validate: {
            validator: validateEmail,
            message: props => props.value + " is not a valid email",
        },
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        max: 20
    },
    phone_number: {
        type: String,
        max: 13,
    },
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: "List"}],
    // address: addressSchema,
});

const User = mongoose.model("User", userSchema)

export default User;