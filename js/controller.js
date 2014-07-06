app.controller('MainCtrl', function(Quiz, $scope, $timeout, $location){

  $scope.quiz    = $scope.quiz || Quiz.getData();
  $scope.counter = $scope.counter || 0;
  
    $scope.getTotal = function(){
      return $scope.quiz.length;   
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
    $scope.isCorrect = function($value){
      return $value.toLowerCase()  === this.quiz[this.counter].a.toLowerCase() ? this.quiz[this.counter].a : false;
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

