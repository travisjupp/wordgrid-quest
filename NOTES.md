# Notes

Random and probably totally unorganized notes for WordGrid Quest



## Gameplay

How do you play this game?
You have to match a jumbled phrase with its definition.

What type of game is this? 
Word puzzle game for spaced-repitition method of learning.

Why do I want to play this game? 
You want to learn about a particular subject while being thoroughly
entertained.

What do I hope to achieve by playing this game?
You will gain a masterful command of a subject of your choosing.

Is it really just a game, or is it a tool?
It is a tool wrapped in a game.

## Loading data

How do I load my learning materials into this app?

1. Choose the load material option from the menu
2. Fill in the Category field
3. Create a term and its definition for the category
4. Create more terms as needed

## Figma Prototype Data

Create token with 
Help and Account > Account Settings > Security
Generate New Token with permissions: File Content Read 

curl -H 'X-Figma-Token: YOUR_PERSONAL_ACCESS_TOKEN' 'https://api.figma.com/v1/files/<file id>'

### View fonts used
curl -H 'X-Figma-Token: YOUR_PERSONAL_ACCESS_TOKEN' 'https://api.figma.com/v1/files/IiHd2g9zMPmTjf26rPoZbq' | jq '[.. | select(type == "object" and has("style")) | .style] | unique'



