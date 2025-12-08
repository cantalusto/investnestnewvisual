import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, AlertTriangle, Settings, RefreshCw, DollarSign, Calendar, Percent, TrendingUp, Lock, ArrowRight } from 'lucide-react';
import GlitchButton from '../ui/GlitchButton';
import { PlanType } from '../../types';

const Plans: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>('simple');
    
    // State for Simulator
    const [amount, setAmount] = useState<number>(1000);
    const [days, setDays] = useState<number>(90); // For Plan 2
    const [withdrawalRate, setWithdrawalRate] = useState<number>(5); // For Plan 3 (1-9%)
    const [simulationDays, setSimulationDays] = useState<number>(350); // For Plan 3 projection

    const [results, setResults] = useState({
        finalBalance: 0,
        totalWithdrawn: 0,
        totalYield: 0,
        monthlyReinvest: 0,
        totalPercent: 0
    });

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    // Calculation Logic
    useEffect(() => {
        let BASE_YIELD = 0.10; // Default: 10% per 30 days
        
        // Ajustar taxa conforme o plano
        if (selectedPlan === 'compound' || selectedPlan === 'income') {
            BASE_YIELD = 0.12; // 12% para Juros Compostos e Renda Flexível
        }

        if (selectedPlan === 'simple') {
            // PLAN 1: 30 Days Fixed, 10% payout
            const profit = amount * BASE_YIELD;
            setResults({
                finalBalance: amount + profit,
                totalWithdrawn: amount + profit, // Assuming full withdrawal at end
                totalYield: profit,
                monthlyReinvest: 0,
                totalPercent: 10
            });
        } 
        else if (selectedPlan === 'compound') {
            // PLAN 2: Multi-cycle, 100% Reinvest until end
            // Inicia juros compostos apenas a partir de 60 dias
            const cycles = Math.floor(days / 30);
            let currentBalance = amount;
            
            if (days < 60) {
                // Antes de 60 dias, aplica apenas juros simples (sem compor)
                const cyclesSimple = Math.floor(days / 30);
                const profit = amount * BASE_YIELD * cyclesSimple;
                currentBalance = amount + profit;
            } else {
                // A partir de 60 dias (2 ciclos), inicia juros compostos
                // Compound Interest Formula: P * (1 + r)^n
                for (let i = 0; i < cycles; i++) {
                    currentBalance = currentBalance * (1 + BASE_YIELD);
                }
            }

            const totalProfit = currentBalance - amount;
            const totalPercent = ((currentBalance - amount) / amount) * 100;

            setResults({
                finalBalance: currentBalance,
                totalWithdrawn: currentBalance, // Full withdrawal at end of term
                totalYield: totalProfit,
                monthlyReinvest: 100, // 100% of yield is reinvested
                totalPercent: totalPercent
            });
        } 
        else if (selectedPlan === 'income') {
            // PLAN 3: Renda Flexível - Prazo Flexível
            // Mostra renda mensal e crescimento ao longo dos meses
            
            const payoutRate = withdrawalRate / 100;
            const reinvestRate = BASE_YIELD - payoutRate;

            // Calcular renda do primeiro mês
            const monthlyIncome = amount * payoutRate;
            
            // Simular crescimento em 6 meses para mostrar evolução
            let balanceAfter6Months = amount;
            for (let i = 0; i < 6; i++) {
                const monthlyYield = balanceAfter6Months * BASE_YIELD;
                const monthlyPayout = balanceAfter6Months * payoutRate;
                const reinvestAmount = monthlyYield - monthlyPayout;
                balanceAfter6Months += reinvestAmount;
            }
            
            const incomeAfter6Months = balanceAfter6Months * payoutRate;

            setResults({
                finalBalance: balanceAfter6Months,
                totalWithdrawn: monthlyIncome, // Renda mensal inicial
                totalYield: incomeAfter6Months, // Renda após 6 meses
                monthlyReinvest: (reinvestRate * 100),
                totalPercent: ((balanceAfter6Months - amount) / amount) * 100
            });
        }

    }, [amount, days, withdrawalRate, simulationDays, selectedPlan]);

    return (
        <section id="plans" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                    ESTRATÉGIA <span className="text-neo-green">FINANCEIRA</span>
                </h2>
                <p className="font-mono text-gray-400 max-w-2xl mx-auto">
                    Selecione o modelo que melhor se adapta ao seu perfil de investidor.
                </p>
            </div>

            {/* Explicação dos Planos */}
            <div className="mb-12 bg-gradient-to-br from-neo-dark/50 to-neo-black border border-neo-green/20 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-neo-green"></div>
                    <h3 className="text-2xl font-display font-bold text-white">
                        Como funcionam os <span className="text-neo-green">Planos de Reinvestimento</span>
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Plano 1 */}
                    <button 
                        onClick={() => setSelectedPlan('simple')}
                        className="bg-neo-black/50 border border-neo-green/10 rounded-lg p-6 hover:border-neo-green/30 transition-all text-left w-full cursor-pointer hover:scale-[1.02] transform"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-neo-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Zap className="text-neo-green" size={20} />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-white mb-1">Padrão</h4>
                                <p className="text-xs text-neo-green font-mono">Ciclo Único • 30 Dias</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm font-mono text-gray-400 leading-relaxed">
                            <p>
                                <span className="text-neo-green font-bold">→</span> Você investe R$ 1.000
                            </p>
                            <p>
                                <span className="text-neo-green font-bold">→</span> Após 30 dias recebe R$ 1.100 (10% de lucro)
                            </p>
                            <p className="text-white/80 pt-2 border-t border-gray-800">
                                <strong className="text-neo-green">Ideal para:</strong> Quem precisa de liquidez rápida e rendimento garantido em curto prazo.
                            </p>
                        </div>
                    </button>

                    {/* Plano 2 */}
                    <button 
                        onClick={() => setSelectedPlan('compound')}
                        className="bg-neo-black/50 border border-neo-green/10 rounded-lg p-6 hover:border-neo-green/30 transition-all text-left w-full cursor-pointer hover:scale-[1.02] transform"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-neo-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="text-neo-green" size={20} />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-white mb-1">Juros Compostos</h4>
                                <p className="text-xs text-neo-green font-mono">Múltiplos Ciclos • 30-360 Dias</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm font-mono text-gray-400 leading-relaxed">
                            <p>
                                <span className="text-neo-green font-bold">→</span> Você investe R$ 1.000
                            </p>
                            <p>
                                <span className="text-neo-green font-bold">→</span> Após 30 dias: R$ 1.120
                            </p>
                            <p>
                                <span className="text-neo-green font-bold">→</span> Após 60 dias: R$ 1.254 (12% sobre R$ 1.120)
                            </p>
                            <p>
                                <span className="text-neo-green font-bold">→</span> Após 90 dias: R$ 1.405 (12% sobre R$ 1.254)
                            </p>
                            <p className="text-white/80 pt-2 border-t border-gray-800">
                                <strong className="text-neo-green">Ideal para:</strong> Crescimento acelerado com reinvestimento automático de 100% dos lucros.
                            </p>
                        </div>
                    </button>

                    {/* Plano 3 */}
                    <div className="relative bg-neo-black/30 border border-gray-800/50 rounded-lg p-6 text-left w-full opacity-60 cursor-not-allowed">
                        <div className="absolute top-2 right-2">
                            <span className="bg-neo-green/20 text-neo-green text-[10px] font-mono font-bold px-2 py-1 rounded border border-neo-green/40">
                                EM BREVE
                            </span>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                <RefreshCw className="text-gray-600" size={20} />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-gray-500 mb-1">Renda Flexível</h4>
                                <p className="text-xs text-gray-600 font-mono">Personalizável • 1-10% de Saque • Prazo Flexível</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm font-mono text-gray-600 leading-relaxed">
                            <p>
                                <span className="text-gray-600 font-bold">→</span> Você investe R$ 1.000 e escolhe sacar 5%
                            </p>
                            <p>
                                <span className="text-gray-600 font-bold">→</span> Rendimento mensal: 12% (R$ 120)
                            </p>
                            <p>
                                <span className="text-gray-600 font-bold">→</span> Após 30 dias: Saca R$ 50 + Reinveste R$ 70
                            </p>
                            <p>
                                <span className="text-gray-600 font-bold">→</span> Novo saldo: R$ 1.070 | Renda cresce mensalmente
                            </p>
                            <p className="text-gray-600 pt-2 border-t border-gray-800">
                                <strong className="text-gray-500">Ideal para:</strong> Renda mensal recorrente enquanto o capital cresce.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-neo-green/5 border border-neo-green/20 rounded-lg p-4">
                    <p className="text-sm font-mono text-gray-300 flex items-start gap-2">
                        <span className="text-neo-green text-lg">💡</span>
                        <span>
                            <strong className="text-white">Dica:</strong> O <strong className="text-neo-green">Juros Compostos</strong> oferece maior retorno no longo prazo, enquanto a <strong className="text-neo-green">Renda Flexível</strong> equilibra ganhos mensais com crescimento do capital.
                        </span>
                    </p>
                </div>
            </div>

            {/* Plan Selector Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <button 
                    onClick={() => setSelectedPlan('simple')}
                    className={`relative p-6 rounded-xl border transition-all duration-300 text-left group overflow-hidden ${selectedPlan === 'simple' ? 'bg-neo-green/10 border-neo-green' : 'bg-neo-dark border-gray-800 hover:border-gray-600'}`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <Zap className={`${selectedPlan === 'simple' ? 'text-neo-green' : 'text-gray-500'} group-hover:text-neo-green transition-colors`} size={32} />
                        {selectedPlan === 'simple' && <div className="w-2 h-2 rounded-full bg-neo-green animate-pulse"></div>}
                    </div>
                    <h3 className={`text-lg font-display font-bold mb-2 ${selectedPlan === 'simple' ? 'text-white' : 'text-gray-400'}`}>Padrão (30 Dias)</h3>
                    <p className={`text-sm font-mono leading-relaxed ${selectedPlan === 'simple' ? 'text-gray-300' : 'text-gray-400'}`}>
                        Ciclo único e rápido. Receba seu capital + 10% de lucro direto na conta após 30 dias.
                    </p>
                </button>

                <button 
                    onClick={() => setSelectedPlan('compound')}
                    className={`relative p-6 rounded-xl border transition-all duration-300 text-left group overflow-hidden ${selectedPlan === 'compound' ? 'bg-neo-green/10 border-neo-green' : 'bg-neo-dark border-gray-800 hover:border-gray-600'}`}
                >
                    <div className="flex justify-between items-start mb-4">
                        <TrendingUp className={`${selectedPlan === 'compound' ? 'text-neo-green' : 'text-gray-500'} group-hover:text-neo-green transition-colors`} size={32} />
                        {selectedPlan === 'compound' && <div className="w-2 h-2 rounded-full bg-neo-green animate-pulse"></div>}
                    </div>
                    <h3 className={`text-lg font-display font-bold mb-2 ${selectedPlan === 'compound' ? 'text-white' : 'text-gray-400'}`}>Juros Compostos</h3>
                    <p className={`text-sm font-mono leading-relaxed ${selectedPlan === 'compound' ? 'text-gray-300' : 'text-gray-400'}`}>
                        Potencialize ganhos. O lucro é 100% reinvestido a cada ciclo. Saque total no final do prazo.
                    </p>
                </button>

                <button 
                    disabled
                    className="relative p-6 rounded-xl border transition-all duration-300 text-left group overflow-hidden bg-neo-dark/30 border-gray-800/50 opacity-60 cursor-not-allowed"
                >
                    <div className="absolute top-2 right-2">
                        <span className="bg-neo-green/20 text-neo-green text-[10px] font-mono font-bold px-2 py-1 rounded border border-neo-green/40">
                            EM BREVE
                        </span>
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <RefreshCw className="text-gray-600" size={32} />
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2 text-gray-500">Renda Flexível</h3>
                    <p className="text-sm font-mono leading-relaxed text-gray-600">
                        Controle total. Escolha quanto sacar (1-10%) e quanto reinvestir mensalmente para crescer o bolo.
                    </p>
                </button>
            </div>

            {/* Main Simulator Area */}
            <div className="bg-neo-dark/80 border border-neo-green/30 rounded-xl overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(0,255,65,0.05)]">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* LEFT: Inputs */}
                    <div className="lg:col-span-7 p-8 border-b lg:border-b-0 lg:border-r border-neo-green/20">
                        <div className="flex items-center mb-8 text-neo-green">
                            <Settings className="mr-2 animate-spin-slow" size={20} />
                            <span className="font-mono text-sm tracking-widest uppercase">
                                Configurador: {selectedPlan === 'simple' ? 'Padrão' : selectedPlan === 'compound' ? 'Multi-Ciclo' : 'Renda'}
                            </span>
                        </div>

                        <div className="space-y-10">
                            {/* Common Input: Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center gap-4">
                                    <label className="flex items-center text-gray-300 font-mono text-sm uppercase">
                                        <DollarSign size={16} className="mr-2 text-neo-green" /> 
                                        Valor do Aporte
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="100"
                                            max="500000"
                                            step="10"
                                            value={amount || ''}
                                            onChange={(e) => {
                                                const val = Number(e.target.value) || 0;
                                                setAmount(Math.min(val, 500000));
                                            }}
                                            className="font-mono text-white text-xl font-bold bg-neo-black/50 px-4 py-1 rounded border-2 border-neo-green/20 hover:border-neo-green/40 focus:border-neo-green focus:outline-none transition-colors w-48 text-right"
                                        />
                                        <div className="absolute -bottom-5 right-0 text-xs text-neo-green/60 font-mono flex items-center gap-1">
                                            <span className="animate-pulse">✎</span> Editável
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="range" min="100" max="500000" step="10"
                                        value={amount} onChange={(e) => setAmount(Math.min(Number(e.target.value), 500000))}
                                        className="w-full h-2 bg-neo-black rounded-lg appearance-none cursor-pointer border border-neo-green/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-neo-green [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
                                        <span>R$ 100</span>
                                        <span>R$ 500.000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Conditional Inputs */}
                            {selectedPlan === 'simple' && (
                                <div className="bg-neo-green/5 p-4 rounded border border-neo-green/20">
                                    <div className="flex items-center text-neo-green mb-2">
                                        <Lock size={16} className="mr-2" />
                                        <span className="font-bold font-mono text-sm">PRAZO FIXO: 30 DIAS</span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-mono">
                                        Neste plano, seu capital fica alocado por exatamente um ciclo. Ao final, você recebe o valor integral investido mais os rendimentos.
                                    </p>
                                </div>
                            )}

                            {selectedPlan === 'compound' && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="flex items-center text-gray-300 font-mono text-sm uppercase">
                                            <Calendar size={16} className="mr-2 text-neo-green" /> 
                                            Tempo de Investimento
                                        </label>
                                        <span className="font-mono text-white text-xl font-bold bg-neo-black/50 px-4 py-1 rounded border border-neo-green/20">
                                            {days} Dias
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        {[60, 90, 180, 360].map((d) => (
                                            <button
                                                key={d}
                                                onClick={() => setDays(d)}
                                                className={`flex-1 py-2 text-xs font-mono border rounded transition-all ${days === d ? 'bg-neo-green text-black border-neo-green font-bold' : 'bg-transparent text-gray-400 border-gray-700 hover:border-neo-green/50'}`}
                                            >
                                                {d}d
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 font-mono mt-2">
                                        *O rendimento é reinvestido automaticamente a cada 30 dias.
                                    </p>
                                </div>
                            )}

                            {selectedPlan === 'income' && (
                                <>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="flex items-center text-gray-300 font-mono text-sm uppercase">
                                                <Percent size={16} className="mr-2 text-neo-green" /> 
                                                Receber por Mês
                                            </label>
                                            <div className="text-right">
                                                <span className="font-mono text-neo-toxic text-xl font-bold bg-neo-black/50 px-4 py-1 rounded border border-neo-green/20 block">
                                                    {withdrawalRate}%
                                                </span>
                                            </div>
                                        </div>
                                        <input 
                                            type="range" min="1" max="10" step="1"
                                            value={withdrawalRate} onChange={(e) => setWithdrawalRate(Number(e.target.value))}
                                            className="w-full h-2 bg-neo-black rounded-lg appearance-none cursor-pointer border border-neo-green/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-neo-toxic [&::-webkit-slider-thumb]:rounded-sm [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                                        />
                                        <div className="flex justify-between text-xs font-mono">
                                            <span className="text-gray-500">Reinveste {12 - withdrawalRate}%</span>
                                            <span className="text-neo-toxic">Saca {withdrawalRate}%</span>
                                        </div>
                                    </div>

                                    <div className="bg-neo-green/5 p-4 rounded border border-neo-green/20 mt-4">
                                        <div className="flex items-center text-neo-green mb-2">
                                            <Lock size={16} className="mr-2" />
                                            <span className="font-bold font-mono text-sm">PRAZO FLEXÍVEL</span>
                                        </div>
                                        <p className="text-xs text-gray-400 font-mono leading-relaxed">
                                            Querendo realizar o saque total, você terá que esperar o dia do pagamento. Você pode solicitar e receber todo o dinheiro no dia do pagamento.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Results */}
                    <div className="lg:col-span-5 bg-neo-black p-8 flex flex-col justify-between relative overflow-hidden">
                        {/* Background FX */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-neo-green/5 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neo-green to-transparent"></div>

                        {amount < 100 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="text-6xl text-gray-700">💰</div>
                                <h4 className="font-mono text-gray-500 uppercase tracking-widest text-sm">
                                    Valor Mínimo: R$ 100
                                </h4>
                                <p className="font-mono text-gray-600 text-xs max-w-xs">
                                    Digite um valor igual ou superior a R$ 100 para visualizar as projeções de investimento.
                                </p>
                            </div>
                        ) : (
                        <>
                        <div>
                            <h4 className="font-mono text-gray-500 uppercase tracking-widest text-xs mb-8 flex items-center">
                                <ArrowRight size={14} className="mr-2 text-neo-green" />
                                Projeção de Resultados
                            </h4>

                            <div className="space-y-8 relative z-10">
                                <div>
                                    <p className="text-gray-400 font-mono text-[10px] uppercase mb-1">Retorno Líquido Estimado</p>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl md:text-5xl font-display text-neo-green font-bold mr-2">
                                            +{formatCurrency(results.totalYield)}
                                        </span>
                                        <span className="text-neo-green/60 font-mono text-sm">
                                            ({results.totalPercent.toFixed(2)}%)
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {selectedPlan === 'income' ? (
                                        <>
                                            <div className="bg-neo-dark/50 p-4 rounded border border-neo-green/20 flex justify-between items-center">
                                                <div>
                                                    <p className="text-gray-500 font-mono text-[10px] uppercase mb-1">Renda Mensal (Mês 1)</p>
                                                    <p className="text-neo-toxic font-mono text-lg font-bold">{formatCurrency(results.totalWithdrawn)}</p>
                                                </div>
                                                <TrendingUp className="text-neo-toxic opacity-50" />
                                            </div>
                                            <div className="bg-neo-dark/50 p-4 rounded border border-gray-800 flex justify-between items-center">
                                                <div>
                                                    <p className="text-gray-500 font-mono text-[10px] uppercase mb-1">Renda Mensal (Após 6 meses)</p>
                                                    <p className="text-neo-green font-mono text-lg font-bold">{formatCurrency(results.totalYield)}</p>
                                                </div>
                                                <TrendingUp className="text-neo-green opacity-50" />
                                            </div>
                                            <div className="bg-neo-dark/50 p-4 rounded border border-gray-800">
                                                <p className="text-gray-500 font-mono text-[10px] uppercase mb-2">Crescimento do Capital</p>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs font-mono text-gray-400">Inicial:</span>
                                                    <span className="text-white font-mono text-sm">{formatCurrency(amount)}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs font-mono text-gray-400">Após 6 meses:</span>
                                                    <span className="text-neo-green font-mono text-sm font-bold">{formatCurrency(results.finalBalance)}</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="bg-neo-dark/50 p-4 rounded border border-gray-800 flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-500 font-mono text-[10px] uppercase mb-1">Montante Final (Saque Total)</p>
                                                <p className="text-white font-mono text-xl font-bold">{formatCurrency(results.finalBalance)}</p>
                                            </div>
                                            <DollarSign className="text-neo-green opacity-50" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <GlitchButton text="Iniciar Contrato" className="w-full" />
                            <p className="text-[10px] text-center text-gray-600 font-mono mt-4">
                                *Valores estimados. Padrão: 10% a.m. | Compostos e Renda Flexível: 12% a.m.
                            </p>
                        </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Plans;