import React from "react";
import styled from "styled-components";

const Pagination = ({ goToPrevPage, goToNextPage }) => {
  return (
    <PaginationContainer>
      {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  margin: 0 0 30px 30px;
`;
