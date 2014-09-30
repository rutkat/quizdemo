app.controller('MainCtrl', function(Quiz, storageService, $scope, $timeout, $location){
  

  $scope.quiz    = $scope.quiz || Quiz.getData();
  $scope.counter = $scope.counter || 0;

    $scope.getTotal = function(){
      return $scope.quiz.length || 0;   
    }

    $scope.saveQuestions = function(){

      if ($scope.getTotal() > 0) {
        try {
          storageService.save('quiz', JSON.stringify($scope.quiz) );
          console.log('Quiz saved.');
        }
        catch (e) {
          console.log('Unable to save: ', e);
        }
      }
    }

    $scope.loadQuestions = function(){

      // var storedQuiz = storageService.get('quiz'); 
      var storedQuiz = JSON.parse( storageService.get('quiz') );

      console.log('storedQuiz: %s', storedQuiz);
      console.log('length %s', storedQuiz.length);

      
      if (storedQuiz !== null && storedQuiz !== undefined) {

        for (var key in storedQuiz) {
          $scope.quiz.push({q: storedQuiz[key].q, a: storedQuiz[key].a });
        }
        console.log("Quiz loaded.")

      }
      else {
        alert('No quiz data found.');
      }

    }

    $scope.clearQuestions = function(){
      
      console.log("clearing...");
      if (storageService.get('quiz') !== null || storageService.get('quiz') !== undefined) {
        console.log(storageService.remove('quiz') );
      }

    }
    
    $scope.addItem = function(question, answer) {

      if(question && answer) {
        // push new user input into array
        $scope.quiz.push({q: $scope.formQuestion, a: $scope.formAnswer});
        $scope.formQuestion = '';
        $scope.formAnswer = '';
      }
    }
    $scope.removeLast = function(){
      $scope.quiz.pop();   
    }

    // clear input for next question
    $scope.clearAnswer = function() {
        $scope.userAnswer = '';
    }

    // to get next question in array 
    $scope.incrementCounter = function() {
      // cycle
      if ($scope.counter === $scope.getTotal() - 1) {
        $scope.counter = 0;
      }
      else {
        $scope.counter += 1;
      }
      
    }

    // when button is pressed
    $scope.nextQuestion = function() {
      $timeout(function(){
        $scope.myClass = '';
      }, 500)
      $scope.incrementCounter();
      $scope.clearAnswer();
    }

    // for verfying user input
    $scope.isCorrect = function(val){
      if (val) {
        return val.toLowerCase() === this.quiz[this.counter].a.toLowerCase() ? this.quiz[this.counter].a : false;
      }
    }    

    // answer for input comparision
    $scope.$watch("userAnswer", function( newValue ) {
          // is correct answer?
        if ( $scope.isCorrect( newValue ) ) {
          $scope.myClass = 'flip-add';          
          $scope.nextQuestion();
        }
         
    });

    //console.log($location);
    if($location.$$path !== '/') {
      if (document.getElementsByTagName('input'))
          document.getElementsByTagName('input')[0].focus();
    }
});

