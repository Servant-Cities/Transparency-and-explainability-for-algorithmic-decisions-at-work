# Campaign microsite

The Microsite generates public pages out of content edited in Drupal admin.

## Structure of the repository

The repository has been separated between two folders:
* Design folder: To keep track of the different design iterations and enable transfer of the project trough a Figma import
* App folder: The actual source code of the application, respecting the strcuture of Sveltekit v2.0.0

## Test and develop locally
1. Clone the project

2. Using node [nodejs v18 or more](https://nodejs.org) and [yarn](https://yarnpkg.com/), run the following commands from /app directory
```
yarn
yarn dev
```

3. The dev server runs on port 5173 and will automaticaly update the page upon modifying the source code.

## Staging
If you want to run a non optimized node app which you can use to dynamicaly test the content edited in Drupal, simply edit the .env file and run the app as you would locally.

If you want to do so using pm2, here is how to do it:
```
pm2 start ecosystem.config.cjs
```

> An optimized node app was previously possible but we decided to support static site generation for production instead in order for the app to be self sufficient and easier to manage. Should you prefer the previous mode, you can revert the 6 commits mentionning "static site generation" and go back to a dynamic production architecture instead, this documentation will be updated to reflect the changes.

## Deploy the app on a VM

### Server capabilities

Please make sure the OS supports the following softwares, they are installed and executable globally.
* [git](https://git-scm.com/)
* [nodejs 18 or more](https://nodejs.org)
* [yarn](https://yarnpkg.com/)
* a text editor (like vi or nano)

### Load the source code
```
git clone https://github.com/Servant-Cities/Transparency-and-explainability-for-algorithmic-decisions-at-work.git
```

### Create a production bundle
1. Move to the app folder and create the .env file (eg: with nano)
```
cd Transparency-and-explainability-for-algorithmic-decisions-at-work/app
cp .env.example .env
nano .env
```

2. Install dependencies and build the app
```
yarn
yarn build
```

### Setup for production
You should set up a reverse proxy of your choice to apply SSL certificates and serve the index.html file located in the newly created "build" folder. make sure all the folder is served or some important ressources might be missing.

### Clean behind
Only the build folder is required to run the app, the rest of the source code can be deleted and the .env file use to build the app can be deleted or stored somewhere else for future updates.




