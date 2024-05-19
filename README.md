# Kids with Grids

> Repository for "Searching for rewards like a child means less generalization and more directed exploration"  
> Originally adopted from Schulz, Wu, Ruggeri and Meder (Psychological Science, 2019)  
> Code migration by Vasanth (NTU Center for Lifelong Learning and Individualized Cognition (CLIC), 2024)

## Brief Overview
This document provides essential information on deployment and basic working principles of the Node.js-based GridSearch game application.
detailed hosting steps here https://youtu.be/DfvaqkA_EOA
---

## Description
**Kids with Grids** is a Node.js application that transforms the traditional GridSearch game, originally designed for Cordova, into a web-based interactive experience. This game offers a unique blend of tasks and challenges centered around grid-based exploration and decision-making, making it an intriguing tool for both educational and research purposes. Developed using Express.js, this application seamlessly integrates with a SQL database, ensuring efficient data management and persistence.

---

## Features
- Web-based interface for playing the GridSearch game.
- Server-side logic written in Node.js using Express.js.
- Database integration using `mssql` for storing game data.
- Responsive web design for various devices and screen sizes using bootstrap(although it could be more responsive).

## Installation
### Prerequisites
- Node.js (latest stable version recommended)
- SQL Server (for database functionality)

### Steps to Install
1. Clone the repository: `git clone https://github.com/vasanthsreeram/kwg`
2. Navigate to the project directory: `cd kwg`
3. Install dependencies: `npm install`

## Configuration
### .env File
Create a `.env` file in the root directory of your project. Add the following environment-specific variables on new lines in the form of `NAME=VALUE`:
```plaintext
DB_USER=username
PASSWORD=password
SERVER=server.database.windows.net
DB_DATABASE=DB
```
Replace username, password, server.database.windows.net, and DB with your actual database credentials.

## Running the Application
1. Set environment variables for database access in `.env` file: `password` and `server`.
2. Start the server: `npm start`
3. Access the application at `http://localhost:3000`.

## Application Structure
- `server.js`: The main server file that sets up the Express application, routes, and database connection.
- `public/`: Contains static files like HTML, CSS, and JavaScript for the client-side.
- `index.html`: The main HTML file for the game interface.

## JavaScript Files in /public
- `gridSearch.js`: Manages the game logic, including grid generation, score tracking, and user interactions within the GridSearch game.
- `isrc-utils.js`: Contains utility functions and handlers, facilitating operations like data saving, routing between different parts of the application, and preloading images for a smoother user experience.
- `stimuli.js`: Responsible for managing and presenting different stimuli in the game, handling user responses, and navigating through the different stages of the game.

## API Endpoints
- `GET /sm`: Serves the game interface with smooth condition.
- `GET /rg`: Serves the game interface with an rough condition.
- `GET /`: Serves the game interface with an random condition.
- `POST /submit-data`: Endpoint to submit game data to the database.

## Condition modification.
Modification of condition can be done by changing the `kernalRough.json` and `kernalSmooth.json file`

## Database Configuration
The application connects to a SQL database using configurations defined in `server.js`. Ensure that the SQL Server is running and accessible. The database schema should match the expectations in the `submit-data` endpoint. Below is the SQL command to create the required table in the database:

```
CREATE TABLE dbo.GridGame (
    ID INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    UID INT,
    Duration FLOAT,
    Date DATETIME,
    Condition INT,
    Scale NVARCHAR(MAX),
    EnvOrder NVARCHAR(MAX),
    tscollect NVARCHAR(MAX),
    xcollect NVARCHAR(MAX),
    ycollect NVARCHAR(MAX),
    zcollect NVARCHAR(MAX),
    zcollectScaled NVARCHAR(MAX),
    BonusLevel NVARCHAR(MAX),
    StarArray NVARCHAR(MAX),
    TesterNotes NVARCHAR(MAX)
);
```

## Deployment
### Deploying to a Cloud Platform (e.g., Heroku, AWS, Azure)
1. Set up an account on your chosen cloud platform.
2. Deploy the Node.js application following the platform's guidelines.
3. Ensure the environment variables for database access are correctly set in the cloud platform's configuration.
4. Access the deployed application through the provided URL.


## Contributing
Contributions to this project are welcome. Please submit pull requests for any enhancements, bug fixes, or documentation improvements.


