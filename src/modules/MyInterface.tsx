export interface MySpares {

    id_spare : number
    name_spare : string
    description_spare : string
    status_spare : number 
    url_spare ?: string
    price_spare : number

}

export interface ApiResponse {
    Spares: MySpares[];
}