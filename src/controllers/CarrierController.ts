import { Request, Response } from 'express'
import CarrierService from "../services/CarrierService";

export default class CarrierController {

    static getCarrying(req: Request, res: Response) {
        const MIN_ALT = 5
        const MAX_ALT = 200
        const MIN_LARG = 6
        const MAX_LARG = 140

        const {altura, largura} = req.body.dimensao;
        const {peso} = req.body

        let errorInval: {field: string, message: string}[] = []

        if (!req.body.dimensao.altura || altura < 0) {
            errorInval.push({
                field: "altura",
                message: "A valid value of the altura parameter is required."
            })
        }
        if (!req.body.dimensao.largura || largura < 0) {
            errorInval.push({
                field: "largura",
                message: "A valid value of the largura parameter is required."
            })
        }
        if (peso < 0) {
            errorInval.push({
                field: "peso",
                message: "A valid value of the peso parameter is required."
            })
        }


        if(!errorInval.length) {
            const carrierServiceInstance = new CarrierService();
           
            const result:any = carrierServiceInstance.getCarrying(req.body, (result: unknown, err: unknown) => {
                if (result !== null) {
                    return res.status(200).json(result);
                }
                return res.status(500).json(err);
            });
            
        } else { 
            return res.status(200).json(errorInval); 
        }

        
    }
}
