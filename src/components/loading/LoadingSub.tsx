import { Center, Image } from '@chakra-ui/react';
import React from 'react';
import loadingSvg from '../../assets/svgs/loading2.svg';

const LoadingSub = (props: { isLoading: boolean }) => {
  return props.isLoading ? (
    <Center w="100%">
      <Image src={loadingSvg} alt="Loading" />
    </Center>
  ) : (
    <></>
  );
};

export default LoadingSub;
