import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

// Dados fictícios com evolução diária para compra e venda
const dataEvolution = {
  buy: {
    Bitcoin: [
      { day: '01/09', value: 5000 },
      { day: '02/09', value: 5100 },
      { day: '03/09', value: 5200 },
      { day: '04/09', value: 5300 },
      { day: '05/09', value: 5400 },
    ],
    Ethereum: [
      { day: '01/09', value: 3000 },
      { day: '02/09', value: 3100 },
      { day: '03/09', value: 3150 },
      { day: '04/09', value: 3200 },
      { day: '05/09', value: 3300 },
    ],
    Cardano: [
      { day: '01/09', value: 1000 },
      { day: '02/09', value: 1050 },
      { day: '03/09', value: 1100 },
      { day: '04/09', value: 1150 },
      { day: '05/09', value: 1200 },
    ],
    Polkadot: [
      { day: '01/09', value: 500 },
      { day: '02/09', value: 520 },
      { day: '03/09', value: 530 },
      { day: '04/09', value: 540 },
      { day: '05/09', value: 550 },
    ],
  },
  sell: {
    Bitcoin: [
      { day: '01/09', value: 4900 },
      { day: '02/09', value: 4950 },
      { day: '03/09', value: 5000 },
      { day: '04/09', value: 5050 },
      { day: '05/09', value: 5100 },
    ],
    Ethereum: [
      { day: '01/09', value: 2900 },
      { day: '02/09', value: 2950 },
      { day: '03/09', value: 3000 },
      { day: '04/09', value: 3050 },
      { day: '05/09', value: 3100 },
    ],
    Cardano: [
      { day: '01/09', value: 900 },
      { day: '02/09', value: 950 },
      { day: '03/09', value: 1000 },
      { day: '04/09', value: 1050 },
      { day: '05/09', value: 1100 },
    ],
    Polkadot: [
      { day: '01/09', value: 480 },
      { day: '02/09', value: 490 },
      { day: '03/09', value: 500 },
      { day: '04/09', value: 510 },
      { day: '05/09', value: 520 },
    ],
  },
};

const cryptoColors = {
  Bitcoin: '#F7931A',
  Ethereum: '#627EEA',
  Cardano: '#0033AD',
  Polkadot: '#E6007A',
};

export default function InvestCryptoPage() {
  const [selectedCrypto, setSelectedCrypto] = useState('Bitcoin');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [activeSection, setActiveSection] = useState('buy');

  const handleInvest = (action) => {
    alert(`Você ${action} ${investmentAmount} em ${selectedCrypto}`);
  };

  const currentData = dataEvolution[activeSection][selectedCrypto];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Investir em Criptomoedas</h1>

      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 ${activeSection === 'buy' ? 'bg-black text-white' : 'bg-white text-black'}`}
          onClick={() => setActiveSection('buy')}
        >
          Comprar
        </button>
        <button
          className={`px-4 py-2 mx-2 ${activeSection === 'sell' ? 'bg-black text-white' : 'bg-white text-black'}`}
          onClick={() => setActiveSection('sell')}
        >
          Vender
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seção da lista de criptomoedas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Criptomoedas Disponíveis para {activeSection === 'buy' ? 'Compra' : 'Venda'}
          </h2>
          <ul className="space-y-4">
            {Object.keys(dataEvolution[activeSection]).map((coin) => {
              const coinData = dataEvolution[activeSection][coin];
              const latestValue = coinData[coinData.length - 1].value;
              return (
                <li
                  key={coin}
                  className={`p-4 rounded-lg cursor-pointer ${selectedCrypto === coin ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setSelectedCrypto(coin)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: cryptoColors[coin] }}></div>
                      <p className="font-semibold">{coin}</p>
                    </div>
                    <p className="font-bold">R${latestValue.toLocaleString('pt-BR')}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Gráfico e Detalhes da Criptomoeda */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Evolução de {selectedCrypto}</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke={cryptoColors[selectedCrypto]} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-4">Quantidade: {currentData.length} dias de dados</p>
        </div>
      </div>

      {/* Formulário para Realizar Investimentos */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Realizar {activeSection === 'buy' ? 'Compra' : 'Venda'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleInvest(activeSection === 'buy' ? 'comprou' : 'vendeu'); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={`Digite a quantidade para ${activeSection === 'buy' ? 'comprar' : 'vender'}`}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className={`${
                activeSection === 'buy' ? 'bg-black hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'
              } text-white px-4 py-2 rounded flex items-center`}
            >
              {activeSection === 'buy' ? <FiArrowUp className="mr-2" /> : <FiArrowDown className="mr-2" />}
              {activeSection === 'buy' ? 'Comprar' : 'Vender'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}