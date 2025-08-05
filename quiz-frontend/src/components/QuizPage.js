import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const QuizPage = () => {
  const [questions, setQuestions] = useState({ java: [], react: [], node: [] });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestionNo,setSelectedQuestionNo] = useState([]);
  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: "aditya@gmail.com",
      password: "123456",
    });
    localStorage.setItem("token", res.data.token);
  };

  useEffect(() => {
    handleLogin();

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/exam/exam", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        if (res.data.message) {
          setQuestions(res.data.message);
        } else {
          setQuestions(res.data);
        }
      } catch (err) {
        console.error("Error fetching exam questions:", err);
      }
    };
    fetchData();
  }, []);

  const handleAnswerChange = (topic, questionNo, value, index) => {
  setSelectedAnswers((prev) => ({
    ...prev,
    [`${topic}-${questionNo}`]: value,
  }));

  setSelectedQuestionNo((prev) => {
    if (!prev.includes(index+1)) {
      return [...prev, `${index+1}-${topic}%${questionNo}`];
    }
    return prev;
  });
};

  const renderQuestion = (q, idx, topic) => (
    <Card key={`${topic}-${q.questionNo}`} sx={{ my: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {idx + 1}. {q.questionData}
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            name={`${topic}-${q.questionNo}`}
            value={selectedAnswers[`${topic}-${q.questionNo}`] || ""}
            onChange={(e) => handleAnswerChange(topic, q.questionNo, e.target.value,idx)}
          >
            {q.questionOptions && q.questionOptions.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={opt}
                control={<Radio />}
                label={`${String.fromCharCode(65 + i)}. ${opt}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );

  const handleSubmit = () => {
    console.log("Selected Answers:", selectedAnswers);
    console.log("questionNo:-",selectedQuestionNo);
    for(let op in selectedAnswers){
        let temp = op.split('-');
        console.log(temp[1],selectedAnswers[op]);
        // console.log("object",selectedAnswers[op]);
    }
    console.log(questions.java);
    console.log(questions.node);
    console.log(questions.react);
    alert("Answers submitted. Check console for output.");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🧠 Java Full Stack Quiz
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" color="primary" gutterBottom>
        Java Questions
      </Typography>
      {questions.java && questions.java.map((q, i) => renderQuestion(q, i, "java"))}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" color="secondary" gutterBottom>
        React Questions
      </Typography>
      {questions.react && questions.react.map((q, i) => renderQuestion(q, i, "react"))}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" color="success.main" gutterBottom>
        Node Questions
      </Typography>
      {questions.node && questions.node.map((q, i) => renderQuestion(q, i, "node"))}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleSubmit}
      >
        Submit Quiz
      </Button>
    </Container>
  );
};

export default QuizPage;