import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import style from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';



const AvailableMeals = () =>{
  const [ meals,setMeals] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() =>{
    const fetchFunction = async() =>{
     const response = await fetch('https://food-order-70acd-default-rtdb.firebaseio.com/meals.json');
     if(!response.ok){
       throw new Error('Something went wrong');
     }
     const data = await response.json();

     const loadedMeal = [];
     for( let key in data){
        loadedMeal.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          description: data[key].description
        })
     }
     setMeals(loadedMeal);
     setLoading(false)
    };
    
       fetchFunction()
       .catch((e) =>{
          setLoading(false);
           setError(e.message)
       });
    
  },[])

  if(loading){
    return <section className={style.loading}>
      <p>Loading....</p>
    </section>
  }
  if(error){
    return <section className={style.Httperror}>
      <p>{error}</p>
    </section>
  }

    const mealsList =  meals.map(meal =><MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    return <section className={style.meals}>
      <Card>
        <ul>
            {
               mealsList
            }
        </ul>
      </Card>
    </section>
};


export default AvailableMeals;