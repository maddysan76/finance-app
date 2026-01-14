const formatDate = (monthsToGoal) => {
  const now = new Date();
  const future = new Date(now.getFullYear(), now.getMonth() + monthsToGoal, 1);
  return future.toLocaleString("en-US", { month: "long", year: "numeric" });
};

const estimateGoalDate = (current, goal, monthly) => {
  if (monthly <= 0 || goal <= current) {
    return null;
  }
  const remaining = goal - current;
  const months = Math.ceil(remaining / monthly);
  return formatDate(months);
};

const goalForms = document.querySelectorAll(".goal-form");

goalForms.forEach((form) => {
  const inputs = Array.from(form.querySelectorAll("input"));
  const output = form.querySelector(".goal-output strong");

  const update = () => {
    const [currentInput, goalInput, monthlyInput] = inputs;
    const current = Number(currentInput.value) || 0;
    const goal = Number(goalInput.value) || 0;
    const monthly = Number(monthlyInput.value) || 0;
    const date = estimateGoalDate(current, goal, monthly);

    if (date) {
      output.textContent = date;
    } else {
      output.textContent = "Enter your numbers";
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("input", update);
  });

  update();
});
