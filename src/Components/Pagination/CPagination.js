import React from "react";
import style from './Pagination.css'
import left from "../../images/left.png"
import right from "../../images/right.png"



const CPagination = ({ goToCurrentPage, prevPage, nextPage, page }) => {
  const pages = [1, 2, 3, 4, 5, 6,7];
  return (
    <div className="buttons">
      <button id="prev" onClick={prevPage} disabled={page === 1}>
        <img src={left} alt="PreviousIcon" />
      </button>
      {pages.map((ele, active) => {
        return (
            <button
              className="button-num"
              key={active}
              id={page === ele ? "active" : ""}
              onClick={() => goToCurrentPage(ele)}
            >
              {ele}
            </button>
        );
      })}
      <button id="next" onClick={nextPage} disabled={page === 6}>
        <img src={right} alt="NextIcon" />
      </button>
    </div>
  );
};
export default CPagination;
