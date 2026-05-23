/* =========================
   CHART ANALYTICS
========================= */

const ctx =
document.getElementById(
  "analyticsChart"
);

new Chart(ctx, {

  type:"bar",

  data:{

    labels:[
      "HTML",
      "CSS",
      "JavaScript",
      "MongoDB",
      "Node.js"
    ],

    datasets:[{

      label:"Quiz Performance",

      data:[
        85,
        90,
        78,
        88,
        95
      ],

      borderWidth:1

    }]

  }

});