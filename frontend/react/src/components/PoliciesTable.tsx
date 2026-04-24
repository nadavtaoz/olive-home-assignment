import Pagination from '../shared/components/Pagination';
import type { Policy } from '../shared/types';

interface Props {
  policies: Policy[];
  total: number;
  offset: number;
  pageSize: number;
  onPageChange: (offset: number) => void;
}

const EXPIRY_WINDOW_DAYS = 30;

function isExpiringSoon(policy: Policy): boolean {
  if (policy.status !== 'active') return false;
  const now = Date.now();
  const end = new Date(policy.endDate).getTime();
  const windowEnd = now + EXPIRY_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return end >= now && end <= windowEnd;
}

function PoliciesTable({ policies, total, offset, pageSize, onPageChange }: Props) {
  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Policy #</th>
            <th>Holder</th>
            <th>Insurer</th>
            <th>Type</th>
            <th>Status</th>
            <th>Premium</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id} className={isExpiringSoon(policy) ? 'expires-soon' : undefined}>
              <td>{policy.policyNumber}</td>
              <td>{policy.holderName}</td>
              <td>{policy.insurerName}</td>
              <td>{policy.type}</td>
              <td>{policy.status}</td>
              <td>{policy.premium}</td>
              <td>{new Date(policy.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination total={total} pageSize={pageSize} currentPage={Math.floor(offset / pageSize)} onPageChange={onPageChange} />
    </div>
  );
}

export default PoliciesTable;
