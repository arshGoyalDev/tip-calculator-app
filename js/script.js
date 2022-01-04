let amountInputBox = document.getElementById('bill-amount');
let personInputBox = document.getElementById('number-of-people');
let customInputBox  = document.querySelector('.custom');
let tipBtn = document.querySelectorAll('.tip');
let totalTipAmount = document.querySelector('.tip-total-amount');
let totalBillAmount = document.querySelector('.total-bill-amount');
let error = document.querySelectorAll('.error');
let resetBtn = document.querySelector('.reset-btn');

let amount = 0, people = 1, tip = 0;


// ------------------- tip button ------------------- //
tipBtn.forEach(e =>{
  e.addEventListener('click', () => {
    if (e.classList.contains('selected')) {
      e.classList.remove('selected');
      e.classList.add('unselected');
    } else {
      tipBtn.forEach(btn => {
        btn.classList.add('unselected');
        btn.classList.remove('selected');

      })
      e.classList.remove("unselected");
      e.classList.add('selected'); 

      tip = parseFloat(e.value);
    }
    customInputBox.value = "";
    results();
  })
})

// -------------------- custom tip ----------------------- //
customInputBox.addEventListener('input', () => {
  if (customInputBox.value  <= -1){
    customInputBox.value = "";
  } 
  tip = parseFloat(customInputBox.value);
  results();

  tipBtn.forEach(e => {
    e.classList.remove('selected');
    e.classList.add('unselected');
  })
})

// ------------------- bill amount -------------------- //
amountInputBox.addEventListener('input', () => {
  if (amountInputBox.value <= -1) {
    amountInputBox.classList.add("error-input");
    error[0].style.visibility = 'visible';
  } else {
    amountInputBox.classList.remove("error-input");
    error[0].style.visibility = 'hidden';
    amount = parseFloat(amountInputBox.value);
  }
  results()
})

// ----------------- number of people input box ---------------- //
personInputBox.addEventListener('input', () => {
  if (personInputBox.value <= 0 || personInputBox.value.includes("-")) {
    personInputBox.classList.add('error-input');
    error[1].style.visibility = 'visible';
  } else {    
    error[1].style.visibility = 'hidden';
    personInputBox.classList.remove('error-input')
    people  = parseFloat(personInputBox.value);
  }
  results();
})

// ---------------------- reset button ---------------------- //
resetBtn.addEventListener('click', () => {
  amount = 0; people = 1; tip = 0;
 
  personInputBox.value = 1;
  amountInputBox.value = "";
  customInputBox.value = "";
 
  totalTipAmount.innerText = "$0.00"
  totalBillAmount.innerText = "$0.00"

  tipBtn.forEach(e => {
    if (e.classList.contains('selected'))
      e.classList.remove('selected');
      e.classList.add('unselected');
  })
})

// -------------------- calculating results ----------------------- //
function results(){
  if (amount >= 0 && people >= 1 && tip >=0) {
    let totalTip = (tip*amount)/(100); 
    totalTipAmount.innerText = `$${(totalTip / people).toFixed(2)}`;

    let totalAmount =  (amount + totalTip);
    totalBillAmount.innerText = `$${(totalAmount / people).toFixed(2)}`;
  }
}