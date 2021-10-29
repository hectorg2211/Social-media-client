import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function PostForm() {
  // const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      /* Fetching the data from the cache and storing it inside the
      data variable */
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const posts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
      // values.body = "";
    },
    onError(error) {
      // setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Last post"
            name="body"
            onChange={onChange}
            value={values.body}
            // error={errors ? true : false}
          />
          <Button type="submit" color="blue">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {/* { errors && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ui className="list"> <li>{errors}</li> </ui>
        </div>
      )} */}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
