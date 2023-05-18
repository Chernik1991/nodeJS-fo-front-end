import * as process from "process";
import {MongoClient} from 'mongodb'
export type productType = {
    id: number,
    title: string
}
const mongoUri= process.env.mongoUri||"mongodb://0.0.0.0:27017"
const client=new MongoClient(mongoUri);
const db=client.db("shop")
export const productCollection = db.collection<productType>("products");
export async function runDb(){
    try {
        await client.connect()
        await client.db("product").command({ping:1})

    }catch {
        console.log("Can't connect to db")
        await client.close()
    }
}