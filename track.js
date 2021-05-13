const Koa = require('koa');
var Router = require('koa-router');
const shortid = require('shortid');
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


        collection.updateOne({id:ctx.params},{$push:{opens:ctx.headers}},{upsert: true }).then(()=>{

            if(debug)
                console.log("logged - " + ctx.params);

            ctx.set('Content-Type', 'image/jpeg');

            ctx.body = `âJPG
   
IHDR      \b   µ\f   IDATx⁄cd®  Ö ÅE¥F8    IENDÆB\`Ç`

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
