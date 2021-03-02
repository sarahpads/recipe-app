import React from "react"
import RecipeCard from "../Recipe/RecipeCard/RecipeCard"
import { useRecipesQuery } from "../graphql"

const Home: React.FC = () => {
  const { data, loading, error } = useRecipesQuery()

  if (error) {
    return <div>Error</div>
  }

  if (loading || !data) {
    return <div>Loading</div>
  }

  return (
    <React.Fragment>
      {data.recipes.map((recipe) => (
        <RecipeCard
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          duration={recipe.duration}
          description={recipe.description}
          isFavourite={recipe.isFavourite}
        />
      ))}
    </React.Fragment>
  )
}

export default Home