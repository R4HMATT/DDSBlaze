# Welcome!

First of all, welcome to the DDSBlaze project :) I wanted to follow up on what we covered during our last group mentoring session as well as a small setup guide. Here are some important links (pls bookmark):

 
On-premise SharePoint: http://cscgikdcapmdw40/DDSBTest/DDSBlaze/_layouts/15/start.aspx#/SitePages/Home.aspx
Remote Sharepoint: https://rahmnik.sharepoint.com/
TFS: http://cscgikdcapmdw39.cihs.ad.gov.on.ca/DDSB/Emergency%20Response
GitHub: https://github.com/R4HMATT/DDSBlaze (this also contains an important README.md)
 
# Set up

Now for the setup guide. You will need the following software on your computer at work/home: (1) GitHub and (2) Node.js. Optionally, you may wish to use an editor such as Visual Studio Code or Sublime Text, although I prefer the feature-rich functionality of Notepad.

## Step 1: Installing Git

Visit the following link to find Git installations: https://git-scm.com/downloads
Download and install the appropriate version
Follow through with the installation normally
In the “Choosing the default editor used by Git” section, set it to what you will most likely use (the drop-down list will show the available options)
Follow through the rest of the installation without changing any of the settings
 

## Step 2: Installing Node.js

Visit the Node.js download website: https://nodejs.org/en/download/
Choose “Current” release and download for your OS
Follow the installation normally
Once you reach the “Tools for Native Modules” section, make sure to select the “Automatically install the necessary…” checkbox
Click Next and Install
 

# Step 3: Cloning the GitHub Repo

Now that you have everything setup, go ahead and clone the repo:

Open Git Bash, Command Prompt or any other terminal
Navigate to where you want to clone the repo (eg. cd C:/Users/beeeelaaal/Desktop/)
Type the following: git clone https://github.com/R4HMATT/DDSBlaze.git
Once it’s completed, pull the branch that you want with “git pull -b <branch_name>” and run “npm install” to download the remaining dependencies
 
…and that’s about it. One thing I would recommend is getting familiar with our TFS. It can be pretty confusing to use if you’re new to it. If you have any questions/concerns, please feel free to reach out to Bilal or Rahm.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Running the Project

In the project directory, first you'll want to run:

### `npm install` 

then to start the web app run:

### `npm start`

Runs the app in the development mode.<br>
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Note, this is in httpS, if there is a browser error trying to access it, (in chrome) click on advanced permissions and it should let you proceed to the site

If there is an error in the terminal when you try to run the app, and it has something to do with 'https' go to the package.json file, and under "dependencies: scripts: start:", remove the part that says "HTTPS=true" but keep the react starts script. This HTTPS=true portion is required to connect to sharepoint throuhg the app, but it can cause issues when trying to run it from work connections so keep that in mind.

The list we are using on the remote sharepoint site is:

https://rahmnik.sharepoint.com/Lists/testlist/AllItems.aspx?viewpath=%2FLists%2Ftestlist%2FAllItems.aspx

