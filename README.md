# timeclock-svelte

## Setup

Put your Firebase config values in `.env` (or `.env.development` etc)

### Example of .env file
```
FIREBASE_API_KEY=<your api key>
FIREBASE_AUTH_DOMAIN="<your project id>.firebaseapp.com"
FIREBASE_DATABASE_URL="https://<your project id>.firebaseio.com"
FIREBASE_PROJECT_ID=<your project id>
FIREBASE_STORAGE_BUCKET="<your project id>.appspot.com"
FIREBASE_MESSAGING_SENDER_ID=<your sender id>
FIREBASE_APP_ID=<your app id>
```

## Data created by the clock in/out app

### After first clock in
```
{
  employee: {
    firstName: "Matt",
    id: "E5Hast6...", // firebase employee doc id
    lastName: "Something"
  },
  employeeId: "E5Hast6...", // firebase employee doc id
  finish: null,
  isApproved: false,
  start: {
    comment: "",
    screenShotData: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...",
    timestamp: // firebase timestamp (created from js Date object)
  }
}
```

### After clock out
```
{
  // as above plus:
  finish: {
    comment: "Left early",
    screenShotData: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...",
    timestamp: // firebase timestamp (created from js Date object)
  }
}
```

Additional shifts on the same day (eg after lunch) are completely separate shift docs in their own right (ie it's up to the frontend to group them as required).