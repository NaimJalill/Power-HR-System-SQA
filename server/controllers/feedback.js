import Feedback from "../models/feedback.js";
import mongoose from "mongoose";

//NO LONGER USE!!!!!!!!!!


export const getFeedbacks = async (req, res) => {
    try{
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const getFeedbackByID = async (req, res) => {
    const { id } = req.params;
    try{
        const feedback = await Feedback.findById(id);
        res.status(200).json(feedback);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
}

// post request to create a new feedback
export const createFeedback = async (req, res) => {
    const feedback = req.body;
    const newFeedback = new Feedback(feedback);
    try{
        await newFeedback.save();
        res.status(201).json(newFeedback);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

// patch request to update a feedback
export const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const feedback = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No feedback with id: ${id}`);
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, feedback
        , { new: true });
    res.json(updatedFeedback);
}

// delete request to delete a feedback
export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No feedback with id: ${id}`);
    await Feedback.findByIdAndRemove(id);
    res.json({ message: "Feedback deleted successfully." });
}
