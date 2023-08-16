import { Center, Image } from '@chakra-ui/react';
import React from 'react';
import loadingSvg from '../../assets/svgs/loading2.svg';
import { useLoading } from '../../providers/LoadingProvider';

const Loading = () => {
  const { loading } = useLoading();
  return loading ? (
    <Center
      w="100%"
      h="100vh"
      backgroundColor="whiteAlpha.500"
      position="fixed"
      zIndex={99}
      top="0"
      left="0"
    >
      <Image src={loadingSvg} alt="Loading" />
    </Center>
  ) : (
    <></>
  );
};

export default Loading;
