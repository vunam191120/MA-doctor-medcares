import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import Button from '../Button';

export default function Pagination({ count, setPage, currentPage }) {
  const handleClickPage = (page) => {
    setPage(page);
  };

  const handleClickNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleClickPrevious = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className="pagination-container">
      <Button
        onClick={handleClickPrevious}
        disabled={currentPage === 1}
        className="button square button--light prev"
        type="button"
      >
        <BiChevronLeft className="icon" />
      </Button>
      {count &&
        Array(Math.ceil(count / 5))
          .fill(0)
          .map((item, index) => (
            <Button
              onClick={() => handleClickPage(index + 1)}
              key={index}
              className={`button square button--light ${
                currentPage === index + 1 ? 'active' : ''
              }`}
            >
              <span>{index + 1}</span>
            </Button>
          ))}
      <Button
        onClick={handleClickNext}
        disabled={currentPage >= Math.ceil(count / 5)}
        className="button square button--light next"
        type="button"
      >
        <BiChevronRight className="icon" />
      </Button>
    </div>
  );
}
