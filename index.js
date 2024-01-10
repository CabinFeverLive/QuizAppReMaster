const quiz = [{
    id: 1, question: "In the Tekken fighting series, who is the character that grapples and has an animals head?",
     choices: ["Nina", "Hihachi", "King", "Panda"],
     answer: 2
 },{
     id: 2, question: "Which Battle Royale came first?",
     choices: ["Fortnite", "PUBG", "Ring of Elysium", "H1Z1"],
     answer: 3
 
 },{ id: 3, question: "Complete the following iconic warning: It's dangerous to go alone...",
     choices: ["...take this sword", "...take this.", "...take that", "...be careful!"],
     answer: 1
 
 },{
     id: 4, question: "Direct X is in conjucnction with the following console...",
     choices:['Xbox','Playstation 4','Nintendo Switch','Sega'],
     answer: 0
 },{
     id :5, question: "During the alpha phase of PUBG which of the following places where you able to land?",
     choices: ['Pecado', 'Pochinki','Bootcamp','Pai Nan'],
     answer: 1
 }
 ]
 let currentQuestion = 0
 let score = 0 
 
 function renderTemplate(quiz) {
     console.log(currentQuestion)
    let template = ''
 
         template += `<div class='quiz question'>${quiz[currentQuestion].question}</div>`
         quiz[currentQuestion].choices.forEach((choice, index) => {
            if (index == 0 || index == 2) {
                template += `<input id='q${index}' class='choices buttonleft' value='${index}' alt='choice ${index}' type='radio' name='answers' ></input><label for='q${index}' class='choice left'>${choice}</label>`
            }
            
            if (index == 1 || index == 3) {
                template += `<input id='q${index}' class='choices buttonright' value='${index}' alt='choice ${index}' type='radio' name='answers' ></input><label for='q${index}' class='choice right'>${choice}</label>`
            }
            });
         template += `<div><button class='finalAnswer' alt='submits answer' type='submit'>Final Answer</button></div>`
         template += `<div class='quiz score'> Your current score is : ${score} out of 5 </div>`
 
     $('#quiz').html(template)
 
 }

 

 function renderQuizInitiator(){
     $('#quizContainer').html( `
        <section>Welcome to the videogame knowledge quiz<br/>  
       <button id='startQuiz' alt='starts quiz' type='submit'>Start the Quiz </button>
     </section>`)
        $('#quizContainer, #quiz').show();
        // $('#resultPage').hide();
     $('#startQuiz').on('click', function () {
         console.log('Active Click')
        renderTemplate(quiz)
        $('#quizContainer').hide()
    });
     $( "#startQuiz" ).keydown(function( event ) {
        if ( event.which == 13 ) {
        renderTemplate(quiz)
        $('#quizContainer').hide()
         event.preventDefault();
        }
    });
        
 }
 

 function quizRegulator(){
     if (currentQuestion < quiz.length){
        renderQuizInitiator();
     }
 }
 
 function createSubmitHandler(){
     $('#quiz').submit(event => {
         event.preventDefault();
         const val = getVal();
         console.log(val);
         proccessVal(val);
        //  getNextQuestion();
        //  renderTemplate(quiz);
        //    console.log(score)
        //value will lead to the logic of checking if the anwser is correct 
        //getVal()
        //processVal()
        //getNextQuestion() 
        console.log('current question:', currentQuestion)
        // if (currentQuestion <= quiz.length - 1){
            getNextQuestion();
            renderTemplate(quiz)
            console.log(score)
        // }
     });
 }
 
 function restartHandler(){
     $('#restartQuiz').click(function(){
         currentQuestion = 0
         score = 0
         $('#quiz').html('').hide()
         $('#resultPage').html('').hide();
         quizRegulator();

     } );
 }
 
 function getVal(){
     // return index of selected radio choice
     return $('input[name="answers"]:checked').val();
 }
 
 function proccessVal(val){
     var parsed = parseInt(val, 10);
     
     const correctIndex = quiz[currentQuestion].answer
    //  quiz[currentQuestion].choices[correctIndex]

  if (parsed === correctIndex ){
      alert('Correct Choice');
      updateScore();
  }
  else{
      alert(`The correct choice was: ${quiz[currentQuestion].choices[correctIndex]}`)
      //place what is above into a variable to refer to that; cleans up the code!
      
  }

 }
 
 // function renderTemplate(quiz) {
 //     let template = ''
 //     quiz.forEach(item => {
 //         template += `<div>${quiz[0].question}<br/>`
 //         quiz.choices.forEach(choice => {
 //             template += `<input type='radio'>${choice}<br />`
 //         })
 //         template += `<button type='submit'>Submit</button></div>`
 
 //     })
 //     $('#quiz').html(template)
 
 // }

 // function getQuestionOnebyOne(){
 //     const currentQuestion = 0
 //     quiz[currentQuestion]
 // }
 


 function getNextQuestion(){
    
     if(currentQuestion < quiz.length - 1){
         currentQuestion++
     }
     else{
         console.log('hey...arent you supposed to reset')
        $('#quiz').hide();
     $('#resultPage').html(`<section>Congratulations! here is your score: ${score} out of 5!<br/>  
         <button id='restartQuiz' alt='restarts quiz' type='button'>Restart the Quiz </button>
       </section>`)
       $('#resultPage').show()
       restartHandler();
     }
 }
 // create a cap based on the length of questions given, consider what to do once the end of the questions length is reached (overview - reveal score + restart quiz)
 function updateScore(){
     score++
 }

 $(function(){ 
    quizRegulator();
    // renderQuizInitiator();
    // renderTemplate(quiz); 
    createSubmitHandler();

});
 

 
 
 //1_Starting Screen
 //2_Question Prompt, based off of arrays for the questions and arrays from the answers questions will be prompt to user one by one
 //user should not beable to skip questions without answering or recieving the correct answer, granted they answer incorrectly
 //3_Users should beable to see which question they are on and which questions they have gotten correct from the once in which they didnt within footer
 //4_User will be shown their overall grade for the quiz at the end and also will be given a chance to restart the quiz upon a press of a button 
