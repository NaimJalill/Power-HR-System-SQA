import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getFormByID } from "../../../Redux/slices/form";
import { createResponse, getResponse, updateResponse } from "../../../Redux/slices/response";

//question type
import { MultipleChoice } from "../../../Components/Survey/Question/QuestionType/MultipleChoice";
import ShortAnswer from "../../../Components/Survey/Question/QuestionType/ShortAnswer";
import Paragraph from "../../../Components/Survey/Question/QuestionType/Paragraph";
import { CheckBox } from "../../../Components/Survey/Question/QuestionType/Checkboxes";
import { DropDown } from "../../../Components/Survey/Question/QuestionType/DropDown";
import { LinearScale } from "../../../Components/Survey/Question/QuestionType/LinearScale";

import { Typography, Container, Grid, Button } from "@mui/material";

function QuestionPage(props) {
  const [feedback, setFeedback] = useState([]);
  const [saved, setSaved] = useState(true);
  const [clear, setClear] = useState(false);

  //redux
  const form = useSelector((state) => state.forms.form);
  const rfeedback = useSelector((state) => state.responses.feedback);
  const questions = useSelector((state) => state.forms.form.questions);
  const dispatch = useDispatch();

  const { id } = useParams();

  const token = localStorage.getItem("authToken");
  const employeeID = JSON.parse(atob(token.split(".")[1])).detailId;

  useEffect(() => {
    dispatch(getFormByID(id));
    var formID = id;
    dispatch(getResponse({ formID, employeeID }));
  }, []);

  // //auto save
  // useEffect(() => {
  //   if (feedback.length > 0 && saved === false) {
  //     const getData = setTimeout(() => {
  //       dispatch(updateResponse({ feedback, employeeID, formID: id }));
  //     }, 1000);
  //     return () => clearTimeout(getData);
  //   }
  // }, [feedback]);


  useEffect(() => {
    if(form?.questions?.length > rfeedback?.response?.length){
      if (form?.questions?.length > 0) {
        var temp = [];
        for (var i = 0; i < form?.questions?.length; i++) {
          temp.push({
            questionID: form.questions[i]._id,
            answer: [{text: "",
            optionID: ""}],
          });
        }

        for (var i = 0; i < form.questions.length; i++) {
          for (var j = 0; j < temp.length; j++) {
            if (rfeedback.response[i].questionID === temp[j].questionID) {
              temp[j].answer = rfeedback.response[i].answer;
              break;
            }
          }
        }
        // console.log(response)
        if(rfeedback._id === undefined){
          console.log("create");
          //dispatch(createResponse({ feedback: temp, employeeID, formID: id }));
        }
        else{
          var tempFeedback ={
            response: temp,
            employeeID: employeeID,
            formID: id,
            _id: rfeedback._id
          }
          dispatch(updateResponse(tempFeedback));
          setSaved(false);
        }
        
      }
    }
  }, [rfeedback]);

  const handleClear = () => {
    var temp = [];
    for (var i = 0; i < form?.questions?.length; i++) {
      temp.push({
        questionID: form.questions[i]._id,
        answer: [{
          text: "",
          optionID: ""
        }],
      });
    }
    // setFeedback(temp);
    console.log(temp);
    var tempFeedback ={
      response: temp,
      employeeID: employeeID,
      formID: id,
      _id: rfeedback._id
    }
    dispatch(updateResponse(tempFeedback));

  }



  return (
    <>
      <Navbar />

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Grid
          m={2}
          p={2}
          sx={{ borderTop: "10px solid black", borderRadius: 2, boxShadow: 2 }}
        >
          <Typography variant="h4">{form?.name}</Typography>
          <Typography variant="body" gutterBottom>
            {form?.description}
          </Typography>
        </Grid>
        {/* map the questions here */}
        {questions?.map((q, i) => {
          return (
            <Grid
              m={2}
              p={2}
              sx={{
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: "12px",
                  }}
                ></div>
                {q.questionType === "Multiple Choice" ? (
                  <MultipleChoice index={i} />
                ) : (
                  ""
                )}
                {q.questionType === "Short Answer" ? (
                  <ShortAnswer index={i} />
                ) : (
                  ""
                )}
                {q.questionType === "Paragraph" ? <Paragraph index={i} /> : ""}
                {q.questionType === "Checkboxes" ? <CheckBox index={i} /> : ""}
                {q.questionType === "Drop-down" ? <DropDown index={i} /> : ""}
                {q.questionType === "Linear Scale" ? (
                  <LinearScale index={i} />
                ) : (
                  ""
                )}
              </>
            </Grid>
          );
        })}
        <Grid m={2} p={2}>
          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            Submit
          </Button>
          <Button variant="contained" sx={{ mt: 2, ml: 2 }}>
            Save as Draft
          </Button>
          <Button onClick={handleClear} variant="contained" color="error" sx={{ mt: 2, ml: 2 }}>
            Clear
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default QuestionPage;
