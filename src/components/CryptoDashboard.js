import React from 'react';
import { FiArrowUp, FiArrowDown, FiRefreshCw } from 'react-icons/fi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const walletData = [
  { name: 'Bitcoin', value: 5000, amount: 0.1, color: '#F7931A' },
  { name: 'Ethereum', value: 3000, amount: 1.5, color: '#627EEA' },
  { name: 'Cardano', value: 1000, amount: 1000, color: '#0033AD' },
  { name: 'Polkadot', value: 500, amount: 50, color: '#E6007A' },
];

// Saldo total depositado na carteira (Exemplo: 20,000)
const saldoTotal = 20000;

// Saldo investido é a soma dos valores das criptomoedas no walletData
const saldoInvestido = walletData.reduce((sum, coin) => sum + coin.value, 0);

export default function CryptoDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Minha Carteira</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-1">Saldo Total</h2>
          <p className="text-sm text-gray-600 mb-1">Valor depositado na carteira</p>
          <p className="text-4xl font-bold mb-4">R${saldoTotal.toLocaleString('pt-BR')}</p>

          <h2 className="text-xl font-semibold mb-1">Saldo Investido</h2>
          <p className="text-sm text-gray-600 mb-1">Valor atualmente investido em ativos</p>
          <p className="text-4xl font-bold">R${saldoInvestido.toLocaleString('pt-BR')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Distribuição de Ativos</h2>
          <div className="flex justify-center items-center">
            <PieChart width={250} height={250}>
              <Pie
                data={walletData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                fill="#8884d8"
              >
                {walletData.map((coin, index) => (
                  <Cell key={`cell-${index}`} fill={coin.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$${value.toLocaleString('pt-BR')}`} />
            </PieChart>
          </div>
          <div className="flex flex-wrap justify-center mt-4">
            {walletData.map((coin) => (
              <div key={coin.name} className="flex items-center mr-4 mb-2">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: coin.color }}></div>
                <span className="text-sm">{coin.name} ({((coin.value / saldoInvestido) * 100).toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Minhas Criptomoedas</h2>
        <div className="space-y-4">
          {walletData.map((coin) => (
            <div key={coin.name} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{coin.name}</p>
                <p className="text-sm text-gray-600">{coin.amount} {coin.name}</p>
              </div>
              <p className="font-bold">R${coin.value.toLocaleString('pt-BR')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center">
          <FiArrowUp className="mr-2" /> Depositar
        </button>
        <button className="bg-white text-black px-4 py-2 rounded flex items-center">
          <FiArrowDown className="mr-2" /> Sacar
        </button>
        <button className="bg-transparent text-black px-4 py-2 rounded flex items-center">
          <FiRefreshCw className="mr-2" /> Atualizar
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">Desempenho Recente</h2>
        <p className="text-sm text-gray-600 mb-4">Variação nas últimas 24 horas</p>
        <div className="space-y-2">
          {walletData.map((coin) => {
            const isPositive = Math.random() > 0.5;
            const performanceValue = (Math.random() * 10).toFixed(2);
            return (
              <div key={coin.name} className="flex justify-between items-center">
                <p>{coin.name}</p>
                <p className={isPositive ? "text-green-600" : "text-red-600"}>
                  {isPositive ? "+" : "-"}{performanceValue}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
