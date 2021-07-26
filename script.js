// Initial Data

let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

//Functions

function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let percent = Math.floor((currentQuestion / questions.length) * 100);

    document.querySelector('.progress--bar').style.width = `${percent}%`;

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";

    document.querySelector(".question").innerHTML = q.question;
    let optionsHtml = '';
    for (let i in q.options) {
      optionsHtml += `<div data-op=${i} class='option'><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
    }
    document.querySelector(".options").innerHTML = optionsHtml;

    document.querySelectorAll('.options .option').forEach(item => {
      item.addEventListener('click', optionClickEvent)
    })
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute('data-op'));
  if(questions[currentQuestion].answer === clickedOption) {
    correctAnswers ++;
  }
  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if(points < 30) {
    document.querySelector('.scoreText1').innerHTML = 'Tá ruim, hein?';
    document.querySelector('.scorePct').style.color = '#ff0000';
  } else if (points >= 30 && points < 70) {
    document.querySelector('.scoreText1').innerHTML = 'Tá bom, mas pode melhorar...';
    document.querySelector('.scorePct').style.color = '#ffff00';
  } else if (points >= 70){
    document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
    document.querySelector('.scorePct').style.color = '#0d630d';
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

  document.querySelector('.progress--bar').style.width = '100%';
  document.querySelector(".questionArea").style.display = "none"; 
  document.querySelector(".scoreArea").style.display = "block";
}

function resetEvent() {
  currentQuestion = 0;
  correctAnswers = 0;
  showQuestion();
}