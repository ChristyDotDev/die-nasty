# Die Nasty League Site

League site for my dynasty fantasy NFL league, hosted at [dienasty.football](https://dienasty.football). First few requests will always timeout as it's using a backend on Heroku which takes an age to start up and I've not got round to optimising this yet

# Getting Started

To run:
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000).

# Deploy

One-click deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/christytc10/die-nasty&utm_source=github&utm_medium=nextstarter-cs&utm_campaign=devex-cs)


# Config

Env variables required:
```
league_id=[the ID of the league in Sleeper]
league_api=[URL of the dienasty_backend]
```
