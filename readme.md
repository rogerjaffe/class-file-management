### Classroom File Management with Github

### Repo class-file-management

At login run git clone https://github.com/rogerjaffe/class-file-management cfm
then cd client, then npm install 
Students run from terminal ./cfm/setup.sh


#### Steps:

0. At each machine login, erase ~/.netrc file
   
1. Student generates PAT from Github account with custom expiration of 6/30/YYYY 
   
2. Student fills out G-Form asking for ID and PAT 
   
3. Teacher creates G-sheet with ID, name, email, password 
   
4. On login student runs Node script 
   
        a. pass in student ID, password
        b. erase ~/.netrc
        c. returns stored PAT, email, name from G-Sheet
        d. write PAT to a new ~/.netrc file `machine github.com login <email> password <PAT>`
        e. Runs git config --global user.email "<passed email>"
        f. Runs git config --global user.name "<retrieved name>"

5. GCF must have an environment variable `GOOGLE_APPLICATION_CREDENTIALS=g-sheet-credentials.json` for an nAPI authentication JSON credential file created with a service account key  

How to run a shell script see `https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7`

How to pass in node arguments see https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program

Access G-Sheet data within a Google Cloud Function see `https://stackoverflow.com/questions/44448029/how-to-use-google-sheets-api-while-inside-a-google-cloud-function`

G-Form for students to enter their PATs at https://docs.google.com/forms/d/e/1FAIpQLSeSMpToEA83usgxL1WbB_bznGpuwM9Ct5mEG9HRlvA9I6CwWA/viewform?usp=sf_link

Login to Google Cloud with `gcloud auth login`  Use `rogerjaffe@mrjaffesclass.com` account, `class-file-management` project

Set project with `gcloud config set project class-file-management`

Deploy GCF with
`gcloud functions deploy authenticate --runtime nodejs14 --region us-west2 --trigger-http`

Using a PAT in a text file for authentication see `https://stackoverflow.com/questions/46645843/where-to-store-my-git-personal-access-token`

Get password with Node process and stdin see `https://blog.bitsrc.io/build-a-password-field-for-the-terminal-using-nodejs-31cd6cfa235`
