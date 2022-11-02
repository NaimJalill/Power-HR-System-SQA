import mongoose from "mongoose";
import Criteria from "./criteria";

const applicationSchema = mongoose.Schema({
    applicationDate : {
        type: Date,
        default: new Date()
    },
    applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant"
    },
    job : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    hireDate : Date,
    criteria: Criteria
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;