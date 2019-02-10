var CLIENT_ID = 'YOUR CLIENT ID GOES HERE'; //CHANGE ID HERE
var CLIENT_MAIL = 'YOUR MAIL GOES HERE'; //CHANGE MAIL HERE 'message will be sent to this mail'

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest","https://people.googleapis.com/$discovery/rest?version=v1"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/gmail.send profile email';

var authorizeButton = $('#authorize-button');
var signoutButton = $('#signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    //getting user's name and  email to auto fill the form.
      getUserdata();
  } else {
    //showing error if user is not signed in
$('#status').removeAttr('hidden').text("Error please accept the permission request, i'm using only to send a message on your behlaf and it won't be stored.");
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function getUserdata() {
  gapi.client.people.people.get({
    'resourceName': 'people/me',
    'requestMask.includeField': 'person.names,person.emailAddresses'
    
  }).then(function(response) {      
          $('#signin-button').hide();
          $('#submit').removeAttr('disabled');
          $('#name').val(response.result.names[0].displayName);
          $('#email').val(response.result.emailAddresses[0].value);                

  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}
  function MsgSent(resp){
      $('#submit').text('Send');
      if(resp.id && resp.threadId && resp.labelIds){
          $('#message').val("");
          $('#status').removeAttr('hidden').text("Message sent, I'll reach out to you soon.");
      }else{
          $('#status').removeAttr('hidden').text("Failed to send the message, please refresh and try again.");
      }
  }
function createMsg(){
            name = $('#name').val();
              email = $('#email').val();
              phone = $('#phone').val();
              body = $('#message').val();
              msg = btoa(
                  "Content-Type:  text/plain; charset=\"UTF-8\"\n" +
                  "Content-length: 5000\n" +
                  "Content-Transfer-Encoding: message/rfc2822\n" +
                  "from: \""+name+"\" <"+email+">\r\n" +
                  "to: "+CLIENT_MAIL+"\r\n" +
                  "Subject: A message from "+name+"\r\n\r\n" +
                  "email: " + email +" ,PHONE: "+ phone +"\n\n" + body
                  ).replace(/\+/g, '-').replace(/\//g, '_');
    return msg;
}
function sendMsg(msg){
      gapi.client.load('gmail', 'v1', function() {
          var request = gapi.client.gmail.users.messages.send({
          'userId': 'me',
          'resource': {
              'raw': msg
          }});
                  
          request.execute(MsgSent);
          });
      }      
