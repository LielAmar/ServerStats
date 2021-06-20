# ServerStats

<!-- SHIELDS -->
[![Discord][discord-shield]][discord-url]

<!-- ABOUT -->

## What is ServerStats?
ServerStats is a Node API used to save & track information on players for gaming platforms with multiple game-servers.
<br>
It uses [Express][express-url] & [TypeScript][typescript-url].
<br><br>
Found this API useful? Give it a ⭐!

## Requirements
[NodeJS][nodejs-url] & [MySQL][mysql-url]


### Set Up
1. Install MySQL on your machine
    - Set up your credentials
    - Create a database for the API

2. Set up your game_servers.json file
    - Create an endpoint pointing to this file, preferably with some sort of authentication
    - Make sure its scheme is following the schema in ```game_servers_example.json``` 

3. Fork the API
    - Run ```npm install``` to install all dependencies
    - Change ```example.env``` to ```.env``` and fill it with your information
    
4. Run the API
    - Use ```npm run build``` to build the project
    - Use ```npm run prod``` to run the production version
    - Use ```npm run dev``` to run a local dev server using [Nodemon][nodemon-url] for any further development
    
## REST Endpoints
```HTTP``` ```GET``` ```/v1.0/statistics```

```HTTP``` ```GET``` ```/v1.0/statistics/:startTimestamp```

```HTTP``` ```GET``` ```/v1.0/statistics/:startTimestamp?endTimestamp=<timestamp>```

```HTTP``` ```PUT``` ```/v1.0/statistics/```

- All requests take an ```Authorization``` Game-Server token or the Master token
- The Master Token is used to retrieve information on all servers and not just a specific one related to the given token
- Put requests require a ```player_identifier``` & ```player_address``` parameters in the body

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT][mit-license-url]
     

<!-- LINKS & IMAGES -->
[discord-shield]: https://img.shields.io/discord/416652224505184276?color=%235865F2&label=Join%20My%20Discord
[discord-url]: https://discord.gg/NzgBrqR
[express-url]: https://expressjs.com/
[typescript-url]: https://www.typescriptlang.org/
[nodejs-url]: https://nodejs.dev/
[mysql-url]: https://www.mysql.com/
[nodemon-url]: https://www.npmjs.com/package/nodemon
[mit-license-url]: https://choosealicense.com/licenses/mit/
