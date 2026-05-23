/* =========================
   FETCH ALL QUIZZES
========================= */

const quizContainer =
document.getElementById(
  "quizContainer"
);

async function fetchQuizzes(){

  try{

    const response =
    await fetch(
      "http://localhost:5000/api/quiz"
    );

    const quizzes =
    await response.json();

    displayQuizzes(
      quizzes
    );

  }

  catch(error){

    console.log(error);

  }

}

/* =========================
   DISPLAY QUIZZES
========================= */

function displayQuizzes(
  quizzes
){

  quizContainer.innerHTML =
  "";

  quizzes.forEach(
    (quiz) => {

      const card =
      document.createElement(
        "div"
      );

      card.classList.add(
        "quiz-card"
      );

      card.innerHTML =

      `
      <h2>
        ${quiz.title}
      </h2>

      <button
        onclick="
        startQuiz(
          '${quiz._id}'
        )
        "
      >
        Start Quiz
      </button>
      `;

      quizContainer.appendChild(
        card
      );

    }
  );

}

/* =========================
   START QUIZ
========================= */

function startQuiz(id){

  localStorage.setItem(
    "quizId",
    id
  );

  window.location.href =
  "attempt-quiz.html";

}

/* =========================
   INITIAL CALL
========================= */

fetchQuizzes();