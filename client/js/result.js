/* =========================
   GET SCORE
========================= */

const score =
localStorage.getItem(
  "score"
);

const total =
localStorage.getItem(
  "totalQuestions"
);

/* =========================
   SHOW RESULT
========================= */

document.getElementById(
  "score"
).innerText =

`${score} / ${total}`;

/* =========================
   SAVE RESULT
========================= */

async function saveResult(){

  const name =
  localStorage.getItem(
    "name"
  ) || "Student";

  try {

    const response =
    await fetch(

      "http://localhost:5000/api/result/save",

      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json",
        },

        body:JSON.stringify({

          name,
          score,
          total

        }),

      }

    );

    const data =
    await response.json();

    console.log(data);

  } catch (error) {

    console.log(error);

  }

}

/* =========================
   RUN
========================= */

saveResult();