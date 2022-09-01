# Google Sheets + Node.js/Express
A Node.js/Express app (with EJS frontend) that integrates with Google Sheets to read and display data. 

The app protects access to data through authentication, performed with JWT. The admin of the app, can also grant and revoke acceess to parties.

## Setup
To make sure you can actually consume data from a Google spreadsheet you own, make sure you store your Google Cloud project credentials in a file named "credentials.json" at the root of the project.

Getting this credetials, boils down to creating a new project in Google Cloud. Enable Google Sheets API in it and then create a couple of Account Keys. Pick the "JSON Format" and download the keys locally, making sure you rename the file as "credentials.json".

After that, share the Google Sheet you want to consume with the email Address associated with the Google Sheet API key.

Moreover, you need to create a secrets.js file where you store all variables you want to keep secret. 

Both the "secrets.js" and "credentials.json" files must NOT be uploaded into any public repo. So make sure you include both in the ".gitignore" file of the project.

Finally run `npm i` to install all dependencies.

## Copyright
(c) 2022 Mario Mazzola. You can fork and use the code as you like.
