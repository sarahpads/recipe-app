import React from "react"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import RecipeCard from "./RecipeCard/RecipeCard"
import { Grid } from "@material-ui/core"

const query = gql`
  query {
    recipes {
      id, title, image, duration, description, isFavourite
    }
  }
`

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(query)

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
      {data.recipes.map((recipe: any) => (
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