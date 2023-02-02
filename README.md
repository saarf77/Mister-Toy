# Mister-Toy

End-To-End project, this is the frontend repository.
Used a CLI.
Implemented full CRUD, manage your state with a store.

1. store
2. toyService
b. communicate remotely with our backend via AJAX
3. toy-details (Smart, Routable)
  a. This page renders full details about the toy
  b. It also render the toy's reviews.
4. toy-edit (Smart, Routable)
5. toy-app (Smart, Routable)
  a. toy-list
  b. toy-preview
  c. toy-filter (name, in stock, lable, sortby)


Done? Build that backend
Create your own backend.
Provide an API for CRUD based on a json file.
Use postman to test your API

* Note: The frontend runs on a different port than our backend. in this situation we need our backend to allow CORS requests (Cross Origin).

This is simply done by:npm install cors(in the backend)
Then, add the following code in server.js:
const cors = require('cors')
app.use(cors());

npm run dev to start the server

![Screenshot (1341)](https://user-images.githubusercontent.com/64427190/216397427-20230004-7ff6-49e1-978e-e177ca040e29.png)
![Screenshot (1342)](https://user-images.githubusercontent.com/64427190/216397435-c1a4599b-692b-40cd-8de5-5f882a2b24d5.png)
![Screenshot (1343)](https://user-images.githubusercontent.com/64427190/216397445-05312aee-5f4e-408e-90f4-10ddb977ac38.png)
![Screenshot (1344)](https://user-images.githubusercontent.com/64427190/216397462-f8169228-f5df-4272-960c-aa9a774aec2b.png)
