# Hunter-Server
To sync your fork. In 'git' run:
```bash
git fetch upstream
git checkout master
git merge upstream/master
```
Every time you sync your fork be sure to do the following:
1. From command line:
  * Change directory to the Node.js project
    * For example: cd path/to/project/hunter-server
  * Run "npm install" (without quotes)
  * Run node on the JS file
    * For example: node restifyExample.js
  * Open a web browser and go to the server IP to test that everything works
    * For example: 127.0.0.1:8080/hello/Bob

2. Use 'git' to:
  * Add your file/s
    * For example: git add fileToAdd.js
  * Commit changes with an appropriate message
    * For example: git commit -m "Place message here"
  * Push changes to your fork
    * For example: git push origin master

3. Make a pull request:
  * Go to 'GitHub' and use the associated tools to submit a pull request. If successful this will be added to the main repository for other developers to fetch.