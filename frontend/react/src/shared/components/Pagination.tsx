import { useState } from 'react';

interface Props {
  total: number;
  pageSize: number;
  onPageChange: (offset: number) => void;
}

function Pagination({ total, pageSize, onPageChange }: Props) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const goTo = (next: number) => {
    setPage(next);
    onPageChange(next * pageSize);
  };

  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => goTo(page - 1)}>
        Prev
      </button>
      <span>
        Page {page + 1} of {totalPages}
      </span>
      <button disabled={page >= totalPages - 1} onClick={() => goTo(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
