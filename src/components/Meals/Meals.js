import React from 'react'
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
// import classes from './Meals.module.css'

function Meals() {
    
    return (
        <React.Fragment>
            <MealsSummary/>
            <AvailableMeals/>
        </React.Fragment>
    )
}

export default Meals
