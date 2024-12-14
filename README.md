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


## Deploy the app on a VM

### Server capabilities

Please make sure the OS supports the following softwares, they are installed and executable globally.
* [git](https://git-scm.com/)
* [nodejs v20 or 18](https://nodejs.org)
* [yarn](https://yarnpkg.com/)
* [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)
* a text editor (like vi or nano)

Also make sure the port 3000 is availble and open for http connections.

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

### Run the app
1. Make sure you are in the app folder and have successfully ran the previous commands


2. Run this command to start the app and make it accessible on port 3000
Using nodejs v20
```
node --env-file=.env build
```

Alternatively using nodejs v18
```
export $(grep -v '^#' .env | xargs) && node build
```


### Setup for production
1. Use the following command to manage the app with pm2 with a name specific to the microsite you want to run.
```
export $(grep -v '^#' .env | xargs) && pm2 start build/index.js -n name-of-the-microsite
```

Alternatively, you can [adapt these values to your ecosystem file](https://pm2.keymetrics.io/docs/usage/environment/), feel free to change the PORT variable in case you run multiple microsites on the same server. 
You only need one build folder per campaign organizer but be aware than the "PUBLIC_CAMPAIGN_ORGANIZER_URL" is staticaly defined in it.
```
{
        name: "name-of-the-microsite",
        script: "absolute-path-to-build/index.js",
        watch: true,
        instance_var: 'INSTANCE_ID',
        env: {
            PORT: "3000",
            ...copy your .env variables here
        }
      }
```

2. You should also set up a reverse proxy of your choice to apply SSL certificates and forward requests for the domain allocated to the app. ([Example with Nginx](https://www.baeldung.com/nginx-forward-proxy))


### Clean behind
Only the following files are required to run the app:
* .env file 
* build folder

You can delete all the rest (be aware this might cause conflicts if you want to update the app using git pull instead of cloning the app again)







