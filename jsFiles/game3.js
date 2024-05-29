

const question=document.getElementById("question");
console.log(question);
const choices=Array.from(document.getElementsByClassName("choice-text"));
let currentQuestion={};
let acceptingAnswers=false;
let score=0;
let questionCounter=0;
let availableQuestions=[];
let questionCounterText=document.getElementById("questionCounter");
let scoreText=document.getElementById("score");
let progressbar=document.getElementById("progress-bar");
let hp=0;
let rw=0;
let lv=0;
let hg=0;
let h=0;
let lm=0;
const charr=[];
let character;


    /*,{
        question:"Which attribute is used to specify the width of a table border in HTML?",
        choice1:"border-width",
        choice2:"table-border",
        choice3:"border",
        choice4:"border-size",
        answer1:["Voldemort","Ron"],
        answer2:["Malfoy","Snape"],
        answer3:["Hermione","Hagrid"],
        answer4:["Snape"]
    },
    {
        question:"Which tag is used to define a division in HTML?",
        choice1:"<div>",
        choice2:"<section>",
        choice3:"<block>",
        choice4:"<part>",
        answer1:["Voldemort","Ron"],
        answer2:["Malfoy","Snape"],
        answer3:["Hermione","Hagrid"],
        answer4:["Snape"]
    },
    {
        question:"Which attribute is used to specify an alternate text for an image in HTML?",
        choice1:"alt",
        choice2:"title",
        choice3:"description",
        choice4:"imgalt",
        answer1:["Voldemort","Ron"],
        answer2:["Malfoy","Snape"],
        answer3:["Hermione","Hagrid"],
        answer4:["Snape"]
    },
    {
        question:"Which HTML tag is used to embed external content, such as a video or audio file, into a webpage?",
        choice1:"<external>",
        choice2:"<embed>",
        choice3:"<media>",
        choice4:"<external-content>",
        answer1:["Voldemort","Ron"],
        answer2:["Malfoy","Snape"],
        answer3:["Hermione","Hagrid"],
        answer4:["Snape"]
    },
    {
        question:"Which HTML5 feature is used to store data on the client-side and can persist even after the browser is closed?",
        choice1:"localStorage",
        choice2:"sessionStore",
        choice3:"cookieStorage",
        choice4:"browserStorage",
        answer1:["Voldemort","Ron"],
        answer2:["Malfoy","Snape"],
        answer3:["Hermione","Hagrid"],
        answer4:["Snape"]
    }
];*/
const correct_bonus=10;
let max_questions=5;


    function getNewQuestion()
    {
        if(availableQuestions.length==0 || questionCounter>=max_questions)
        {
                //alert(availableQuestions.length);
                //alert(questionCounter);
                //console.log(score);
                //alert(`Hermione ${hg}, Harry ${hp}, Ron ${rw},  Voldemort ${lv}, Malfoy ${lm}, Hagrid ${h}`);
                let maxi=Math.max(hg,hp,rw,lv,lm,h);
                if(maxi==hg) 
                {character="Hermione Granger";}
                else if(maxi==hp)
                {character="Harry Potter";}
                else if(maxi==rw)
                {character="Ronald Weasely";}
                else if(maxi==lv)
                {character="Lord Voldemort";}
                else if(maxi==lm)
                {character="Draco Malfoy";}
                else 
                {character="Rubeus Hagrid";}
                localStorage.setItem('character',character);    
                return window.location.assign("../htmlFiles/end3.html");
        }
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
            let arr=[];
            switch(selectedAnswer)
            {
                case '1':arr=currentQuestion.answer1;
                break;
                case '2':arr=currentQuestion.answer2;
                break;
                case '3':arr=currentQuestion.answer3;
                break;
                case '4':arr=currentQuestion.answer4;
                break;
            };
            //alert(arr.length);
            for(let i=0;i<arr.length;i++)
            {
                let curr=arr[i];
                switch(curr)
                {
                    case "Voldemort":lv++;
                    break;
                    case "Malfoy":lm++;
                    break;
                    case "Harry":hp++;
                    break;
                    case "Hermione":hg++;
                    break;
                    case "Ron":rw++;
                    break;
                    case "Hagrid":h++;
                };
            }
            //const classToApply=currentQuestion.answer==selectedAnswer?"correct":"incorrect";
            //selectedChoice.parentElement.classList.add(classToApply);
            /*if(classToApply=="correct")
            {
                score+=correct_bonus;
            }
            scoreText.innerHTML=score;
            setTimeout(()=>{
                selectedChoice.parentElement.classList.remove(classToApply);
                
            },1000);*/
            getNewQuestion();
            
        });
    });
    fetch('../jsonFiles/harry.json')
.then(res=>res.json())
.then(data=>{
    data.forEach(entry=>
        {
            //console.log(entry);
            availableQuestions.push(entry);
        })
        //alert(availableQuestions.length);
})
.then(startGame= ()=>
    {
        console.log(availableQuestions);
        //.log(typeof(availableQuestions));
        //score=0;
        questionCounter=0;
        getNewQuestion();
    });

    function endGame()
    {
        return window.location.assign("../htmlFiles/quizHome.html");
    }

   

    