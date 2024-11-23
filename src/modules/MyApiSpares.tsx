import { MySpares, ApiResponse } from "./MyInterface";
import { MOCK_DATA_SPARES } from "./MockDataSpares";



export const getSpareByPrice = async (
    price_by_value : string,
    price_up_value : string 
  ): 
  Promise<ApiResponse> => {

    if (price_by_value === '') price_by_value = '0'
    if (price_up_value === '') price_up_value = '10000002'



//tsc -b && vite build
    try {

      // const response = await fetch(`http://localhost:4173/api/spares/list/?price_by=${Number(price_by_value)}&price_up=${Number(price_up_value)}`, {signal});

      const response = await fetch(`api/spares/list/?price_by=${Number(price_by_value)}&price_up=${Number(price_up_value)}`);
      // http://192.168.1.5:8000

      const text = await response.text();

      const data = JSON.parse(text);
      return data;
    } 
    catch(error) {
      const filteredData = MOCK_DATA_SPARES.Spares.filter(spare => 
        spare.price_spare >= Number(price_by_value) && spare.price_spare <= Number(price_up_value)
      );

      return { Spares: filteredData };
    }

};

export const getSpareByID = async (
    id_spare : string | number
  ): 
  Promise<MySpares> => {

    try {
      // const response = await fetch(`http://localhost:4173/api/spares/${id_spare}/info/`, {signal})
      const response = await fetch(`api/spares/${id_spare}/info/`)
      const text = await response.text();

      const data = JSON.parse(text);
      return data;
    } 
    catch(error) {
      return MOCK_DATA_SPARES.Spares[Number(id_spare) - 1]
    }

};