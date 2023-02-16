# Ride-It: Backend and Microservice
[add description]

# ENV Variables
- `DB_HOST` = MariaDB host [string]
- `DB_USER` = MariaDB user [string]
- `HMAC_KEY` = HMAC Secret [hexadecimal]
- `AES_KEY` = AES Secret [hexadecimal]

# Debugging
`npm start`

# Compiling
`./node_modules/.bin/tsc --outDir ./build`

# Running
Use PM2 for production:
`pm2 start ./build/server.js --name ride-it-backend`

