import React, { useState } from 'react';
import { FiDollarSign, FiSend, FiArrowDown, FiArrowUp } from 'react-icons/fi';

const bankAccounts = [
  { id: 1, name: 'Conta Corrente', number: '1234-5' },
  { id: 2, name: 'Conta Poupança', number: '5678-9' },
];

export default function BankingOperations() {
  const [operation, setOperation] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [destinationAccount, setDestinationAccount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (operation === 'deposit') {
      alert(`Depósito de R$ ${amount} realizado com sucesso da conta ${selectedAccount}`);
    } else {
      alert(`Transferência de R$ ${amount} realizada com sucesso para a conta ${destinationAccount}`);
    }
    setAmount('');
    setSelectedAccount('');
    setDestinationAccount('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Operações Bancárias</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className={`flex items-center px-4 py-2 rounded-md ${
            operation === 'deposit' ? 'bg-black text-white' : 'bg-white text-black'
          }`}
          onClick={() => setOperation('deposit')}
        >
          <FiArrowDown className="mr-2" />
          Depositar
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-md ${
            operation === 'transfer' ? 'bg-black text-white' : 'bg-white text-black'
          }`}
          onClick={() => setOperation('transfer')}
        >
          <FiArrowUp className="mr-2" />
          Transferir
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Valor
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              className="focus:ring-black focus:border-black block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">BRL</span>
            </div>
          </div>
        </div>
        {operation === 'deposit' ? (
          <div>
            <label htmlFor="account" className="block text-sm font-medium text-gray-700">
              Conta de Origem
            </label>
            <select
              id="account"
              name="account"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              required
            >
              <option value="">Selecione uma conta</option>
              {bankAccounts.map((account) => (
                <option key={account.id} value={account.number}>
                  {account.name} - {account.number}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="destinationAccount" className="block text-sm font-medium text-gray-700">
              Conta de Destino
            </label>
            <input
              type="text"
              name="destinationAccount"
              id="destinationAccount"
              className="mt-1 focus:ring-black focus:border-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Número da conta"
              value={destinationAccount}
              onChange={(e) => setDestinationAccount(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            {operation === 'deposit' ? (
              <>
                <FiArrowDown className="mr-2" /> Depositar
              </>
            ) : (
              <>
                <FiSend className="mr-2" /> Transferir
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}