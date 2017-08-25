$(document).ready(function() {
//declare object of questions and answers
	var trivia = [
	{
		question: "In 'Days of Thunder', what was Tom Cruise's character name?",
		ansarray: ['Dale Hamlin', 'Lightning McQueen', 'Cale Sallid', 'Cole Trickle']
	},
	{
		question: "What movie features Tom Cruise as David Aames, the man in a prosthetic mask?",
		ansarray: ['Minority Report', 'Man Without a Face', 'Eyes Wide Shut', 'Vanilla Sky']	
	},
	{
		question: "Tom Cruise, as Brian Flanagan, opens a bar by what name in 'Cocktail'?",
		ansarray: ['TGI Fridays', 'Coughlins Law', 'The Bottlecap', 'Cocktails and Dreams']
	},			
	{
		question: "Tom Cruise plays Les Grossman in this action-comedy",
		ansarray: ['Jack Reacher', 'Rock of Ages', 'Stripes', 'Tropic Thunder']
	},
	{
		question: "Cruise's character, Daniel Kaffee, was what rank in 'A Few Good Men'?",
		ansarray: ['Major', 'Corporal', 'Colonel', 'Lieutenant']
	},
	{	
		question: "In 'Top Gun', who was Cruise's training adversary?",
		ansarray: ['Goose', 'Rainman', 'Hollywood', 'Iceman']
	},
	{	
		question: "The clairvoyants in 'Minority Report' are better known as?",
		ansarray: ['Visionaries', 'Ghosts', 'Scanners', 'Precogs']
	},
	{	
		question: "What building blows up in 'Mission: Impossible - Ghost Protocol?",
		ansarray: ['Great Pyramid', 'Buckingham Palace', 'The White House', 'The Kremiln']
	}

	];

//image arrays of correct and wrong answers
	var yesimgArray = ["./assets/images/thunderyes.gif", 
						"./assets/images/vanillayes.gif", 
						"./assets/images/cocktailyes.gif", 
						"./assets/images/tropicyes.gif", 
						"./assets/images/goodmenyes.gif", 
						"./assets/images/topgunyes.gif", 
						"./assets/images/reportyes.gif", 
						"./assets/images/ghostyes.gif" ];
	var noimgArray = ["./assets/images/thunderno.gif", 
						"./assets/images/vanillano.gif", 
						"./assets/images/cocktailno.gif", 
						"./assets/images/tropicno.jpg",
						"./assets/images/goodmenno.gif", 
						"./assets/images/topgunno.gif",
						"./assets/images/reportno.gif",  
						"./assets/images/ghostno.gif" ];
	var round = 0; //counter for each question round
	var randarray = [];  //empty array waiting to be pushed with a random set of answers
	var right = 0; //counts correct answers
	var wrong = 0; //counts incorrect answers
	var clock = 10; //the inital time for the countdown clock 10 sec per question
	var soundtrack = new Audio('./assets/images/dangerZone.mp3') //music to get you grooving

	
//initital splash screen. game starts with image clip and the music loops!!!!
$("#overlayimg").on("click", function() {
	soundtrack.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	soundtrack.play();
//reset variables for future gameplay
	clock = 10;
	right = 0;
	wrong = 0;
	$("#overlay").hide(); //gets rid of splash screen
	randomizearray(); //calls array to radomize answer order		
});


// sets the countdown interval to 1 second
function countdown() {
  intervalId = setInterval(timer, 1000);
}

// the actual countdown function
function timer() {	
	clock--; //  Decrease number by one.	
	$("#timeleft").html("<h2> :0" + clock + "</h2>");//  Show the number in the #timeleft div.
	if (clock === 0) { // when clock hits zero
	stop();			   // timeer stops
	wrongAnswer();	   // counts as a wrong answer
	}
}

//the final screen
function endScreen() {
	$("#overlay").show();  // returns the overlay
	$("#titletext").empty(); // clears initial text
	stop();					// stops counter
	round = 0;				//resets round count
	randarray = [];			// clears the random array
	if (right <= 4) {		//if user only gets 4 or less correct this happens
		$("#overlayimg").attr('src', './assets/images/goose.jpeg'); //shows goose
		$("#titletext").append("<h3>You got " + right + " correct!<br/><br/>"
		 						+ "And missed " + wrong + ". You let down Goose.<br/><br/>" 
		 						+ "Click on Goose to play again!");
	}
	else {					//if user is correct >= 5 question this happens
		$("#overlayimg").attr('src', './assets/images/maverick.jpg')
		$("#titletext").append("<h3>You got " + right + " correct!<br/><br/>"
		 						+ "And missed " + wrong + ". Great job Maverick!<br/><br/>" 
		 						+ "Click on Maverick to play again!");
	}	
}

function stop() {

      //  Clears our intervalId
      //  We just pass the name of the interval
      //  to the clearInterval function.
      clearInterval(intervalId);
      $("#timeleft").html(":10");
      clock = 10;

    }

//gunction for wrong answers
function wrongAnswer() {
	//replaces answer choices with corresponding gif and correct answer
		$("#answercolumn").html("<h3>The answer was " + 
			trivia[round].ansarray[3] +" <br/><img src=" 
			+ noimgArray[round] + " max-height='90%' max-width='100%'>");
		wrong++; //adds to wrong count
		round++; //adds to round count
		//if round equals the number of trivia questions, game is over, call end function
		if (round == trivia.length) {
		setTimeout(endScreen, 1000 * 5);	
		}
		//if the round is not yet equal to trivia array, keep the game going
		else {
		setTimeout(randomizearray, 1000 * 5);
		}					
}				

//function to fill an array with answers in a random order 
function randomizearray() {
		randarray = []; //clears the random array
		while (randarray.length < 4){ //feeds in random answers until the array has 4 elements
		 	var rand = Math.floor(Math.random() * 4);
		 	//picks a random answer from ansarray, if this answer is not already
		 	// a part of the  random array, it pushes the answer into randarray
		  	if (randarray.indexOf(trivia[round].ansarray[rand]) === -1) {
		 	randarray.push(trivia[round].ansarray[rand]);
		 		 	}
		}		
		pushanswers(); //calls push answers function
}


function pushanswers() {
		// declares a var for the answercolumn div   
		var $answercolumn = $("#answercolumn");
		// declares a var for a div with thte #answers attribute
		var $answersdiv = $("<div>").attr('id', 'answers');
		//goes through randarray and creates an h3 element with #ans[i]
		//.answers class and text equal to the answer
		randarray.forEach(function(answer, index) {
			var $answer = $("<h3>").attr('id', 'ans'+ (index + 1))
								  .addClass('answers')
								  .text(answer);
		//appends each h3 element to the #answers div
			$answersdiv.append($answer);
		});
		//questions div gets html of the appropriate trivia question
		$("#questions").html(trivia[round].question);
		//clears the #answercolumn div and appends the #answer div that now
		//has the multiple choice answers
		$answercolumn.empty().append($answersdiv);
		//calls countdown function to begin timer
		countdown();
	
		//as user selects a multiple choice answer with the answers class
		$(".answers").on('click', function(){
			//timer is stopped
			stop();
			//if picked answer is equal to the elemnt with the index of 3 
			//in the original answer array (ansarray[3] will always be the correct answer)
			if ($(this).text() == trivia[round].ansarray[3]) {
				//replace the html of #answercolumn with winning gif and text
				$answercolumn.html("<h3>CORRECT! <br/><img src=" + 
					yesimgArray[round] + " max-height='90%' max-width='100%'>");
				right++;//adds to the right total
				round++;//adds to the round total
				if (round == trivia.length) { //compares round number to array length
					setTimeout(endScreen, 1000 * 5); //if equal go to end screen after 5 seconds	 
					}
				else {
				setTimeout(randomizearray, 1000 * 5); //if not play on after 5 seconds
				}
			}
			else { //call the wronganswer function if user guessed incorrectly
				 wrongAnswer();
			}	
		
		});
	}
});

/*  1. upon loading of DOM, start button/image appears
	2. after start button is pressed, game begins
		a. 1st question is given with a short countdown timer
		b. If the player selects the correct answer, show a gif congratulating them for choosing 
			the right option. After a few seconds, display the next question -- 
			do this without user input.
		c. The scenario is similar for wrong answers and time-outs.
			i. If the player runs out of time, tell the player that time's up and display 
				the correct answer. Wait a few seconds, then show the next question.
			ii. If the player chooses the wrong answer, tell the player they selected the 
				wrong option and then display the correct answer. Wait a few seconds, 
				then show the next question.
	3. On the final screen, show the number of correct answers, incorrect answers, 
		and an option to restart the game (without reloading the page). */
