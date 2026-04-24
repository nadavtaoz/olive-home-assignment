interface Props {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (offset: number) => void;
}

function Pagination({ total, pageSize, currentPage, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const goTo = (next: number) => {
    onPageChange(next * pageSize);
  };

  return (
    <div className="pagination">
      <button disabled={currentPage === 0} onClick={() => goTo(currentPage - 1)}>
        Prev
      </button>
      <span>
        Page {currentPage + 1} of {totalPages}
      </span>
      <button disabled={currentPage >= totalPages - 1} onClick={() => goTo(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
