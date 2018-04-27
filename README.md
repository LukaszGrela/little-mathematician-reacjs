# Little Mathematicion
An educational web app for simple math training. Project made with ReactJS to learn this library.

## Live Link
[Little Mathematician Web App](http://greladesign.com/little-mathematician/)

### Tested on
- Windows 7 Chrome, FireFox, Opera, IE11
- Windows 10 Chrome, Brave, FireFox, Edge
- iPhone 5 Safari
- iPad 2 Safari

### Ideas
Revision of the game
 - game state: finished|not-finished
 -- finished - game was played to the end
 --- finished - can be reviewed
 -- not-finished - game is not completed, either in the middle of the play or exited mid-way
 --- not-finished - can be continued
 - game id - game identifier

 routes:
 /game:addition/gameId/1 - first question of addition game
 /game:addition/review/gameId/1 - first question of addition game review

 #### firebase 
 Storage of the player data

 - anonymous player - no storage
 - registered player
 