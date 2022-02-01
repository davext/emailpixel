const Koa = require('koa');
var Router = require('koa-router');
const  nanoid   = require('nanoid/async')
const send = require('koa-send');

require('dotenv').config();



const MongoClient = require('mongodb').MongoClient;

const app = new Koa();

const router = new Router();

const debug = process.env.Debug;



const uri = process.env.mongoURI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

    if(debug)
        console.log(err);

    const collection = client.db("emailTracker").collection("emails");

    router.get('/', async (ctx) => {
        ctx.status=404;
        ctx.body = {error:"malformed request"}
    });

    router.get('/idpls', async (ctx) => {
        ctx.body = await nanoid.nanoid()
    });

    router.get("/t/:id", async (ctx) => {


        ctx.headers.timestamp = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});

        await collection.updateOne({id:ctx.params},{$push:{opens:ctx.headers}},{upsert: true }).then(async ()=>{

            if(debug)
            {
                console.log("logged - and about to write ");
                console.log(ctx.params);
            }

            ctx.set('Content-Type', 'image/gif');
            ctx.set('Cache-Control','no-store, no-cache, must-revalidate, max-age=0');
            ctx.set('Pragma', 'no-cache');
            ctx.set('Expires', 0);


            await send(ctx,"./signature.gif")

        });
    });


    router.get("/r/:id",async (ctx) => {
        if(debug) {
            console.log("about to read")
            console.log(ctx.params);
        }

        ctx.body = await collection.findOne({id:ctx.params})

    });

    app
        .use(router.routes())
        .use(router.allowedMethods());


    app.listen(3050);
    console.log("listening on port 3050")

    // client.close();
});
