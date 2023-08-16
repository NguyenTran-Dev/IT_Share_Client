import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import AccountUser from '../../components/accountUser/AccountUser';
import { useRoot } from './hooks/useRoot';
import MDEditor from '@uiw/react-md-editor';

const Detail = () => {
  const { posts } = useRoot();

  return (
    <Container pt="7rem" maxW="70rem" minH={'74.7vh'}>
      <Box mb={'1rem'}>
        <AccountUser item={posts?.[0] ?? {}} />
      </Box>
      <Heading textAlign="center" my={'1rem'}>
        {posts?.[0]?.title ?? ''}
      </Heading>
      <MDEditor.Markdown
        source={posts?.[0]?.description ?? ''}
        style={{
          backgroundColor: 'unset',
        }}
      />
    </Container>
  );
};

export default Detail;
