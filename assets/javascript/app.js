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
	}
	];

	var answerClone = $("#answercolumn").clone(true, true);
	var yesimgArray = ["./assets/images/thunderyes.gif"];
	var noimgArray = ["./assets/images/thunderno.gif"];
	var round = 0;
	var randarray = [];
	var right = 0;
	var wrong = 0;

	$("#overlayimg").on("click", function() {
		$("#overlay").remove();
		
	});

function randomizearray() {
		randarray = [];
		while (randarray.length < 4){ 
		 	var rand = Math.floor(Math.random() * 4);
		  	if (randarray.indexOf(trivia[round].ansarray[rand]) === -1) {
		 	randarray.push(trivia[round].ansarray[rand]);
		 		 	}
		}
		
		pushanswers();

	}


function pushanswers() {
   
		var $answercolumn = $("#answercolumn");
		var $answersdiv = $("<div>").attr('id', 'answers');
		randarray.forEach(function(answer, index) {
			var $answer = $("<p>").attr('id', 'ans'+ (index + 1))
								  .addClass('answers')
								  .text(answer);
			$answersdiv.append($answer);
		});
		$("#questions").html(trivia[round].question);
		$answercolumn.empty().append($answersdiv);

	

		$(".answers").on('click', function(){
			console.log(this);
			
			if ($(this).text() == trivia[round].ansarray[3]) {
				$answercolumn.html("<h3>CORRECT! <br/><br/><img src=" + 
					yesimgArray[round] + " width='100%'>");
					right++;
					console.log("right number " + right);

			}
			else {
				$answercolumn.html("<h3>The answer was " + 
					trivia[round].ansarray[3] +" <br/><img src=" 
					+ noimgArray[round] + " width='400px'>");
					wrong++;
					console.log("wrong number " + wrong);
			}
			round++;
			setTimeout(randomizearray, 1000 * 5);
		
		
	});

	}

	randomizearray();

});

/*  1. upon loading of DOM, start button appears
	2. after start button is pressed, game begins
		a. 1st question is given with a short countdown timer
		b. If the player selects the correct answer, show a screen congratulating them for choosing 
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
