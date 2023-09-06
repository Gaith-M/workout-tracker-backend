# Requirements

## Endpoints

- Auth:
    - Register: done
    - Login: done
    - Refresh: done

- Data:
    - Routine
    - Exercise
    - User

## Middleware

- Verify: check if there is a token sent in the request


## Current status:

The auth routes are implemented now. Users can register, login, logout and request new access tokens using their refresh token.

The next step is to allow the user to create routines and exercises. Routines are made of exercises which the user have created.
This means the exercises are directly connected to their creator, and other users can't see the exercises created by said user.

This also means if the user haven't created any exercises yet, he can't create routines.
Thus, the next step now is to enable creation of exercises.

An exercise requires the following data:
- Title
- sets: and for each set:
    - reps. and for each rep
        - weight

- notes

in order to create progression, the exercise should store sets under days/sessions. where each session corresponds to an array of sets.

structure:
    progression: sessions[]
        session: sets[]
            set: 

sessions:
    entries[]: {date: string, sets: set[]}
        set: {
            reps:
            weight:
        }

In other words the exercise will contain a sessions property.
Sessions is an array of entries.
an entry is an object that contains date and sets.
sets is an array that contains objects. each object represents a rep
a rep then is an object that contains number of reps and the weight of the set.


An exercise can be created now. creating an exercise will only fill the name and date fields and associate the created exercise with the user who created it.
the progression field is left empty.
It's filled by actively entered a dedicated view from which an entry is appended to the field.

Thus the next step now is to create an endpoint which enables CRUD operations on the progression field. this requires an update to the progression schema. I think each entry should have an id of its own, which begs the question, should each entry be its own entity? or should I leave them as an array and relay on the order of insertion? pros and cons for each? I'll stay with the current model. whether it succeed or fails, it's a learning experience.

The first endpoint will be creating an entry. 

Current status:
I've created endpoints which fetch all exercises created by a user, and an endpoint which adds entries to an exercise.
now, I need to allow the user to:
- update an exercise (title/name only) - done
- delete an exercise - done
- get a specific exercise - done

I ALSO MUST create a unified interface for responses. (done)