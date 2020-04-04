import React from 'react';
import style from './Recipe.module.css'

const recipe = ({ name, inst, img, glass, amounts, ingredients }) => {

    // Revome null amounts
    var filteredAmounts = amounts.filter(function (el) {
        return el != null;
    });

    //remove null ingredients
    var filteredIngredients = ingredients.filter(function (el) {
        return el != null;
    });

    //combine amounts with correct ingredient
    const ingAmount = [];
    for (var i = 0; i < filteredIngredients.length; i++) {
        if (filteredAmounts[i] != null) {
            var x = filteredAmounts[i] + " - " + filteredIngredients[i];
        }
        else {
            var x = filteredIngredients[i];
        }
        ingAmount[i] = x;
    }

    return (
        <div className={style.Recipe}>
            <h1>{name}</h1>
            <img className={style.image} src={img} alt="" />
            <h4 className={style.title}>Ingredients: </h4>
            <ul className={style.ing}>
                {ingAmount.map(ingAmount => (
                    <li>{ingAmount}</li>
                ))}
            </ul>
            <h4 className={style.title}>Directions: </h4>
            <p className={style.content}>{inst}</p>
            <p>Serve in: {glass}</p>
        </div>
    );
}

export default recipe;