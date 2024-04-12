const BASE_URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_B6IMC3NsHNgFN6OjGhzCxNLZxyxApjb0xCWOnMDw";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  console.log(select);
  for (let currCode in countryList) {
    //creating new option
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    // if (select.name === "from" && currCode === "USD") {
    //   newOption.selected = "selected";
    // } else if (select.name === "to" && currCode === "INR") {
    //   newOption.selected = "selected";
    // }
    // select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
      select.append(newOption);
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
      select.append(newOption);
    }
    if (select.name === "to" && currCode !== "INR") {
      select.append(newOption);
    }
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    console.log(evt);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  // console.log(fromCurr.value);
  // console.log(toCurr.value);

  const URL = `${BASE_URL}`;
  let response = await fetch(URL);
  let data = await response.json();
  // update
  let rate = data["data"][toCurr.value]["value"];

  console.log(rate);
  let finalAmount = amtVal * rate;
  //   console.log(rate);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); //page refresh and auto work will off;
  updateExchangeRate();
});

//1st time when the document will load
// window.addEventListener("load", () => {
//   updateExchangeRate();
// });
// console.log(toCurr);
