import { MySpares, ApiResponse } from "./MyInterface";
import { MOCK_DATA_SPARES } from "./MockDataSpares";



export const getSpareByPrice = async (
    price_by_value : string,
    price_up_value : string 
  ): 
  Promise<ApiResponse> => {

    if (price_by_value === '') price_by_value = '0'
    if (price_up_value === '') price_up_value = '10000000'

    try {

      const response = await fetch(`http://localhost:8000/spares/list/?price_by=${Number(price_by_value)}&price_up=${Number(price_up_value)}`);
      return await response.json();
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
      const response = await fetch(`http://localhost:8000/spares/${id_spare}/info/`);
      return await response.json();
    } 
    catch(error) {
      return MOCK_DATA_SPARES.Spares[Number(id_spare) - 1]
    }

};