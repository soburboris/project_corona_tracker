import { fetchDailyData } from './api/index';

export const fetchMyAPI = async () => {
	
      const Data = await fetchDailyData()
		const  sort = (arr) => arr.map((item, i) => {
        
         if (i%2 === 0) {
         return  {
           ...item,
          Confirmed:(Data[i+1]?.Confirmed - Data[i]?.Confirmed),
           Active:(Data[i+1]?.Active - Data[i]?.Active),
            Deaths:(Data[i+1]?.Deaths - Data[i]?.Deaths), 
            date:(Data[i+1]?.date), 
            Province:(Data[i]?.Province), 
            Country:(Data[i]?.Country)
          }

          } else if(i%2 === 1) {
         return  {
           ...item,
          Confirmed:(Data[i+1]?.Confirmed - Data[i]?.Confirmed),
           Active:(Data[i+1]?.Active - Data[i]?.Active),
            Deaths:(Data[i+1]?.Deaths - Data[i]?.Deaths), 
            date:(Data[i+1]?.date), 
            Province:(Data[i]?.Province), 
            Country:(Data[i]?.Country)
          }
        } 
				return []
          
      })


     

    return sort(Data).slice(0,-1)
   
   
      
    };

 