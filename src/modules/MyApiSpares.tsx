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

      // const response = await fetch(`/api/spares/list/?price_by=${Number(price_by_value)}&price_up=${Number(price_up_value)}`);
      //https://better-worlds-dance.loca.lt/spares/list/?price_by=0&price_up=100000000
      const response = await fetch(`https://better-worlds-dance.loca.lt/spares/list/?price_by=${Number(price_by_value)}&price_up=${Number(price_up_value)}`, {
        method: 'GET',
        mode: 'cors'
      });
      // return await response.json();
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
      const response = await fetch(`https://better-worlds-dance.loca.lt/spares/${id_spare}/info/`, {
        method: 'GET',
        mode: 'cors'
      });
      // return await response.json();
      const text = await response.text();
      console.log('Response Text:', text);

      const data = JSON.parse(text);
      console.log(data)
      return data;
    } 
    catch(error) {
      return MOCK_DATA_SPARES.Spares[Number(id_spare) - 1]
    }

};