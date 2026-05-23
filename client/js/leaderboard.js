const leaderboardBody =
  document.getElementById("leaderboardBody");

async function loadLeaderboard(){

  try {

    const response = await fetch(
      "http://localhost:5000/api/result/leaderboard"
    );

    const data = await response.json();

    leaderboardBody.innerHTML = "";

    data.forEach((user, index) => {

      const row = `

        <tr>

          <td>${index + 1}</td>

          <td>${user.name}</td>

          <td>${user.score}</td>

        </tr>

      `;

      leaderboardBody.insertAdjacentHTML(
        "beforeend",
        row
      );

    });

  } catch (error) {

    console.log(error);

  }

}

loadLeaderboard();