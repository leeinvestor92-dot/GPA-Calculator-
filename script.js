function addCourse(name="", grade="5", units="") {
  const div = document.createElement("div");
  div.classList.add("course");

  div.innerHTML = `
    <input placeholder="Course" value="${name}">
    <select>
      <option value="5">A</option>
      <option value="4">B</option>
      <option value="3">C</option>
      <option value="2">D</option>
      <option value="1">E</option>
      <option value="0">F</option>
    </select>
    <input type="number" placeholder="Units" value="${units}">
    <button onclick="this.parentElement.remove()">❌</button>
  `;

  div.children[1].value = grade;
  document.getElementById("courses").appendChild(div);
}

function calculateGPA() {
  let totalPoints = 0, totalUnits = 0;

  document.querySelectorAll(".course").forEach(r => {
    let g = +r.children[1].value;
    let u = +r.children[2].value;

    if (u > 0) {
      totalPoints += g * u;
      totalUnits += u;
    }
  });

  if (!totalUnits) return;

  let gpa = totalPoints / totalUnits;

  document.getElementById("gpa").innerText =
    "GPA: " + gpa.toFixed(2);

  return gpa;
}

function saveSemester() {
  let gpa = calculateGPA();
  if (!gpa) return;

  let data = JSON.parse(localStorage.getItem("sem")) || [];
  data.push(gpa);

  localStorage.setItem("sem", JSON.stringify(data));

  updateCGPA();
  drawChart();
}

function updateCGPA() {
  let data = JSON.parse(localStorage.getItem("sem")) || [];
  if (!data.length) return;

  let avg = data.reduce((a,b)=>a+b,0)/data.length;

  document.getElementById("cgpa").innerText =
    "CGPA: " + avg.toFixed(2);
}

function resetAll() {
  localStorage.clear();
  location.reload();
}

function drawChart() {
  let data = JSON.parse(localStorage.getItem("sem")) || [];

  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: data.map((_,i)=>"Sem "+(i+1)),
      datasets: [{
        label: "GPA Trend",
        data: data
      }]
    }
  });
}

updateCGPA();
drawChart();