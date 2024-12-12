import { useEffect, useState } from "react";
import api from "../axios";
import { Link } from "react-router";

const ListPayment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await api.get("/payments");
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>

        <Link to="/payment">Create Payment</Link>
      </div>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Payment ID</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Currency</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.transaction_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${payment.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListPayment;
