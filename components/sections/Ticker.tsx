import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TickerItem } from '../../types';

const MOCK_DATA: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 'R$ 455.863,00', change: '6.59%', isPositive: false },
  { symbol: 'ETH', name: 'Ethereum', price: 'R$ 14.716,09', change: '9.29%', isPositive: false },
  { symbol: 'USDT', name: 'Tether', price: 'R$ 5,36', change: '0.39%', isPositive: true },
  { symbol: 'XRP', name: 'XRP', price: 'R$ 10,71', change: '8.83%', isPositive: false },
  { symbol: 'BNB', name: 'BNB', price: 'R$ 4.362,02', change: '8.87%', isPositive: false },
  { symbol: 'USDC', name: 'USDC', price: 'R$ 5,35', change: '0.40%', isPositive: true },
  { symbol: 'SOL', name: 'Solana', price: 'R$ 667,83', change: '9.60%', isPositive: false },
  { symbol: 'TRX', name: 'TRON', price: 'R$ 1,49', change: '1.21%', isPositive: false },
  { symbol: 'STETH', name: 'Lido Staked Ether', price: 'R$ 14.711,47', change: '9.28%', isPositive: false },
  { symbol: 'DOGE', name: 'Dogecoin', price: 'R$ 0,71', change: '10.92%', isPositive: false },
  { symbol: 'FIGR', name: 'Figure Heloc', price: 'R$ 5,55', change: '2.01%', isPositive: true },
  { symbol: 'ADA', name: 'Cardano', price: 'R$ 2,01', change: '11.29%', isPositive: false },
  { symbol: 'WBT', name: 'WhiteBIT Coin', price: 'R$ 307,76', change: '2.13%', isPositive: false },
  { symbol: 'WSTETH', name: 'Wrapped stETH', price: 'R$ 17.953,10', change: '9.30%', isPositive: false },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 'R$ 455.232,00', change: '6.57%', isPositive: false },
  { symbol: 'BCH', name: 'Bitcoin Cash', price: 'R$ 2.755,55', change: '7.49%', isPositive: false },
  { symbol: 'WBETH', name: 'Wrapped Beacon ETH', price: 'R$ 15.939,95', change: '9.33%', isPositive: false },
  { symbol: 'USDS', name: 'USDS', price: 'R$ 5,36', change: '0.41%', isPositive: true },
  { symbol: 'LEO', name: 'LEO Token', price: 'R$ 52,69', change: '0.37%', isPositive: true },
  { symbol: 'BSC-USD', name: 'Binance Bridged USDT', price: 'R$ 5,36', change: '0.33%', isPositive: true },
];

const Ticker: React.FC = () => {
  return (
    <div className="w-full h-14 bg-neo-dark border-y border-neo-green/20 flex items-center overflow-hidden relative z-30">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-neo-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-neo-black to-transparent z-10"></div>
      
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex space-x-12 px-4"
          animate={{ x: [0, -2000] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
        >
          {/* Double list for smooth loop */}
          {[...MOCK_DATA, ...MOCK_DATA, ...MOCK_DATA].map((item, index) => (
            <div key={`${item.symbol}-${index}`} className="flex items-center space-x-3 font-mono text-sm border-r border-neo-green/10 pr-12 last:border-0">
              <span className="font-bold text-gray-400">{item.symbol}</span>
              <span className="text-neo-green">{item.price}</span>
              <span className={`flex items-center text-xs ${item.isPositive ? 'text-neo-toxic' : 'text-red-500'}`}>
                {item.isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                {item.isPositive ? '▲' : '▼'} {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Ticker;