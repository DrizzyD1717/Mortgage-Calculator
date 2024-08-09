const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interestonly");
const form = document.getElementById("form");
const submit = document.getElementById("submit");
const resultsPage = document.querySelector(".results");
const initialResultsPage = document.querySelector(".empty");
const submitButton = document.querySelector(".submit");
const clearAll = document.querySelector(".clearAll");

const error = (element, message, color) => {
  let inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".errorMessage");
  errorDisplay.innerText = message;
  element.classList.add("failure");
  const indicator = inputControl.querySelector("span");
  indicator.style.background = color;
};

const validateInputs = () => {
  if (amount.value == "" || amount.value == null) {
    error(amount.parentElement, "This field is required", "red");
    handleBorder(amount, "red");
  } else if (amount.value != "") {
    error(amount.parentElement, "", "var(--lime)");
    handleBorder(amount, "var(--lime)");
  }

  if (term.value == "") {
    error(term.parentElement, "This field is required", "red");
    handleBorder(term, "red");
  } else {
    error(term.parentElement, "", "var(--lime)");
    handleBorder(term, "var(--lime)");
  }

  if (rate.value == "") {
    error(rate.parentElement, "This field is required", "red");
    handleBorder(rate, "red");
  } else {
    error(rate.parentElement, "", "var(--lime)");
    handleBorder(rate, "var(--lime)");
  }

  if (repayment.checked) {
    paymentCalculations();
  }

  if (!repayment.checked || !interestOnly.checked) {
    error(repayment.parentElement, "This field is required");
  } else {
    error(repayment.parentElement, "", "var(--lime)");
  }
  //   else if (isNumberType(amount.value)) {
  //     console.log(amount.value);
  //     error(amount.parentElement, "Amount should be a number");
  //   }
};

// const isNumberType = (input) => {
//   console.log(`this is ${input}`);
//   return typeof input === "number";
// };

const paymentCalculations = () => {
  let p = amount.value;
  let rateR = rate.value;
  let number = term.value;
  let n = number * 12;
  let r = rateR / (100 * 12);
  let po = Math.pow(1 + r, n);
  let m = Math.floor((p * r * po) / (po - 1));
  let totalRepayment = m * n;

  //

  const monthlyResults = document.querySelector(".monthlyResultsValue");
  const termResults = document.querySelector(".termResultsValue");

  monthlyResults.innerText = `€${m}`;
  termResults.innerText = `€${totalRepayment}`;
};

submitButton.addEventListener("click", () => {
  resultsPage.classList.remove("hidden");
  initialResultsPage.classList.add("hidden");
  radio();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  paymentCalculations();
});

clearAll.addEventListener("click", () => {
  const monthlyResults = document.querySelector(".monthlyResultsValue");
  const termResults = document.querySelector(".termResultsValue");
  amount.value = "";
  term.value = "";
  rate.value = "";
  monthlyResults.textContent = "";
  termResults.textContent = "";
});

const handleBorder = (element, color) => {
  element.style.borderColor = color;
};
