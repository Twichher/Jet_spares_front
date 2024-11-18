import { MySpares, ApiResponse } from "./MyInterface";
import { MOCK_DATA_SPARES } from "./MockDataSpares";



export const getSpareByPrice = async (
    price_by_value : string,
    price_up_value : string 
  ): 
  Promise<ApiResponse> => {

    if (price_by_value === '') price_by_value = '0'
    if (price_up_value === '') price_up_value = '10000002'

    const timeout = 5000; 
    const controller = new AbortController();
    const signal = controller.signal;
  
    const timeoutId = setTimeout(() => controller.abort(), timeout);


//tsc -b && vite build
    try {

      const response = await fetch(`https://my-local-server.local:8000/spares/list/?price_by=${Number(price_by_value)}&price_up=${Number(price_up_value)}`, {signal});

      // const response = await fetch(`api/spares/list/?price_by=${Number(price_by_value)}&price_up=${Number(price_up_value)}`, {signal});

      clearTimeout(timeoutId);

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

    const timeout = 5000;
    const controller = new AbortController();
    const signal = controller.signal;
  
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`https://my-local-server.local:8000/spares/${id_spare}/info/`, {signal})
      // const response = await fetch(`api/spares/${id_spare}/info/`, {signal})

      clearTimeout(timeoutId);
      const text = await response.text();

      const data = JSON.parse(text);
      return data;
    } 
    catch(error) {
      return MOCK_DATA_SPARES.Spares[Number(id_spare) - 1]
    }

};