import React,{useState,useEffect} from 'react'
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import env from 'react-dotenv';

function AvailableMeals() {
    const [Meals,setMeals] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    useEffect(
        ()=>{
        const fetchMeals = async() => {
            setIsLoading(true);
            setError(null);
            
            const response = await fetch(process.env.REACT_APP_REQUEST_MEAL);
            if(!response.ok){
                throw new Error('Something went wrong');
            }
            const responseData = await response.json();
    
            const loadedMeals = [];
            for(const key in responseData){
                loadedMeals.push({
                    id:key,
                    name:responseData[key].name,
                    description :responseData[key].description,
                    price: responseData[key].price,
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        }
        fetchMeals().catch((err)=>{
            setIsLoading(false);
            setError(err.message);
        });
        
    },[])
    
    let content = "Not Found Data";
    if(isLoading){
        content = <p className={classes['loading_meals']}>Loading....</p>
    }
    if(error){
        content= <p className={classes['error']}>{error}</p>
    } 
    if(Meals.length>0){
        const mealsList = Meals.map((meal)=> 
        <MealItem key = {meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}></MealItem>
        ) 

        content = <Card><ul>{mealsList}</ul></Card>
    }
    return (
        <section className={classes.meals}>
            {content}
        </section>
    )
}

export default AvailableMeals

