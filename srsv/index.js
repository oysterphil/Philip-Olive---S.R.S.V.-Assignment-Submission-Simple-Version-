var gamePrompt = require('game-prompt');
var colors = require('colors');

//Global Variables

var planets = [
   {
     name: 'Earth',
     distance: 10,
     unit: 'lightyears'
   },
   {
     name: 'Mesnides',
     distance: 20,
     unit: 'lightyears'
   },
   {
     name: 'Laplides',
     distance: 50,
     unit: 'lightyears'
   },
   {
     name: 'Kiyturn',
     distance: 120,
     unit: 'lightyears'
   },
   {
     name: 'Aenides',
     distance: 25,
     unit: 'lightyears'
   },
   {
     name: 'Cramuthea',
     distance: 200,
     unit: 'lightyears'
   },
   {
     name: 'Smeon T9Q',
     distance: 400,
     unit: 'lightyears'
   },
   {
     name: 'Gleshan 7Z9',
     distance: 85,
     unit: 'lightyears'
   }
 ];

var artifacts = [];
var planetString = '';
var galaxyMap = '';
var playerName;
var vehicleName;
var fuelLevel = 1000;
var refuel = 10;
var cramutheaRefuel = 500;

// Loops -->

for (i = 0; i < planets.length; i++) {
	if (i < (planets.length - 1)) {
		planetString += '(' + planets[i].name.charAt(0) + ') ' + planets[i].name + 
		' (' + planets[i].distance + ' ' + planets[i].unit + ')\n';
	} else {
		planetString += '(' + planets[i].name.charAt(0) + ') ' + planets[i].name + 
		' (' + planets[i].distance + ' ' + planets[i].unit + ')';
	}
}

for (i = 0; i < planets.length; i++) {
	if (i < (planets.length - 1)) {
		galaxyMap += planets[i].name + 
		' (' + planets[i].distance + ' ' + planets[i].unit + ')\n';
	} else {
		galaxyMap += planets[i].name + 
		' (' + planets[i].distance + ' ' + planets[i].unit + ')';
	}
}

// Narrative Functions -->

function startGame() {
	gamePrompt([
		'S.R.S.V.'.red, 'Press ENTER to start.'.red
	], intro);
}

function intro () {
	gamePrompt('You are the captain of a Solo Research Space Vehicle (S.R.S.V.) ' + 
		'on an expedition to explore foreign planets. Your mission is to make contact ' + 
		'with three alien life forms, acquire an artifact representative of their culture, ' + 
		'and bring back your findings to Earth.', collectInfo);
}

function collectInfo () {
	gamePrompt([
		'A voice comes on over the intercom.',
		'"Please state your name for identity verification."'.bold
	], collectName);
}

function collectName(name) {
	playerName = name;

	gamePrompt([
		'"Thank you Captain ' + playerName + '."',
		'"Please state your vehicle name for identity verification purposes."'.bold
	], collectVehicleName);
}

function collectVehicleName(name) {
	vehicleName = name;

	gamePrompt([
		'"Thank you, Captain ' + playerName + ' of the S.R.S.V. ' + vehicleName + 
		'. Your identity has been verified."', 
		'"' + vehicleName + ' has ' + fuelLevel + ' gallons of fuel."'
	], travel);
}

function travel() {
	gamePrompt(
		'Where to Captain ' + playerName + '?\n' + planetString, navigateTo);
}

function navigateTo(destination) {
	destinationLowerCase = destination.toLowerCase();

	if (destinationLowerCase === 'e' || destinationLowerCase === 'earth') {
		toEarth();
	} else if (destinationLowerCase === 'm' || destinationLowerCase === 'mesnides') {
		toMesnides();
	} else if (destinationLowerCase === 'l' || destinationLowerCase === 'laplides') {
		toLaplides();
	} else if (destinationLowerCase === 'k' || destinationLowerCase === 'kiyturn') {
		toKiyturn();
	} else if (destinationLowerCase === 'a' || destinationLowerCase === 'aenides') {
		toAenides();
	} else if (destinationLowerCase === 'c' || destinationLowerCase === 'cramuthea') {
		toCramuthea();
	} else if (destinationLowerCase === 's' || destinationLowerCase === 'smeon t9Q') {
		toSmeon();
	} else if (destinationLowerCase === 'g' || destinationLowerCase === 'gleshan 7z9') {
		toGleshan();
	} else {
		gamePrompt('Hmmm... that is not a planet in this galaxy', navigate);
	}
}

function toEarth() {
	if (artifacts.length === 3) {
		console.log('Congratulations! You have returned to Earth with three wonderful artifacts!\n\nYOU WIN!'.green);
	} else {
		gamePrompt([
			'Flying to Earth...',
			'Arrived! You used ' + planets[0].distance + ' gallons of gas to return to Earth, ' + 
			'which is a refueling station. Every time you return to earth, you refuel 10 gallons. ' +
			'The ' + vehicleName + ' now has ' + fuelLevel + ' gallons of gas.',
			'You have returned to earth with ' + artifacts.length + ' artifacts.',
			'This is unacceptable. You need at least 3 artifacts to complete your mission.'.red
		], earthChoices);
	}
	function earthChoices() {
		gamePrompt('What would you like to do now?\n(S) Stay on earth and refuel 10 gallons of gas\n' +
			'(V) View current gas level\n(P) Peruse your artifacts\n(R) Review Galaxy Map\n(G) Go hunt for more artifacts!',
			earthChoicesSelection);
		function earthChoicesSelection (selection) {
			selectionLowerCase = selection.toLowerCase();

			if (selectionLowerCase === 's') {
				stayRefuel();
			} else if (selectionLowerCase === 'v') {
				gasGauge();
			} else if (selectionLowerCase === 'p') {
				peruseArtifacts();
			} else if (selectionLowerCase === 'r') {
				viewGalaxyMap();
			} else if (selectionLowerCase === 'g') {
				travel();
			} else {
				gamePrompt('Hmmm... that is not an option. Let\'s try again', earthChoices);
			}
		}
		function stayRefuel() {
			fuelLevel += refuel;
			gamePrompt('Congratulations! You now have ' + fuelLevel + ' gallons of gas.',
				earthChoices);
		}
		function gasGauge() {
			gamePrompt('You currently have ' + fuelLevel + ' gallons of gas.',
				earthChoices);
		}
		function peruseArtifacts() {
			if (artifacts.length === 0) {
				gamePrompt('You currently have ' + artifacts.length + ' artifacts. Go west, young man.',
				earthChoices);
			} else {
				gamePrompt(artifacts, earthChoices);
			}
		}
		function viewGalaxyMap() {
			gamePrompt(galaxyMap, earthChoices);
		}	
	}
}

function toMesnides() {
	fuelLevel -= planets[1].distance;
	if (fuelLevel <= 0) {
		lose();
	} else {
		gamePrompt([
			'Flying to Mesnides...',
			'Arrived! You used ' + planets[1].distance + ' gallons of gas. The ' + vehicleName +
			' now has ' + fuelLevel + ' gallons of gas.',
			'Shortly after landing, a representative of the Mesnidian people is there to greet you.',
			'"Welcome, traveler, to Mesnides."'
			], mesnidesChoices);
		function mesnidesChoices() {
			gamePrompt('How can we assist you?\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', mesnidesChoicesSelection);
			function mesnidesChoicesSelection (selection) {
				selectionLowerCase = selection.toLowerCase();

				if (selectionLowerCase === 'a') {
					askForArtifact();
				} else if (selectionLowerCase === 'p') {
					askAboutPlanets();
				} else if (selectionLowerCase === 'l') {
					leavePlanet();
				} else {
					gamePrompt('Hmmm... that is not an option. Let\'s try again', mesnidesChoices);
				}
			}
			function askForArtifact() {
				if (artifactSearch(artifacts, 'Myoin Horn')) {
					gamePrompt('"Hey, we already gave you an artifact! Don\'t be stingy!"',
						mesnidesChoices);
				} else {
					artifacts.push('Myoin Horn');
					gamePrompt('"Here, take this Myoin Horn, an ancient Mesnidian instrument."',
						mesnidesChoices);
				}
			}
			function askAboutPlanets() {
				gamePrompt('"Well, Laplides suffered from atomic war and has been uninhabited' +
				' for centuries. You would do well to avoid it on your journey."',
					mesnidesChoices);
			}
			function leavePlanet() {
				travel();
			}
		}
	}	
}

function toLaplides() {
	fuelLevel -= planets[2].distance;	
	if (fuelLevel <= 0) {
		lose();
	} else {
		gamePrompt([
			'Flying to Laplides...',
			'You enter orbit around Laplides. Looking down at the planet, you see signs of' +
			' atomic war and realize there is no option but to turn around. ' +
			'Unfortunately, you still used ' + planets[2].distance + ' gallons of gas and the ' + vehicleName +
			' now has ' + fuelLevel + ' gallons of gas.'
		], travel);
	}
}

function toKiyturn() {
	fuelLevel -= planets[3].distance;
	if (fuelLevel <= 0) {
		lose();
	} else {
		gamePrompt([
			'Flying to Kiyturn...',
			'Arrived! You used ' + planets[3].distance + ' gallons of gas. The ' + vehicleName +
			' now has ' + fuelLevel + ' gallons of gas.',
			'Shortly after landing, a representative of the Kiyturn people is there to greet you.',
			'"Hello, what brings you to Kiyturn? You\'re not here to cause trouble are you?"'
			], kiyturnChoices);
		function kiyturnChoices() {
			gamePrompt('Ask about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', kiyturnChoicesSelection);
			function kiyturnChoicesSelection (selection) {
				selectionLowerCase = selection.toLowerCase();

				if (selectionLowerCase === 'a') {
					askForArtifact();
				} else if (selectionLowerCase === 'p') {
					askAboutPlanets();
				} else if (selectionLowerCase === 'l') {
					leavePlanet();
				} else {
					gamePrompt('Hmmm... that is not an option. Let\'s try again', kiyturnChoices);
				}
			}
			function askForArtifact() {
				if (artifactSearch(artifacts, 'Kiyturn Glass Bowl')) {
					gamePrompt('"Hey, we already gave you an artifact! Don\'t be stingy!"',
						kiyturnChoices);
				} else {
					artifacts.push('Kiyturn Glass Bowl');
					gamePrompt('"Here, take this Kiyturn Glass Bowl, a symbol of our civilization."',
						kiyturnChoices);
				}
			}
			function askAboutPlanets() {
				gamePrompt('"I\'m sorry, but we do not leave our planet. The universe, to us, is a beautiful mystery."',
					kiyturnChoices);
			}
			function leavePlanet() {
				travel();
			}
		}
	}	
}

function toAenides() {
	fuelLevel -= planets[4].distance;	
	if (fuelLevel <= 0) {
		lose();
	} else {
		gamePrompt([
			'Flying to Aenides...',
			'You try to land on Aenides, but are fired upon by the hostile locals and are forced to leave.' +
			'Unfortunately, you still used ' + planets[4].distance + ' gallons of gas and the ' + vehicleName +
			' now has ' + fuelLevel + ' gallons of gas.'
		], travel);
	}
}

function toCramuthea() {
	fuelLevel -= planets[5].distance;
	if (fuelLevel <= 0) {
		lose();
	} else {
		fuelLevel += cramutheaRefuel;	
		gamePrompt([
			'Flying to Cramuthea...',
			'Arrived! You used ' + planets[5].distance + ' gallons of gas. The ' + vehicleName +
			' now has ' + (fuelLevel - cramutheaRefuel) + ' gallons of gas.',
			'As you exit the ' + vehicleName + ', you notice that the landscape has been ravaged ' +
			'by a global environmental disaster. There are, however, remnants of the people who left.',
			'First, you find a still-functional S.R.S.V. re-fueling station and are able to add ' +
			cramutheaRefuel + ' gallons of gas to the ' + vehicleName + '.',
			'You now have ' + fuelLevel + ' gallons of gas in the ' + vehicleName + '.'.green,
			'You also find a beacon on the ground near the re-fueling station that relays the following ' +
			'message:\n Wow... shit\'s gotten hot here. We\'re leaving this place for Smeon T9Q!'
		], travel);
	}
}

function toSmeon() {
	fuelLevel -= planets[6].distance;	
	if (fuelLevel <= 0) {
		lose();
	} else {
		gamePrompt([
			'Flying to Smeon T9Q...',
			'Arrived! You used ' + planets[6].distance + ' gallons of gas. The ' + vehicleName +
			' now has ' + fuelLevel + ' gallons of gas.',
			'The Cramuthean people, living on Smeon T9Q, are a friendly people. ' + 
			'Shortly after landing, a representative is there to greet you.',
			'"Hello, what brings you to Smeon T9Q? Did you find our beacon on Cramuthea?! How can we assist you?"'
			], smeonChoices);
		function smeonChoices() {
			gamePrompt('Ask about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', smeonChoicesSelection);
			function smeonChoicesSelection (selection) {
				selectionLowerCase = selection.toLowerCase();

				if (selectionLowerCase === 'a') {
					askForArtifact();
				} else if (selectionLowerCase === 'p') {
					askAboutPlanets();
				} else if (selectionLowerCase === 'l') {
					leavePlanet();
				} else {
					gamePrompt('Hmmm... that is not an option. Let\'s try again', smeonChoices);
				}
			}
			function askForArtifact() {
				if (artifactSearch(artifacts, 'Dried Cramun Flower')) {
					gamePrompt('"Hey, we already gave you an artifact! Don\'t be stingy!"',
						smeonChoices);
				} else {
					artifacts.push('Dried Cramun Flower');
					gamePrompt('"Here, take this Dried Cramun Flower, a token of our former homeland ' +
						'that makes a wonderful tea as well."',
						smeonChoices);
				}
			}
			function askAboutPlanets() {
				gamePrompt('"Ooooh... yeah those Aenideans are not very nice... ' +
					'They once tried to take over our planet by force. Stay away from them.',
					smeonChoices);
			}
			function leavePlanet() {
				travel();
			}
		}
	}	
}

function toGleshan() {
	fuelLevel -= planets[7].distance;	
	if (fuelLevel <= 0) {
		lose();
	} else {
		gamePrompt([
			'Flying to Gleshan 7Z9...',
			'Arrived! You used ' + planets[7].distance + ' gallons of gas. The ' + vehicleName +
			' now has ' + fuelLevel + ' gallons of gas.',
			'The Gleshan people are a friendly, but impoverished people. ' + 
			'Shortly after landing, a representative is there to greet you.',
			'"Hello, what brings you to Gleshan 7Z9?"'
			], gleshanChoices);
		function gleshanChoices() {
			gamePrompt('Ask about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', gleshanChoicesSelection);
			function gleshanChoicesSelection (selection) {
				selectionLowerCase = selection.toLowerCase();

				if (selectionLowerCase === 'a') {
					askForArtifact();
				} else if (selectionLowerCase === 'p') {
					askAboutPlanets();
				} else if (selectionLowerCase === 'l') {
					leavePlanet();
				} else {
					gamePrompt('Hmmm... that is not an option. Let\'s try again', gleshanChoices);
				}
			}
			function askForArtifact() {
				gamePrompt('"Sadly, we are unable to spare anything to gift to you... ' +
					'Have you something for us perhaps?"', 
					gleshanChoices);
			}
			function askAboutPlanets() {
				gamePrompt('"Once, not too long ago, a Cramuthean visited us here on Gleshan 7Z9 ' +
					'and gifted us a lovely dried flower, which made a wonderful tea. They must ' +
					'be rather wealthy  on Cramuthea..."',
					gleshanChoices);
			}
			function leavePlanet() {
				travel();
			}
		}	
	}
}

//Generic Functions -->

function artifactSearch(array, string) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === string) {
			return true;
		}
	}
	return false;
}

function lose() {
	console.log('Before making it to your destination, you ran out of fuel!\n\nGAME OVER'.red);
}

startGame();