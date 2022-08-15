import { AppDataSource } from "../data-source";
import { Carrier } from "../entity/Carrier";
export interface ProductDimensions {
    dimensao: {
        altura: number,
        largura: number
    },
    peso: number
}

export default class CarrierService {

    async getCarrying(dimensions: ProductDimensions, callback: any) {
        console.log(dimensions)

        const repo = AppDataSource.getRepository(Carrier)
        const res = await repo.find()
        console.log("result");
        console.log(res)

        let resultPayload: {}[] = []

        res.forEach(e => {
            if(dimensions.dimensao.altura >= e.min_height 
            && dimensions.dimensao.altura <= e.max_height
            && dimensions.dimensao.largura >= e.min_width
            && dimensions.dimensao.largura <= e.max_width
            && dimensions.peso > 0) {
                resultPayload.push(
                    {
                        nome: e.carrier_name,
                        valor_frete: (e.carrier_constant*dimensions.peso)/10,
                        prazo_dias: e.delivery_time
                    }
                )
            }
        })
        
        return callback(resultPayload, null);
    }
}