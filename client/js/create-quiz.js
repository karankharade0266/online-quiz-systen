const addQuestionBtn =
  document.getElementById("addQuestionBtn");

const questionsContainer =
  document.getElementById("questionsContainer");

const quizForm =
  document.getElementById("quizForm");

let questionCount = 0;

addQuestionBtn.addEventListener("click", () => {

  questionCount++;

  const questionHTML = `

    <div class="question-box">

      <h3>Question ${questionCount}</h3>

      <input
        type="text"
        class="question"
        placeholder="Enter Question"
        required
      >

      <input
        type="text"
        class="option"
        placeholder="Option 1"
        required
      >

      <input
        type="text"
        class="option"
        placeholder="Option 2"
        required
      >

      <input
        type="text"
        class="option"
        placeholder="Option 3"
        required
      >

      <input
        type="text"
        class="option"
        placeholder="Option 4"
        required
      >

      <input
        type="text"
        class="correctAnswer"
        placeholder="Correct Answer"
        required
      >

    </div>

  `;

  questionsContainer.insertAdjacentHTML(
    "beforeend",
    questionHTML
  );

});

quizForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const title =
    document.getElementById("title").value;

  const subject =
    document.getElementById("subject").value;

  const timer =
    document.getElementById("timer").value;

  const questionBoxes =
    document.querySelectorAll(".question-box");

  const questions = [];

  questionBoxes.forEach((box) => {

    const question =
      box.querySelector(".question").value;

    const options =
      Array.from(
        box.querySelectorAll(".option")
      ).map((option) => option.value);

    const correctAnswer =
      box.querySelector(".correctAnswer").value;

    questions.push({
      question,
      options,
      correctAnswer,
    });

  });

  const quizData = {
    title,
    subject,
    timer,
    questions,
  };

  try {

    const response = await fetch(
      "http://localhost:5000/api/quiz/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(quizData),
      }
    );

    const data = await response.json();

    if(response.ok){

      alert("Quiz Created Successfully");

      console.log(data);

    }else{

      alert(data.message);

    }

  } catch (error) {

    console.log(error);

  }

});