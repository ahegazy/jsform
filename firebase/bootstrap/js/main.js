var db = firebase.firestore();

function createMsg(){
    var ContactRef = db.collection("contact");
    name = $('#name').val();
    email = $('#email').val();
    phone = $('#phone').val();
    msg = $('#message').val();

    var FullMsg = {
        name: name,
        email: email,
        phone: phone,
        message: msg,
        time: new Date //firebase.firestore.Timestamp.fromDate(new Date(Date().now()))        
    }
    ContactRef.add(FullMsg)
    .then(function(docRef) {
        $('#message').val("");
//        $("#contactForm").prop('hidden',true);
        $('#status').removeAttr('hidden').text("Message sent, I'll reach out to you soon.");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        $('#status').removeAttr('hidden').text("Failed to send the message, please refresh and try again.");
    });
}

