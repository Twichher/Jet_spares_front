import { ApiResponse } from "./MyInterface";


export const MOCK_DATA_SPARES : ApiResponse = {
    Spares : [

        {

            id_spare: 1,
            name_spare : "Двигатель инжекторный DLE60CC",
            description_spare : "Бензиновый инжекторный двигатель от известного производителя моторов DLE, рекомендованный для использования на больших самолётах, таких как VolJet VT10 и VolJet VT20.",
            status_spare : 0,
            price_spare : 498090
    
        },
    
        {
    
            id_spare: 2,
            name_spare : "Регулятор двигателя HOBBYWING",
            description_spare : "Регулятор скорости для бесколлекторных многополюсных двигателей, предназначен для мультикоптеров.",
            status_spare : 0, 
            url_spare : "regul.png",
            price_spare : 5240
    
        },
    
        {
    
            id_spare: 3,
            name_spare : "Сервопривод EMAX ES 9258",
            description_spare : "Мощный цифровой сервопривод с металлическими шестернями, Futaba/JR-совместимый.",
            status_spare : 0, 
            // url_spare : "servoprivod.png",
            price_spare : 2570
    
        }

    ]
}