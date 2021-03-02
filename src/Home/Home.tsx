import React from "react"
import RecipeCard from "./RecipeCard/RecipeCard"
import { useRecipesQuery } from "../graphql"
import { Grid } from "@material-ui/core"

const Home: React.FC = () => {
  const { data, loading, error } = useRecipesQuery()

  if (error) {
    return <div>Error</div>
  }

  if (loading || !data) {
    return <div>Loading</div>
  }

  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
      {data.recipes.map((recipe) => (
        <Grid item xs={4} key={recipe.id}>
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            duration={recipe.duration}
            description={recipe.description}
            isFavourite={recipe.isFavourite}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Home