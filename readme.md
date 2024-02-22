How to prepare the environment to run an application using sequelize ?

1. Download and install node.js (LTS version):
   https://nodejs.org/en/download

2. Download and install XAMPP (ApacheServer and MySQL Server):
   https://www.apachefriends.org/pl/index.html

3. Start Apache Server and MySQL Server.

4. Open PhpMyAdmin in your web browser to view your installed databases:
   http://localhost/phpmyadmin

5. Initialize NPM on a new project in project folder (in terminal):
   npm init -y
   (-y to skip the additional questions)
   more info about npm: https://weaintplastic.github.io/web-development-field-guide/Development/Frontend_Development/Setting_up_your_project/Setup_Dependency_Managers/Node_Package_Manager/Initialize_NPM_on_a_new_project.html

6. Install the mysql2 and sequelize (ORM) packages in the root folder of your project (in terminal):
   npm install mysql2 sequelize

7. Add in package.json file:
   "type": "module" (after the line starting with: "main")

8. To start the server, you need to open a terminal in the root folder of your project and enter the command (in terminal):
   node 01-seqCRUD_create.js or
   node 02-seqCRUD_read.js or
   node 03-seqCRUD_update.js or
   node 04-seqCRUD_destroy.js
