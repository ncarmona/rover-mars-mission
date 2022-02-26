# rover-mars-mission

Housfy technical interview. Given a planet and a rover controlled by the user you must perform a rover mars mission.

## Planet
It is a weird planet with an square form and obstacles.

## Planet configuration
Planet size it is provided by mapsize in the __config.ts__ file.
## Exercise requirements
- Before mission start user must give: Commands, orientation and start position.
- Rover can perform the following commands: F(Forward), L(Left) and R(Right).
- Rover must have an specific orientation: North, East, South and West.
- Rover must detect obstacles.
- If rover can perfom all commands without find any obstacle the mission will be a success.
- If rover finds an obstacle will notify the user the obstacle position and abort the mission.

## Execute rover-mars-mission
### Software requirements
This project only runs in the client side, so only [node](https://nodejs.dev/download) it's needed.

### Project dependencies
In order to run the project go to the root folder of the project and exec this command:
> npm run install

Once the process ends all dependencies will be installed and the project it is ready for run.

### Execution
In the root folder of the project execute:
> npm run serve

and open the url provided in your terminal.