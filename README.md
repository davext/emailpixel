# emailpixel

Create a link and track all the headers that request it!

## Usage

### To track:
```
emailPixel.example.com/t/:id

example: emailPixel.example.com/t/xyz
```
To track an :id. You can use this anywhere you want. Best usage would be as in image in an email. Example:
```
<img src="emailPixel.example.com/t/xyz" alt="signature">
```



### To read:
```
emailPixel.example.com/r/:id
example: emailPixel.example.com/r/xyz
```

This will return a JSON back to you with an array of all the headers that hit the tracking link with a timestamp.


## How to install?

Easy 3 Steps to get started!

Step 1
Clone the repo
```
git clone https://github.com/davext/emailpixel.git
```

Step 2
Set up your environment variable. 
```
cp .envExample .env
vim .env
```
Then add your Mongo DB URI to the file in this format:
```
mongoURI=mongodb+srv://username:password@MongoServer.com/databaseName?retryWrites=true&w=majority
Debug=true
```

Step 3
We would essentially need to run it. So it depends if you want to try it out first, you can 
```
npm run track.js
```
However, if you'd like to use it in production, I would recommend using [pm2](https://github.com/Unitech/pm2) and a reverse NGINX proxy and secure it with a [Let's Encrypt SSL certificate](https://certbot.eff.org/)
Your NGINX file should look like this:
https://gist.github.com/davext/2653de2b07503eafe6f0d52b59ba64fa






