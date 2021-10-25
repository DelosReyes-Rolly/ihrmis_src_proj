import { useState } from "react";
import phil from "phil-reg-prov-mun-brgy";

export const useLocationService = () => {
    
    const [city, setCity] = useState(null);
    const [brgy, setBrgy] = useState(null);

    // GET CITY
    const getCity = (value) => {
        let province_code = null;
        phil.provinces.forEach(element => {
            if(element.name == value){
                province_code = element.prov_code;
            }
        });
        setCity(phil.getCityMunByProvince(`${province_code}`));
    }
    // GET BARANGAY
    const getBarangay = (value) => {
        let city_code = null;
        
        phil.city_mun.forEach(element => {
            if(element.name == value){
                city_code = element.mun_code;
            }
        });
        setBrgy(phil.getBarangayByMun(`${city_code}`));
    }

    return [city, brgy, getCity, getBarangay]

}


