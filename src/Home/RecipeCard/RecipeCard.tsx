import React from "react"
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, makeStyles } from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import ShareIcon from "@material-ui/icons/Share"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import { gql } from "graphql-tag"
import { useMutation } from "@apollo/client"

interface RecipeCardProps {
  id: string
  title: string
  image: string
  duration: number
  description: string
  isFavourite: boolean
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  rating: {
    marginBottom: '1rem',
    marginTop: '0.5rem'
  }
}));

const favouriteQuery = gql`
  mutation Favourite($recipeId: String!) {
    favourite(id: $recipeId) { id, isFavourite }
  }
`

const unfavouriteQuery = gql`
  mutation Unfavourite($recipeId: String!) {
    unfavourite(id: $recipeId) { id, isFavourite }
  }
`

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  const classes = useStyles()
  const [favourite] = useMutation(favouriteQuery)
  const [unfavourite] = useMutation(unfavouriteQuery)

  function onBookmarkClick() {
    if (!props.isFavourite) {
      favourite({ variables: { recipeId: props.id }})
    } else {
      unfavourite({ variables: { recipeId: props.id }})
    }
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.title}
      />

      <CardContent>
        <Typography variant="h5" component="h2">{props.title}</Typography>
        <Rating className={classes.rating} name="recipe-rating" value={4} size="small" readOnly />

        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onBookmarkClick}>
          {props.isFavourite ? <BookmarkIcon/> : <BookmarkBorderIcon />}
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default RecipeCard