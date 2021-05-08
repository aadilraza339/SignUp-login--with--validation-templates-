## SignUp-login--with--validation-with-templates-


1: Write A example of callback

2: Write a program to print pattern 1,3,6,10,15...

3: Make Sigup api in node and also make frontend for the same and call signup api from postman (Name, email, phone, age gender, password) a valid validation required on each field using express validator

4: Make login api and call from login form in postman and assign jwt token on each login

5: Make another api that show relation of two different table or document

6: Explain about push notification, how we send if we have to send notification to 2lac users

## HOW TO **RUN** 🏃‍ PROJECT <br>
``git clone https://github.com/aadilraza339/SignUp-login--with--validation-templates-.git``<br>
``cd SignUp-login--with--validation-templates-.git``<br>
``cd express`` <br>
``npm intall``<br>
``nodemon index.js``

<br>

## I used these things to make this project. <br>
``Express`` ``JWT``  ``bcrypt``  ``knex`` ``mysql``

 <br>
 
 These are the endpoints Below you Can run them using postman, here is the link for download<a href="https://www.postman.com/downloads/">click here</a>
 
 <br>
 If we run ``sign_up`` ``login`` with front-end then we have to ``Copy`` the path of ``HTML page`` from View folder, AND ``Paste`` it on any Browser. <br>
 ```javascript
router.post('/sign_up',checkSchema(registrationSchema), userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.post('/newpost', checkAuth, userControllers.newpost);
router.get('/home', checkAuth, userControllers.get_post);
``` 
