import React from "react"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"
import RecipeCard from "../Recipe/RecipeCard/RecipeCard"

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

  return data.recipes.map((recipe: any) => (
    <RecipeCard
      id={recipe.id}
      title={recipe.title}
      image={recipe.image}
      duration={recipe.duration}
      description={recipe.description}
      isFavourite={recipe.isFavourite}
    />
  ))
}

export default Home