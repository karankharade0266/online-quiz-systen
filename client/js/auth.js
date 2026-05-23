/* =========================
   LOGIN FUNCTION
========================= */

const loginForm =
document.getElementById(
  "loginForm"
);

/* =========================
   CHECK FORM EXISTS
========================= */

if(loginForm){

  loginForm.addEventListener(

    "submit",

    async (e) => {

      e.preventDefault();

      /* =========================
         GET INPUT VALUES
      ========================= */

      const email =
      document.getElementById(
        "email"
      ).value;

      const password =
      document.getElementById(
        "password"
      ).value;

      try {

        /* =========================
           LOGIN API REQUEST
        ========================= */

        const response =
        await fetch(

          "http://localhost:5000/api/auth/login",

          {
            method:"POST",

            headers:{
              "Content-Type":
              "application/json",
            },

            body:JSON.stringify({
              email,
              password,
            }),

          }

        );

        /* =========================
           RESPONSE DATA
        ========================= */

        const data =
        await response.json();

        /* =========================
           LOGIN SUCCESS
        ========================= */

        if(response.ok){

          alert(
            "Login Successful"
          );

          /* SAVE TOKEN */

          localStorage.setItem(
            "token",
            data.token
          );

          /* SAVE USER NAME */

          localStorage.setItem(
            "name",
            data.name
          );

          /* SAVE USER ROLE */

          localStorage.setItem(
            "role",
            data.role
          );

          /* REDIRECT */

          window.location.href =
          "dashboard.html";

        }

        /* =========================
           LOGIN FAILED
        ========================= */

        else{

          alert(
            data.message
          );

        }

      }

      /* =========================
         SERVER ERROR
      ========================= */

      catch (error) {

        console.log(
          error
        );

        alert(
          "Server Error"
        );

      }

    }

  );

}