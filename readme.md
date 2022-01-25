## Classroom File Management with Github

### Required at beginning of school year

* Students create Github.com account, create a personal access token
* Students fill out Google form at `https://docs.google.com/forms/d/e/1FAIpQLSeSMpToEA83usgxL1WbB_bznGpuwM9Ct5mEG9HRlvA9I6CwWA/viewform` and provide their student ID and Google personal access token
* Teacher fills out a G-Sheet with student ID, name, and district password. See `https://docs.google.com/spreadsheets/d/1f35OprNqcF6_dHwv3N5rnrWVkGZJyTD8PFaB_TVJF0M/edit?usp=sharing` 

### Required after each student login:

* Open terminal
* ./setup.sh <studentId>

The following actions will happen:

1. Student will be prompted for password
2. Password is validated with teacher-created spreadsheet at `https://docs.google.com/spreadsheets/d/1f35OprNqcF6_dHwv3N5rnrWVkGZJyTD8PFaB_TVJF0M/edit?usp=sharing`
3. Github global username and name are set using git config --global user.name and user.email
4. .netrc file is created in /home/student with Github personal access token for student

Errors: Internet errors, and authentication errors

## Computer configuration

### Beginning of the year

Login as student and copy `setup.sh` to `~/` (`/home/student`) 

### On each login 

```
git clone https://github.com/rogerjaffe/class-file-management cfm
git config --global --unset user.name
git config --global --unset user.email
rm ~/.netrc
```

These commands are contained in /usr/bin/startup.sh with the master copy at `https://drive.google.com/file/d/1lBZ4McczFizkuj87-zsv2qJtqK6opv45/view?usp=sharing`

### Google Cloud Function in gcf folder

1. Look up student ID in teacher-generated G-Sheet to find name and password
2. Look up student ID in student data provided in G-Form with Github personal access token
3. Return student email, name, and Github PAT
4. See this folder with all documents `https://drive.google.com/drive/folders/1Dk22WZnpal1YLOKm9t5CHFLEuPjyIy-2?usp=sharing`

## References:

### Articles
* How to run a shell script see `https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7`
* How to pass in node arguments see https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program
* Access G-Sheet data within a Google Cloud Function see `https://stackoverflow.com/questions/44448029/how-to-use-google-sheets-api-while-inside-a-google-cloud-function`
* Using a PAT in a text file for authentication see `https://stackoverflow.com/questions/46645843/where-to-store-my-git-personal-access-token`
* Get password with Node process and stdin see `https://blog.bitsrc.io/build-a-password-field-for-the-terminal-using-nodejs-31cd6cfa235`
  
### Google Cloud
* Login to Google Cloud with `gcloud auth login`  Use `rogerjaffe@mrjaffesclass.com` account, `class-file-management` project
* Set project with `gcloud config set project class-file-management`
* Deploy GCF with `gcloud functions deploy authenticate --runtime nodejs14 --region us-west2 --trigger-http`

