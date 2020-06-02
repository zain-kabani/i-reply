This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running

To start react front-end run
### `npm start`

To start express back-end run (note: this backend is no longer necessary as all chatlogs are now stored in Firebase)
### `npm run server`

## Notes
Authentication uses Google Firebase and requires a `.env` configuration file for Firebase in the root folder under this format: 
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_appId=
```
