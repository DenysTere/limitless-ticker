'use client';

import { useState } from 'react';

// Types
interface Market {
  id: string;
  question: string;
  category: string;
  subcategory: string;
  yesPrice: number; // 0-1, represents probability
  noPrice: number;
  volume: number;
  traderCount: number;
  closesAt: Date;
  trending?: number;
}

// Sample data
const sampleMarket: Market = {
  id: '1',
  question: 'Will the Chiefs win Super Bowl 2026?',
  category: 'Sports',
  subcategory: 'NFL',
  yesPrice: 0.68,
  noPrice: 0.32,
  volume: 45200,
  traderCount: 1247,
  closesAt: new Date(Date.now() + 2 * 60 * 60 * 1000 + 34 * 60 * 1000),
  trending: 3,
};

// Utility functions
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatTimeRemaining(date: Date): string {
  const diff = date.getTime() - Date.now();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function calculateWinnings(amount: number, price: number): number {
  return amount / price;
}

// Components
function MarketHeader({ market }: { market: Market }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
      <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm">Back</span>
      </button>

      <div className="flex items-center gap-3">
        <button className="p-2 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="p-2 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function MarketInfo({ market }: { market: Market }) {
  return (
    <div className="px-4 py-6">
      {/* Category & Timer */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏈</span>
          <span className="text-sm text-zinc-400">
            {market.category} · {market.subcategory}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-zinc-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Closes: {formatTimeRemaining(market.closesAt)}</span>
        </div>
      </div>

      {/* Question */}
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
        {market.question}
      </h1>

      {/* Probability Bar */}
      <div className="relative h-12 rounded-lg overflow-hidden bg-zinc-900 mb-2">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500/30 to-green-500/10 flex items-center justify-start pl-4"
          style={{ width: `${market.yesPrice * 100}%` }}
        >
          <span className="text-green-400 font-semibold">
            YES {Math.round(market.yesPrice * 100)}%
          </span>
        </div>
        <div
          className="absolute inset-y-0 right-0 bg-gradient-to-l from-red-500/30 to-red-500/10 flex items-center justify-end pr-4"
          style={{ width: `${market.noPrice * 100}%` }}
        >
          <span className="text-red-400 font-semibold">
            NO {Math.round(market.noPrice * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function TradingCard({
  type,
  price,
  onTrade,
}: {
  type: 'YES' | 'NO';
  price: number;
  onTrade: (amount: number) => void;
}) {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);

  const isYes = type === 'YES';
  const amounts = [10, 50, 100];

  const potentialWinnings = calculateWinnings(selectedAmount, price);

  const handleTrade = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onTrade(selectedAmount);
    setIsLoading(false);
  };

  return (
    <div
      className={`
        relative p-5 rounded-xl border transition-all duration-200
        hover:scale-[1.01] hover:shadow-lg
        ${
          isYes
            ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40 hover:shadow-green-500/10'
            : 'bg-red-500/5 border-red-500/20 hover:border-red-500/40 hover:shadow-red-500/10'
        }
      `}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className={`text-lg font-semibold ${isYes ? 'text-green-400' : 'text-red-400'}`}>
          BUY {type}
        </h3>
        <p className="text-sm text-zinc-400">
          {price.toFixed(2)} per share
        </p>
      </div>

      {/* Amount Selection */}
      <div className="flex gap-2 mb-4">
        {amounts.map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`
              flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
              ${
                selectedAmount === amount
                  ? isYes
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }
            `}
          >
            ${amount}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
          <input
            type="number"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg py-2 pl-7 pr-3 text-white focus:outline-none focus:border-zinc-500"
            min={1}
          />
        </div>
      </div>

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={isLoading}
        className={`
          w-full py-3 px-4 rounded-lg font-semibold text-white transition-all
          flex items-center justify-center gap-2
          ${
            isYes
              ? 'bg-green-500 hover:bg-green-400 active:scale-[0.98]'
              : 'bg-red-500 hover:bg-red-400 active:scale-[0.98]'
          }
          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <>
            Trade {type}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      {/* Potential Winnings */}
      <p className="mt-3 text-center text-sm text-zinc-400">
        Win{' '}
        <span className={`font-semibold ${isYes ? 'text-green-400' : 'text-red-400'}`}>
          {formatCurrency(potentialWinnings)}
        </span>{' '}
        if {type}
      </p>
    </div>
  );
}

function SocialProof({ market }: { market: Market }) {
  return (
    <div className="flex items-center justify-center gap-6 py-4 px-4 border-t border-zinc-800 text-sm text-zinc-400">
      <div className="flex items-center gap-1">
        <span>👥</span>
        <span>{market.traderCount.toLocaleString()} traders</span>
      </div>
      <div className="flex items-center gap-1">
        <span>📊</span>
        <span>{formatCurrency(market.volume)} volume</span>
      </div>
      {market.trending && (
        <div className="flex items-center gap-1">
          <span>🔥</span>
          <span>Trending #{market.trending}</span>
        </div>
      )}
    </div>
  );
}

function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 bg-zinc-900 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How does this work?
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-zinc-900 rounded-lg text-sm text-zinc-400 space-y-2">
          <p>
            <strong className="text-white">1.</strong> Buy shares in YES or NO based on what you think will happen.
          </p>
          <p>
            <strong className="text-white">2.</strong> Prices reflect the market's probability estimate.
          </p>
          <p>
            <strong className="text-white">3.</strong> If you're right, each share pays out $1. If wrong, $0.
          </p>
          <p>
            <strong className="text-white">4.</strong> You can sell your position anytime before the market closes.
          </p>
        </div>
      )}
    </div>
  );
}

// Main Component
export default function MarketDetailPage() {
  const market = sampleMarket;

  const handleTrade = (type: 'YES' | 'NO', amount: number) => {
    console.log(`Trading ${type} for $${amount}`);
    // Implement actual trading logic here
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-2xl mx-auto">
        <MarketHeader market={market} />
        <MarketInfo market={market} />

        {/* Trading Cards */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TradingCard
              type="YES"
              price={market.yesPrice}
              onTrade={(amount) => handleTrade('YES', amount)}
            />
            <TradingCard
              type="NO"
              price={market.noPrice}
              onTrade={(amount) => handleTrade('NO', amount)}
            />
          </div>
        </div>

        <SocialProof market={market} />
        <HowItWorks />

        {/* Market Details Section */}
        <div className="px-4 py-6 border-t border-zinc-800">
          <h2 className="text-lg font-semibold mb-4">Market Details</h2>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-900 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-300 mb-2">Resolution Criteria</h3>
              <p className="text-sm text-zinc-400">
                This market will resolve to YES if the Kansas City Chiefs win Super Bowl LX (60)
                according to official NFL results. Otherwise, it resolves to NO.
              </p>
            </div>

            <div className="p-4 bg-zinc-900 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-300 mb-2">Resolution Source</h3>
              <p className="text-sm text-zinc-400">
                Official NFL.com results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
