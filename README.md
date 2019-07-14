# Identity Management System using Blockchain

## LIVE DEMO

You can find live demo at http://134.209.159.164/.
For testing the 3rd party insurance application visit http://134.209.159.164/insurance.html

## Steps to Run

1. Download and install Node.js version 10.x with LTS from https://nodejs.org.
2. Install Ganache from https://truffleframework.com/ganache.
3. Install truffle using NPM using command `npm i -g truffle`.
4. Set ganache port to 9545 in settings.
5. Open project root dir in terminal.
6. Run command `truffle compile`.
7. Run command `truffle migrate`.
8. Set Environment Variables for the project.
9. Run command `npm run buildandrun` in a new terminal in the project root.
10. Open http://localhost/ in your web browser.

## Instructions For Running The Decentralized Application

1. Open the link http://134.209.159.164 or localhost for your local computer
2. For New User Click on SignUp button
3. Enter Your details here correctly
4. On success your account would be created successfully.
  Note: It is important to remember your unique user id as entered by you.
5. Go to link http://134.209.159.164/insurance.html or localhost/insurance.html (for local host) for the demo project.
6. Enter your first name, last name and your userId as per your account.
7. Complete rest of the form.
8. Click the submit button.
9. If the data is validated then your application would be processed.
10. Else corresponding error would be shown.

### Environment Variables
- `PORT` - \<Port Here>
- `JWT_SECRET` - \<A random string for signing JWT tokens>

### Framework Used: 
Truffle For Blockchain, ExpressJS
                
### MiddleWare API: 
NodeJs(ExpressJS)

### Libraries Used: 
Jquery,bootstrap
