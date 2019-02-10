var config = {
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
  };

firebase.initializeApp(config);
console.log("initialized");

$(document).ready(function(){
    $('#contactForm').submit(function(event){
        $('#submit').prop('disabled', true);
        $('#submit').val('Sending ...');
        event.preventDefault();
        createMsg();
        $('#submit').val('Send Message');
        $('#submit').prop('disabled', false);
        return false;
    });
});


  
