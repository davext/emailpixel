const Koa = require('koa');
var Router = require('koa-router');
const shortid = require('shortid');
const send = require('koa-send');

require('dotenv').config()



const MongoClient = require('mongodb').MongoClient;

const app = new Koa();

const router = new Router();

const debug = true;




const uri = process.env.mongoURI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

    if(debug)
        console.log(err)

    const collection = client.db("emailTracker").collection("emails");
    // perform actions on the collection object


    router.get('/', async (ctx, next) => {
        ctx.status=404
        ctx.body = {error:"malformed request"}
    });

    router.get('/idpls', async (ctx, next) => {
        ctx.body = await shortid.generate()
    });

    router.get("/t/:id", async (ctx, next) => {


        await collection.updateOne({id:ctx.params},{$push:{opens:ctx.headers}},{upsert: true }).then(async ()=>{

            if(debug)
            {
                console.log("logged - ");
                console.log(ctx.params);
            }

            ctx.set('Content-Type', 'image/gif');
            ctx.set('Cache-Control','no-store, no-cache, must-revalidate, max-age=0');
            ctx.set('Pragma', 'no-cache');
            ctx.set('Expires', 0);


            await send(ctx,"./signature.gif")

        });




        // console.log(ctx.params)

        //log to db and send fake pic

    });


    router.get("/r/:id",async (ctx, next) => {

        ctx.body = await collection.findOne({id:ctx.params})

    });
    // router.post('/', (ctx, next) => {
    //     // your post route handling
    // });





    app
        .use(router.routes())
        .use(router.allowedMethods());


    app.listen(3050);
    console.log("listening on port 3050")

    // client.close();
});
