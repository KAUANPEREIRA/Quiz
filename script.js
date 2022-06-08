let currentQuestions = 0//questão atual
let correctAnsewrs = 0 // questões corretas

//função para mostrar questões
showQuestions()
//evento
document.querySelector('.scoreArea button').addEventListener('click',resetEvent)

function showQuestions (){
    if(questions[currentQuestions]){
        let q = questions[currentQuestions]
        let pct =Math.floor((currentQuestions/questions.length)*100)
        document.querySelector('.progress--bar').style.width=`${pct}%`

        document.querySelector('.scoreArea').style.display='none'
        document.querySelector('.questionArea').style.display='block'

        document.querySelector('.question').innerHTML = q.question
        let optionsHtml = ' '
        //loop para exibir as questões
        for(let i in q.options){
            optionsHtml+=`<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`
        }

        document.querySelector('.options').innerHTML=optionsHtml

        document.querySelectorAll('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent)
        })

    }else{
        //acabaram as questões
        finishQuiz()
    }
}

//funcao que trabalha com as questões contabiliza os acertos e passa para proxima
function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'))
    if(questions[currentQuestions].answer===clickedOption){
        correctAnsewrs++
        
    }
    currentQuestions++
    showQuestions()

}

//função com a parte final do quiz
function finishQuiz(){

    let points = Math.floor((correctAnsewrs/questions.length)*100)

    if(points<30){
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim hein !'
        document.querySelector('.scorePct').style.color='#ff0000'

    }else if(points>=30 && points<70){
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom !'
        document.querySelector('.scorePct').style.color='#ffff00'

    }else if(points>=70){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').style.color='#0d630d'

    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu 10 questões e acertou ${correctAnsewrs}` 

    document.querySelector('.scoreArea').style.display='block'
    document.querySelector('.questionArea').style.display='none'
    document.querySelector('.progress--bar').style.width=`100%`

}

function resetEvent (){
    correctAnsewrs = 0
    currentQuestions=0
    showQuestions()
}