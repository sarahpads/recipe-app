import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  favourites: Array<Favourite>;
  recipe: Recipe;
  recipes: Array<Recipe>;
};


export type QueryRecipeArgs = {
  id: Scalars['String'];
};

export type Favourite = {
  __typename?: 'Favourite';
  id: Scalars['ID'];
  user: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['ID'];
  title: Scalars['String'];
  image: Scalars['String'];
  duration: Scalars['Float'];
  description: Scalars['String'];
  isFavourite: Scalars['Boolean'];
  numFavourites: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRecipe: Recipe;
  favourite: Recipe;
  unfavourite: Recipe;
};


export type MutationCreateRecipeArgs = {
  data: CreateRecipeInput;
};


export type MutationFavouriteArgs = {
  id: Scalars['String'];
};


export type MutationUnfavouriteArgs = {
  id: Scalars['String'];
};

export type CreateRecipeInput = {
  title: Scalars['String'];
  duration: Scalars['Float'];
  description: Scalars['String'];
  image: Scalars['String'];
};

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = (
  { __typename?: 'Query' }
  & { recipes: Array<(
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'id' | 'title' | 'image' | 'duration' | 'description' | 'isFavourite'>
  )> }
);

export type FavouriteMutationVariables = Exact<{
  recipeId: Scalars['String'];
}>;


export type FavouriteMutation = (
  { __typename?: 'Mutation' }
  & { favourite: (
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'id' | 'isFavourite'>
  ) }
);

export type UnfavouriteMutationVariables = Exact<{
  recipeId: Scalars['String'];
}>;


export type UnfavouriteMutation = (
  { __typename?: 'Mutation' }
  & { unfavourite: (
    { __typename?: 'Recipe' }
    & Pick<Recipe, 'id' | 'isFavourite'>
  ) }
);


export const RecipesDocument = gql`
    query Recipes {
  recipes {
    id
    title
    image
    duration
    description
    isFavourite
  }
}
    `;

/**
 * __useRecipesQuery__
 *
 * To run a query within a React component, call `useRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecipesQuery(baseOptions?: Apollo.QueryHookOptions<RecipesQuery, RecipesQueryVariables>) {
        return Apollo.useQuery<RecipesQuery, RecipesQueryVariables>(RecipesDocument, baseOptions);
      }
export function useRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecipesQuery, RecipesQueryVariables>) {
          return Apollo.useLazyQuery<RecipesQuery, RecipesQueryVariables>(RecipesDocument, baseOptions);
        }
export type RecipesQueryHookResult = ReturnType<typeof useRecipesQuery>;
export type RecipesLazyQueryHookResult = ReturnType<typeof useRecipesLazyQuery>;
export type RecipesQueryResult = Apollo.QueryResult<RecipesQuery, RecipesQueryVariables>;
export const FavouriteDocument = gql`
    mutation Favourite($recipeId: String!) {
  favourite(id: $recipeId) {
    id
    isFavourite
  }
}
    `;
export type FavouriteMutationFn = Apollo.MutationFunction<FavouriteMutation, FavouriteMutationVariables>;

/**
 * __useFavouriteMutation__
 *
 * To run a mutation, you first call `useFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [favouriteMutation, { data, loading, error }] = useFavouriteMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<FavouriteMutation, FavouriteMutationVariables>) {
        return Apollo.useMutation<FavouriteMutation, FavouriteMutationVariables>(FavouriteDocument, baseOptions);
      }
export type FavouriteMutationHookResult = ReturnType<typeof useFavouriteMutation>;
export type FavouriteMutationResult = Apollo.MutationResult<FavouriteMutation>;
export type FavouriteMutationOptions = Apollo.BaseMutationOptions<FavouriteMutation, FavouriteMutationVariables>;
export const UnfavouriteDocument = gql`
    mutation Unfavourite($recipeId: String!) {
  unfavourite(id: $recipeId) {
    id
    isFavourite
  }
}
    `;
export type UnfavouriteMutationFn = Apollo.MutationFunction<UnfavouriteMutation, UnfavouriteMutationVariables>;

/**
 * __useUnfavouriteMutation__
 *
 * To run a mutation, you first call `useUnfavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfavouriteMutation, { data, loading, error }] = useUnfavouriteMutation({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useUnfavouriteMutation(baseOptions?: Apollo.MutationHookOptions<UnfavouriteMutation, UnfavouriteMutationVariables>) {
        return Apollo.useMutation<UnfavouriteMutation, UnfavouriteMutationVariables>(UnfavouriteDocument, baseOptions);
      }
export type UnfavouriteMutationHookResult = ReturnType<typeof useUnfavouriteMutation>;
export type UnfavouriteMutationResult = Apollo.MutationResult<UnfavouriteMutation>;
export type UnfavouriteMutationOptions = Apollo.BaseMutationOptions<UnfavouriteMutation, UnfavouriteMutationVariables>;