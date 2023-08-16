/* eslint-disable no-unused-vars */
import { SearchIcon } from '@chakra-ui/icons';
import { Box, IconButton, Input, InputGroup } from '@chakra-ui/react';
import React, { FC, useEffect, useId, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';

interface IInputSearch {
  onSearch: (searchVal: string) => void;
  rest: any;
}

const InputSearch: FC<IInputSearch> = (props) => {
  const { onSearch, rest } = props;
  const [searchParams] = useSearchParams();
  const keySearch = searchParams.get('search');
  const [searchVal, setSearchVal] = useState<string>(keySearch ?? '');

  const handleSearch = () => {
    onSearch(searchVal);
  };

  const onChangeSearch = (value: string) => {
    setSearchVal(value);
    window.history.pushState(
      { urlPath: '/' },
      '',
      `${ROUTES.MUSERS}?search=${value}`
    );
  };

  return (
    <InputGroup w="100%" borderRadius="0.5rem" {...rest}>
      <Box>
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchVal}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </Box>

      <IconButton
        colorScheme="blue"
        ml="1rem"
        w="100%"
        maxW={{ base: '1rem', md: '8rem' }}
        aria-label="Tìm kiếm"
        icon={<SearchIcon />}
        onClick={handleSearch}
      />
    </InputGroup>
  );
};

export default InputSearch;
