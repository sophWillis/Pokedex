import React from "react";
import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  return (
    <SearchContainer >
      <Input
        type="text"
        placeholder="Search"
      />
      <SearchIcon />
    </SearchContainer>
  )
}

export default Search;

const SearchContainer = styled.form`
  position: relative;
`;

const SearchIcon = styled(IoSearchSharp)`
  position: absolute;
  left: 20px;
  height: 40px;
  font-size: 1rem;
  color: rgba(0, 0, 0, 50%);
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  background-color: #eee;
  border-radius: 30px;
  margin-bottom: 20px;
  font-size: 1rem;
  padding: 0 45px;
  outline: none;
`;
