/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Hello World to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.ask.skill.6fd56142-4c3c-495e-ad35-4291dd6a390c'; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * MirrorMirror is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var MirrorMirror = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MirrorMirror.prototype = Object.create(AlexaSkill.prototype);
MirrorMirror.prototype.constructor = MirrorMirror;

// MirrorMirror.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
//     console.log("MirrorMirror onSessionStarted requestId: " + sessionStartedRequest.requestId
//         + ", sessionId: " + session.sessionId);
//     // any initialization logic goes here
// };

MirrorMirror.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MirrorMirror onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Ask Chuck for a random fact";
    var repromptText = "You can ask for a random fact now";
    response.ask(speechOutput, repromptText);
};

// MirrorMirror.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
//     console.log("MirrorMirror onSessionEnded requestId: " + sessionEndedRequest.requestId
//         + ", sessionId: " + session.sessionId);
//     // any cleanup logic goes here
// };

MirrorMirror.prototype.intentHandlers = {
    // register custom intent handlers
    "GetStandardResponse": function (intent, session, response) {
      var phrase = intent.slots.Phrase.value;
      var returnPhrase = 'Mike Dang is the ' + phrase;
      response.tellWithCard(returnPhrase, "Mirror Mirror", returnPhrase);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MirrorMirror skill.
    var mirrorMirror = new MirrorMirror();
    mirrorMirror.execute(event, context);
};
