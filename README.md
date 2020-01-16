## API URL

https://search-devs.herokuapp.com

## ROUTES DOC
```
get: / ----> Route to test AP DevI

get: /devs ----> Get All devs withou filters
    RETURNS: [DEVSCHEMA]

get: /search ----> Filter Devs by TECHS and LOCATION
    PARAMS:  {
        "techs": [String],
        "long": Number,
        "lat": Number
    } 
    RETURNS: [DEVSCHEMA]

post: /devs ----> Register a dev
    PARAMS:  {
        "github_username": String!,
        "techs": [String],
        "long": Number!,
        "lat": Number!
    }
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