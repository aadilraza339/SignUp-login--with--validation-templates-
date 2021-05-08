//Write A example of callback
// function
function greet(name, callback) {
    console.log('Hi' + ' ' + name);
    callback();
}

// callback function
function callMe() {
    console.log('I am callback function');
}

// passing function as an argument
greet('Peter', callMe);


//Write a program to print pattern 1,3,6,10,15...
var i=1
var n=0
var pattern =5
while(i <= pattern){
    let j = 1 
    while( j <= i ){
        n=n+i
        console.log(n)
        j++
        break
    }
    i++
}

// Explain about push notification, how we send if we have to send notification to 2lac users

// they can show the latest sports scores, get a user to take an action, 
// such as downloading a coupon, or let a user know about an event, such as a flash sale.

//Send it in a batch of 1000 users at a time. Select all all the users from database iterate it. 
//Take an array and push 1000 users into array and send post it to GCM server then reset the array. 
//and again push the next 1000 users into array till the end of array. And at last check whether array 
//is empty or not if its not empty then post the remaining users to GCM server.