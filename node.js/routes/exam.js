const express = require('express');
const router = express.Router();
const java = require("../questions/java_mcq_questions.json");
const react = require("../questions/react_mcq_questions.json");
const node = require("../questions/node_mcq_questions.json");
const auth = require('../middleware/auth');

class QuestionBody {
    constructor(questionNo, questionData, questionOptions, correctAns) {
        this.questionNo = questionNo;
        this.questionData = questionData;
        this.questionOptions = questionOptions;
        this.correctAns = correctAns;
    }
}

function countCal(){
const questionNumbers = [];
while (questionNumbers.length < 20) {
  const rand = Math.floor(Math.random() * 50) + 1; // random between 1 and 50
  if (!questionNumbers.includes(rand)) {
    questionNumbers.push(rand);
  }
}
// console.log(questionNumbers);
return questionNumbers;
}


function dataModify(questionNumbers ,java){
    const questionBodyForJava= [];
    console.log(questionNumbers);
for(let i=0;i<questionNumbers.length;i++){
    const no = java[questionNumbers[i]].id;
    const ans= java[questionNumbers[i]].answer;
    const question= java[questionNumbers[i]].question;
    const option= java[questionNumbers[i]].options;
    questionBodyForJava.push(new QuestionBody(no,question,option,ans));
}
return questionBodyForJava;
}

router.get("/exam",auth, async (req, res) => {
    console.log(java[0].question);
    console.log(react[0].question);
    console.log(node[0].question);
    const questionNumbers=countCal(20);
    const questionNumbersReact = countCal(20);
    const questionNumbersNodes = countCal(20);
    const javaQuestionList = (dataModify(questionNumbers,java));
    const rectQuestionList = (dataModify(questionNumbersReact,react));
    const nodeQuestionList = (dataModify(questionNumbersNodes,node));
    console.log(javaQuestionList);
    console.log(rectQuestionList);
    console.log(nodeQuestionList);

    res.json({ java:javaQuestionList,react:rectQuestionList,node:nodeQuestionList  });  // ✅ sends response to client
});



module.exports = router;