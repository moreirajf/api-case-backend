import { AppDataSource } from "./data-source";
import { Carrier } from "./entity/Carrier";
import express from "express";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ limit: '50mb', parameterLimit: 5000, extended: true }));
app.listen(process.env.PORT || 3333, () => { console.log("Server listening on port 3333")});
app.use(routes);

AppDataSource.initialize().then(async () => {

    const carrier = new Carrier()
    const carrier1 = new Carrier()

    const carriers = await AppDataSource.manager.find(Carrier)

    if (carriers.length && (carriers.map(a => a.carrier_name).includes("Entrega Ninja") && (carriers.map(a => a.carrier_name).includes("Entrega KaBuM")))) {
        
        console.log(carriers.map(a => a.carrier_name))
        console.log("Data already exist.")
    } else {
        carrier.carrier_name = "Entrega Ninja";
        carrier.carrier_constant = 0.3;
        carrier.min_height = 10;
        carrier.max_height = 200;
        carrier.min_width = 6;
        carrier.max_width = 140;
        carrier.delivery_time = 6;
    
        carrier1.carrier_name = "Entrega KaBuM";
        carrier1.carrier_constant = 0.2;
        carrier1.min_height = 5;
        carrier1.max_height = 140;
        carrier1.min_width = 13;
        carrier1.max_width = 125;
        carrier1.delivery_time = 4;
        
        await AppDataSource.manager.save(carrier)
        console.log("Saved a new user with id: " + carrier.id)
    
        await AppDataSource.manager.save(carrier1)
        console.log("Saved a new user with id: " + carrier1.id)
    }

}).catch(error => console.log(error))
