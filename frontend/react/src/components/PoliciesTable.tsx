import Pagination from '../shared/components/Pagination';
import type { Policy } from '../shared/types/policies.types';

interface Props {
  policies: Policy[];
  total: number;
  pageSize: number;
  onPageChange: (offset: number) => void;
}

function PoliciesTable({ policies, total, pageSize, onPageChange }: Props) {
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
            <tr key={policy.id}>
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
      <Pagination total={total} pageSize={pageSize} onPageChange={onPageChange} />
    </div>
  );
}

export default PoliciesTable;
