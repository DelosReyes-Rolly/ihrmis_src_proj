import axios from "axios"
import { API_HOST } from "../helpers/global/global_config"

export const plantillaItemApi = async () => {
    const response = await axios.get(API_HOST + '/plantilla-items')
    
}