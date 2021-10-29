import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeBtn = user ? (
    liked ? (
      <Button color="blue">
        <Icon name="heart" />
        Like
      </Button>
    ) : (
      <Button color="blue" basic>
        <Icon name="heart" />
        Like
      </Button>
    )
  ) : (
    <Button as={Link} to={`/login`} color="blue" basic>
      <Icon name="heart" />
      Like
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeBtn}
      <Label basic color="blue" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
