/* =========================
   GET USER DATA
========================= */

const name =
localStorage.getItem(
  "name"
);

const role =
localStorage.getItem(
  "role"
);

/* =========================
   SET USER NAME
========================= */

document.getElementById(
  "welcomeText"
).innerText =
`Welcome ${name} 👋`;

/* =========================
   LOGOUT
========================= */

const logoutBtn =
document.getElementById(
  "logoutBtn"
);

logoutBtn.addEventListener(
  "click",
  ()=>{

    localStorage.clear();

    window.location.href =
    "login.html";

  }
);

/* =========================
   SIDEBAR
========================= */

const sidebar =
document.querySelector(
  ".sidebar ul"
);

/* =========================
   ROLE BASED MENU
========================= */

if(role === "teacher"){

  sidebar.innerHTML += `

    <li
      onclick="
      window.location.href=
      'create-quiz.html'
      "
    >

      <i class="fa-solid fa-plus"></i>

      Create Quiz

    </li>

  `;

}else{

  sidebar.innerHTML += `

    <li
      onclick="
      window.location.href=
      'quiz-list.html'
      "
    >

      <i class="fa-solid fa-pen"></i>

      Start Quiz

    </li>

  `;

}

/* =========================
   QUIZ TABLE
========================= */

const quizTableBody =
document.getElementById(
  "quizTableBody"
);

/* =========================
   LOAD QUIZZES
========================= */

async function loadQuizzes(){

  try{

    const response =
    await fetch(
      "http://localhost:5000/api/quiz"
    );

    const quizzes =
    await response.json();

    document.getElementById(
      "quizCount"
    ).innerText =
    quizzes.length;

    quizTableBody.innerHTML =
    "";

    if(quizzes.length === 0){

      quizTableBody.innerHTML = `

        <tr>

          <td colspan="3">

            No Quiz Available

          </td>

        </tr>

      `;

      return;

    }

    quizzes.forEach((quiz)=>{

      quizTableBody.innerHTML += `

        <tr>

          <td>
            ${quiz.title}
          </td>

          <td>
            ${quiz.subject || "General"}
          </td>

          <td>

            <button
              class="start-btn"
              onclick="
              startQuiz(
                '${quiz._id}'
              )
              "
            >

              Start Quiz

            </button>

            ${
              role === "teacher"

              ?

              `

              <button
                class="delete-btn"
                onclick="
                deleteQuiz(
                  '${quiz._id}'
                )
                "
              >

                Delete

              </button>

              `

              :

              ""

            }

          </td>

        </tr>

      `;

    });

  }catch(error){

    console.log(error);

  }

}

/* =========================
   START QUIZ
========================= */

function startQuiz(id){

  window.location.href =
  `attempt-quiz.html?id=${id}`;

}

/* =========================
   DELETE QUIZ
========================= */

async function deleteQuiz(id){

  const confirmDelete =
  confirm(
    "Delete This Quiz?"
  );

  if(!confirmDelete){

    return;

  }

  try{

    const response =
    await fetch(

      `http://localhost:5000/api/quiz/${id}`,

      {
        method:"DELETE"
      }

    );

    const data =
    await response.json();

    alert(data.message);

    loadQuizzes();

  }catch(error){

    console.log(error);

  }

}

/* =========================
   RUN
========================= */

loadQuizzes();