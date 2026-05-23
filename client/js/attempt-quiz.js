/* =========================
   ELEMENTS
========================= */

const quizTitle =
document.getElementById(
  "quizTitle"
);

const quizQuestions =
document.getElementById(
  "quizQuestions"
);

const timerElement =
document.getElementById(
  "timer"
);

const submitQuizBtn =
document.getElementById(
  "submitQuizBtn"
);

/* =========================
   GET QUIZ ID
========================= */

const params =
new URLSearchParams(
  window.location.search
);

const quizId =
params.get("id");

/* =========================
   VARIABLES
========================= */

let currentQuiz;

let timeLeft = 600;

/* =========================
   LOAD QUIZ
========================= */

async function loadQuiz(){

  try{

    const response =
    await fetch(
      `http://localhost:5000/api/quiz/${quizId}`
    );

    const quiz =
    await response.json();

    currentQuiz = quiz;

    quizTitle.innerText =
    quiz.title;

    showQuestions(
      quiz.questions
    );

    startTimer();

  }catch(error){

    console.log(error);

  }

}

/* =========================
   SHOW QUESTIONS
========================= */

function showQuestions(
  questions
){

  quizQuestions.innerHTML =
  "";

  questions.forEach(

    (q,index)=>{

      quizQuestions.innerHTML += `

        <div class="question-box">

          <h3>

            Q${index+1}.
            ${q.question}

          </h3>

          ${q.options.map(

            option => `

              <label>

                <input
                  type="radio"
                  name="question${index}"
                  value="${option}"
                >

                ${option}

              </label>

              <br><br>

            `

          ).join("")}

        </div>

      `;

    }

  );

}

/* =========================
   TIMER
========================= */

function startTimer(){

  const timer =
  setInterval(()=>{

    const minutes =
    Math.floor(timeLeft / 60);

    const seconds =
    timeLeft % 60;

    timerElement.innerText =

    `Time Left:
    ${minutes}:
    ${seconds < 10 ? "0" : ""}
    ${seconds}`;

    timeLeft--;

    if(timeLeft < 0){

      clearInterval(timer);

      submitQuiz();

    }

  },1000);

}

/* =========================
   CALCULATE SCORE
========================= */

function calculateScore(){

  let score = 0;

  currentQuiz.questions.forEach(

    (q,index)=>{

      const selected =
      document.querySelector(

        `input[name="question${index}"]:checked`

      );

      if(

        selected &&

        selected.value ===
        q.correctAnswer

      ){

        score++;

      }

    }

  );

  return score;

}

/* =========================
   SUBMIT QUIZ
========================= */

function submitQuiz(){

  const score =
  calculateScore();

  localStorage.setItem(
    "score",
    score
  );

  localStorage.setItem(
    "totalQuestions",
    currentQuiz.questions.length
  );

  window.location.href =
  "result.html";

}

/* =========================
   SUBMIT BUTTON
========================= */

submitQuizBtn.addEventListener(
  "click",
  submitQuiz
);

/* =========================
   RUN
========================= */

loadQuiz();