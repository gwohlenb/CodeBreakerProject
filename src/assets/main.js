let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
   let input = document.getElementById('user-guess');

   if (answer.value == '' || attempt.value == '') {
      setHiddenFields();
   }

   // Make sure the guess is of the correct length (4)
   if (!validateInput(input.value)) {
      // Incorrect length
      return;
   }
   // This is going to count as the user's first guess
   attempt.value++;

   // Now check the guess to see if it is right
   if (getResults(input.value) == true) {
      // They got it!
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
   } else if (attempt.value >= 10 ) {
      // The guess is wrong, and they don't have enough attempts remaining
      setMessage('You Lose! :(');
      showAnswer(false);
      showReplay();
   } else {
         setMessage('Incorrect, try again.');
   }
}

function setHiddenFields() {
   // Generate the random number between 0 and 9999
   answer.value = Math.random() * 10000;
   answer.value = Math.floor(answer.value);
   answer.value = (answer.value).toString();

   // Make sure the answer is EXACTLY 4 digits long
   while (answer.value.length < 4) {
      answer.value = "0" + answer.value; 
   }

   // Initialize the user attempts (guesses)
   attempt.value = "0";
}

function setMessage(input) {
   // Set the message label to $message
   document.getElementById('message').innerHTML = input;
}

function validateInput(input) {
   if (input.length == 4) {
      return true;
   } else {
      setMessage("Guesses must be exactly 4 characters long.");
      return false;
   }
}

function getResults(input) {
   divHolder = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';

   for (i = 0; i < input.length; i++) {
      if (input.charAt(i) == answer.value.charAt(i)) {
         // Correct character in correct position
         divHolder += '<span class="glyphicon glyphicon-ok"></span>';
      } else if (answer.value.indexOf(input.charAt(i)) > -1) {
          // Correct character in wrong position (-1 == NOT FOUND)
          divHolder += '<span class="glyphicon glyphicon-transfer"></span>';
      } else {
          // Incorrect character
          divHolder += '<span class="glyphicon glyphicon-remove"></span>';
      }
   }

   divHolder += '</div></div>';
   document.getElementById('results').innerHTML += divHolder;

   if (input == answer.value) {
      // They got the right answer!
      return true;
   }
   return false;
}

function showAnswer(winTrue) {
   code = document.getElementById('code');
   if (winTrue == true) {
      code.className += ' success';
   } else {
      code.className += ' failure';
   }
   code.innerHTML = answer.value;
}

function showReplay() {
   document.getElementById('guessing-div').style.display = "none";
   document.getElementById('replay-div').style.display = "block";
}

