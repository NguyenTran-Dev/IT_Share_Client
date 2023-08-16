import { Grid, GridItem, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { IPost } from '../../../../interfaces';
import CardPost from '../../post/cardPost/CardPost';
import { useRoot } from './hooks/useRoot';

const MyPost = () => {
  const { listMyPost } = useRoot();

  const renderPost = () => {
    return listMyPost.map((item: IPost) => {
      return (
        <ListItem mt="2rem" key={item._id}>
          <CardPost item={item} />
        </ListItem>
      );
    });
  };
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4}>
      <GridItem colSpan={12}>
        <List mt="2rem">{renderPost()}</List>
      </GridItem>
    </Grid>
  );
};

export default MyPost;
