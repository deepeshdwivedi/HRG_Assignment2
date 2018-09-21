# HRG_Assignment2
The objective of this project is to collect and store huge amount of structured and unstructured data a noSQL based environmment. The libraries and utilities provided support the mainpulation and presentation based operations to be performed with relative ease on the stored data.

In order to setup this project ->

1. Setup Node.js in your local machine.

2. Install typescript by typing 
      "npm install typescript"

3. Install mongodb nodejs module by typing
      "npm install mongodb"
      "npm install mongoose"

4. Install formidable by typing
      "npm install formidable"

Or for windows machine run the batch file "setup.bat".

Now, the setup part is over. To run this project ->

Start the server by typing 
      "node ./server.js"
 
 Now you should see the message 
      "Server listening at port 3000..."
  
  To fetch the user data visit in the browser visit the site
       "http://localhost:3000/test.html"
  
  Now, you'll be able to see a button. Click on the button and wait till the process completes successfully. After that, you'll be able 
  to perform any kind of crud operation on that data. 
  
  1. To get list of all users->
        "http://localhost:3000/getUsers"
  
  2. To get list of posts of a particular user->
     eg.  "http://localhost:3000/getPostByUserName?username=<username>"
  
  3. To update avatar(use any dummy rest client)->
          "http://localhost:3000/user/addAvatar"
     In form data select key value pair as 
        1.1 file:<choose file>
        1.2 username:<username>
  Play around and enjoy :)
