$(document).ready(function() {

  
    // Creating an object to hold our questions.
    var questions = [{
      question: "Which Star Wars movie was filmed entirely in the studio?",
      answers: ["Revenge of the Sith", "Attach of the Clones", "Return of the Jedi", "Star Wars"],
      correctAnswer: "Revenge of the Sith"
    },
    {
      question: "In Episode VI: Return of the Jedi, the growls and sounds of the Rancor in Jabba's Palace were actually made by what animal?",
      answers: ["Panther", "Wolverine", "Dashund", "Pigeon"],
      correctAnswer: "Dashund"
    },
    {
      question: "Approximately how many languages can C-3PO speak",
      answers: ["6 Thousand", "6 Billion", "6 Trillion", "6 Million"],
      correctAnswer: "6 Million"
    },
    {
      question: "Who is the only non Jedi in the original Star Wars trilogy to use a lightsaber?",
      answers: ["R2-D2", "Princess Leia", "Chewbacca", "Han Solo"],
      correctAnswer: "Han Solo"
    },
    {
      question: "What actor pulled out of Episode III: Revenge of the Sith when he discovered that non-union actors were being used in the film?",
      answers: ["Gary Oldman", "Gary Coleman", "Mel Gibson", "George Clooney"],
      correctAnswer: "Gary Oldman"
    }
  
  ];
  
    // variables to set interval and counter
    var timer;
    var countDown = 20;
  
    var viewPort = $("#question");
  
    // creating the game object to hold the functions and variables to the game
    document.getElementById("start").onclick = function startBtn() {
      document.getElementById("main").classList.add("display");
  
  
    var game = {
      questions: questions,
      currentQuestion: 0,
      counter: countDown,
      correct: 0,
      incorrect: 0,
  
    // Timer countdown function
      countdown: function() {
        game.counter--;
        $("#counter-num").text(game.counter);
        if (game.counter === 0) {
          game.timeUp();
        }
      },
  
      // Display counter in h2 tag
      loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
  
        viewPort.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
  
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
          viewPort.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
          + "'>" + questions[this.currentQuestion].answers[i] + "</button><br>");
        }
      },
  
      nextQuestion: function() {
        game.counter = countDown;
        $("#counter-num").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
      },
  
      timeUp: function() {
  
        clearInterval(timer);
  
        $("#counter-num").html(game.counter);
  
        viewPort.html("<h2>Out of Time!</h2>");
        viewPort.append("<h2>The Correct Answer Was: " + questions[this.currentQuestion].correctAnswer + "</h2>");
  
        if (game.currentQuestion === questions.length - 1) {
          setTimeout(game.results, 3 * 1000);
        }
        else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
      },
  
      // Show results after game is complete
      results: function() {
  
        clearInterval(timer);
  
        viewPort.html("<h2>Quiz Complete, here is how you did!</h2>");
  
        $("#counter-num").text(game.counter);
  
        viewPort.append("<h2>Correct Answers: " + game.correct + "</h2>");
        viewPort.append("<h2>Incorrect Answers: " + game.incorrect + "</h2>");
        viewPort.append("<h2>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h2>");
        viewPort.append("<br><button id='start-over'>Start Over?</button>");
      },
  
      clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
          this.answeredCorrectly();
        }
        else {
          this.answeredIncorrectly();
        }
      },
  
      // If answer is incorrect function
      answeredIncorrectly: function() {
  
        game.incorrect++;
  
        clearInterval(timer);
  
        viewPort.html("<h2 style='color:red'>WRONG!</h2>");
        viewPort.append("<h2>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h2>");
  
        if (game.currentQuestion === questions.length -1) {
          setTimeout(game.results, 3 * 1000);
        }
        else {
          setTimeout(game.nextQuestion, 3 * 1000)
        }
      },
  
  
      // If answer is correct function
      answeredCorrectly: function() {
          
  
        clearInterval(timer);
  
        game.correct++;
  
        viewPort.html("<h2 style='color:green'>Correct!</h2>");
  
        if (game.currentQuestion === questions.length -1) {
          setTimeout(game.results, 3 * 1000);
        }
        else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
      },
  
      // Reset game function
      reset: function() {
        this.currentQuestion = 0;
        this.counter = countDown;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
      }
    };
  
    // click events
  
    $(document).on("click", "#start-over", function() {
      game.reset();
    });
  
    $(document).on('click', ".answer-button", function(e) {
      game.clicked(e);
    });
  
    $(document).on("click", "#start", function() {
      $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-num'>20</span> Seconds</h2>");
      game.loadQuestion();
    });
  }
  });
