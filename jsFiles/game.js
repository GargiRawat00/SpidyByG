

const question=document.getElementById("question");
//console.log(question);
const choices=Array.from(document.getElementsByClassName("choice-text"));
let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let questionCounter=0;
let availableQuestions=[];
let questionCounterText=document.getElementById("questionCounter");
let scoreText=document.getElementById("score");
let progressbar=document.getElementById("progress-bar");
const correct_bonus=10;
let max_questions=10;
let quizNum;
//alert(quizNum);

    function getNewQuestion()
    {
        //alert("yes");
        if(availableQuestions.length==0 || questionCounter>=max_questions)
        {
                //alert(availableQuestions.length);
                //alert(questionCounter);
                //console.log(score);
                localStorage.setItem('recentScore',score);            
                return window.location.assign("../htmlFiles/end.html");
        }
        //alert("yes again");
        questionCounter++;
        progressbar.style.grid=`0.6rem/${questionCounter}fr ${max_questions-questionCounter}fr `;
        let questionIndex=Math.floor(Math.random()*availableQuestions.length);
        //console.log("questionIndex is",questionIndex);
        currentQuestion=availableQuestions[questionIndex];
        //console.log(currentQuestion);
        questionCounterText.innerText=questionCounter+"/"+max_questions;
        question.innerText=currentQuestion.question;
        choices.forEach(choice=>{
            const number=choice.dataset['number'];
            choice.innerText=currentQuestion['choice'+number];
        });
        availableQuestions.splice(questionIndex,1);
        acceptingAnswers=true;
    };
    choices.forEach(choice=>{
        choice.addEventListener('click',e=>{
            if(!acceptingAnswers) return;
            acceptingAnswers=false;
            const selectedChoice=e.target;
            const selectedAnswer=selectedChoice.dataset["number"];
            const classToApply=currentQuestion.answer==selectedAnswer?"correct":"incorrect";
            selectedChoice.parentElement.classList.add(classToApply);
            if(classToApply=="correct")
            {
                score+=correct_bonus;
            }
            scoreText.innerHTML=score;
            setTimeout(()=>{
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            },1000);
            
        });
    });

    function jsonLoad()
    {
        quizNum=localStorage.getItem('quizNum');
        //alert(typeof(quizNum));
    switch(quizNum)
{
    case "1":{
        //alert("yes1");
        fetch('../jsonFiles/html.json')
        .then(res=>res.json())
        .then(data=>{
        data.forEach(entry=>
        {
            availableQuestions.push(entry);
        })
        })
        .then(startGame= ()=>{
            
            score=0;
            questionCounter=0;
            
            getNewQuestion();});
        }
    break;
    case "2":{
        //alert("yes2");
        fetch('../jsonFiles/css.json')
        .then(res=>res.json())
        .then(data=>{
        data.forEach(entry=>
        {
            //console.log(entry);
            availableQuestions.push(entry);
        })
    })
        //alert(availableQuestions.length);
        .then(startGame= ()=>{score=0;
        questionCounter=0;
        getNewQuestion();})
        };
    break;
    case "3":{
        //alert("yes3");
        fetch('../jsonFiles/javascript.json')
        .then(res=>res.json())
        .then(data=>{
        data.forEach(entry=>
        {
            //console.log(entry);
            availableQuestions.push(entry);
        })
        //alert(availableQuestions.length);
        })
        .then(startGame=()=>{score=0;
            questionCounter=0;
            getNewQuestion();})
            };
    break;
};

    }
    jsonLoad();
    function endGame()
    {
        localStorage.setItem('recentScore',score);      
        return window.location.assign("../htmlFiles/end.html");
    }