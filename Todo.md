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