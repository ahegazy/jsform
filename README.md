# jsform
I used google api to send a message to my mail containing the form data. [liveExample](https://ahegazy.github.io/old)

A javascript only Contact Form you can find a tutorial explaining how it is created and it's idea at my [blog](https://ahegazy.github.io)

## UPDATE 10 Feb 2019
New versio Using firebase Database to store the messages in [Firebase](firebase). [liveExample](ahegazy.github.io/contact)




## How to use it
##### Gmail Login Version 
- Just clone the repo and modify [main.js](googleAuth/js/main.js) file adding your google app client id and your email, then upload it
this [tutorial](https://ahegazy.github.io/blog/how-to-create-a-javascript-only-contact-form.html) explains the proccess in steps.

- A bootstrap version of the form in [bootstrap](googleAuth/bootstrap) directory.

##### Firebase Version 
- Create a new firebase project and add a new Cloud Firestore Collection, name it 'contact' (You can change the name in main.js).
- clone the repo and modify [init.js](firebase/js/init.js) file adding your firebase project info, then upload it.

- A bootstrap version of the form in [bootstrap](firebase/bootstrap) directory.

## Contribution
for any problems or questions open an issue, if you have any fixes send a pull request
