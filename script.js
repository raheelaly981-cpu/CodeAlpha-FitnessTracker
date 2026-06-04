let data = JSON.parse(localStorage.getItem("fitnessData")) || [];
const GOAL = 10000;

function addData() {
  let steps = document.getElementById("steps").value;
  let workout = document.getElementById("workout").value;
  let minutes = document.getElementById("minutes").value;

  if (!steps || !workout || !minutes) {
    alert("Please fill all fields");
    return;
  }

  let calories = Math.round(minutes * 5 + steps * 0.04);

  let entry = {
    steps: Number(steps),
    workout,
    minutes: Number(minutes),
    calories
  };

  data.push(entry);
  localStorage.setItem("fitnessData", JSON.stringify(data));

  updateUI();

  // clear inputs
  document.getElementById("steps").value = "";
  document.getElementById("workout").value = "";
  document.getElementById("minutes").value = "";
}

function updateUI() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let totalSteps = 0;
  let totalCalories = 0;

  data.forEach((item, index) => {
    totalSteps += item.steps;
    totalCalories += item.calories;

    let li = document.createElement("li");
    li.innerHTML = `
      <span>${item.workout} - ${item.steps} steps - ${item.calories} kcal</span>
      <button onclick="deleteItem(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("totalSteps").innerText = totalSteps;
  document.getElementById("totalCalories").innerText = totalCalories;

  // Progress bar logic
  let percent = Math.min((totalSteps / GOAL) * 100, 100);

  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressText").innerText =
    Math.round(percent) + "% (" + totalSteps + "/" + GOAL + ")";
}

function deleteItem(index) {
  data.splice(index, 1);
  localStorage.setItem("fitnessData", JSON.stringify(data));
  updateUI();
}

updateUI();