## API URL

https://search-devs.herokuapp.com

## ROUTES DOCUMENTATION
```
GET: / ----> Route to test AP DevI

GET: /devs ----> Get All devs withou filters
    RETURNS: [DEVSCHEMA]

GET: /search ----> Filter Devs by TECHS and LOCATION
    PARAMS:  {
        "techs": [String],
        "long": Number,
        "lat": Number
    } 
    RETURNS: [DEVSCHEMA]

POST: /devs ----> Register a dev
    PARAMS:  {
        "github_username": String!,
        "techs": [String],
        "long": Number!,
        "lat": Number!
    }
    RETURNS: DEVSCHEMA

DELETE: /devs/:id/delete ---->  Delete a dev, pass the id in the uri


GET: /devs ----> Get All devs withou filters
    RETURNS: [TECHSCHEMA]
```

### DEVSCHEMA
```
{
    "techs": [String],
    "_id": ID!,
    "name": String,
    "bio": String,
    "github_username": String!,
    "user_profile": String!,
    "avatar_url": String,
    "location": {
        "coordinates": [ Number, Number ],
        "_id": ID!,
        "type": "Point"
    },
    "__v": Number
}
```

### TECHSCHEMA
```
{
    "_id": ID!,
    "name": String!
}
```