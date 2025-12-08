import React from 'react';
import { motion } from 'framer-motion';
import { Mail, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FaqItem: React.FC<{ question: string; answer: string | React.ReactNode }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-neo-green/10">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
            >
                <span className="font-mono text-white hover:text-neo-green transition-colors">{question}</span>
                {isOpen ? <ChevronUp className="text-neo-green" size={16} /> : <ChevronDown className="text-gray-500" size={16} />}
            </button>
            <motion.div 
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                className="overflow-hidden"
            >
                <p className="pb-4 text-gray-400 font-mono text-sm leading-relaxed">
                    {answer}
                </p>
            </motion.div>
        </div>
    )
}

interface ContactProps {
  onTermsClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onTermsClick }) => {
  return (
    <section className="py-24 bg-neo-black relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-neo-green/5 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* FAQ Section */}
                <div id="faq">
                    <div className="flex items-center mb-8">
                        <HelpCircle className="text-neo-green mr-3" />
                        <h2 className="text-3xl font-display font-bold text-white">FAQ</h2>
                    </div>
                    <p className="text-gray-500 font-mono mb-8">Perguntas frequentes sobre a operação.</p>
                    
                    <div className="space-y-2">
                        <FaqItem 
                            question="O que significa aceitar os Termos de uso da InvestNest?" 
                            answer={
                                <>
                                    Ao criar uma conta e utilizar a plataforma, o usuário declara estar de acordo com todas as regras descritas nos Termos de Uso, incluindo o funcionamento dos investimentos, responsabilidades, políticas de segurança e penalidades em caso de descumprimento. A aceitação é obrigatória para o acesso e uso dos serviços da InvestNest.{' '}
                                    <button 
                                        onClick={onTermsClick}
                                        className="text-neo-green hover:underline font-bold"
                                    >
                                        Leia os Termos completos aqui
                                    </button>
                                </>
                            } 
                        />
                        <FaqItem 
                            question="Quem pode usar a plataforma da InvestNest?" 
                            answer="A plataforma é destinada a pessoas jurídicas e físicas maiores de 18 anos, residentes no Brasil, que realizem o cadastro com informações verdadeiras e atualizadas. Contas criadas com dados falsos ou incompletos podem ser suspensas ou encerradas." 
                        />
                        <FaqItem 
                            question="Quais são as responsabilidades do usuário?" 
                            answer="O usuário deve: Fornecer dados corretos e atualizados; Não utilizar a plataforma para fins ilegais, fraudulentos ou proibidos; Assumir os riscos inerentes aos investimentos em criptoativos e DeFi; Respeitar as regras e limites definidos em contrato." 
                        />
                        <FaqItem 
                            question="A InvestNest garante lucros fixos?" 
                            answer="Não. Os planos de investimento apresentam percentuais de rendimento estimados, definidos por contratos inteligentes (Smart Contracts), mas todos os investimentos envolvem riscos de mercado e variações. A InvestNest atua como intermediadora tecnológica, facilitando o acesso e oferecendo automação e transparência, sem prometer ganhos garantidos." 
                        />
                        <FaqItem 
                            question="O que acontece se eu descumprir os Termos de Uso?" 
                            answer="Em caso de violação das regras, fraude, lavagem de dinheiro ou informações falsas, a InvestNest poderá suspender ou encerrar sua conta, além de comunicar às autoridades competentes, se necessário. Os valores bloqueados seguirão as condições do contrato vigente." 
                        />
                        <FaqItem 
                            question="Como serei informado sobre alterações de Termos de Uso?" 
                            answer="Sempre que houver atualizações relevantes, a InvestNest notificará o usuário por meio da plataforma, aplicativo ou e-mail cadastrado. Recomenda-se que o usuário verifique periodicamente os Termos de Uso para manter-se informado sobre eventuais mudanças." 
                        />
                        <FaqItem 
                            question="Como a InvestNest gera lucro?" 
                            answer="A InvestNest utiliza um modelo de retorno de circulação descentralizado e distribuído, no qual todos os participantes podem iniciar seus próprios planos de renda. Por meio de contratos inteligentes, os usuários fornecem liquidez e recebem retornos automáticos, de acordo com o plano escolhido. Os recursos são transformados em criptoativos e movimentados de forma transparente na blockchain." 
                        />
                    </div>
                </div>

                {/* Contact Box */}
                <div id="contact" className="bg-neo-dark border border-neo-green/20 p-10 rounded-xl relative">
                    <div className="absolute top-0 right-0 p-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-display font-bold text-white mb-2">ENTRE EM CONTATO</h2>
                    <p className="text-gray-400 font-mono text-sm mb-8 border-b border-gray-800 pb-8">
                        Dúvidas, sugestões ou quer saber mais sobre nossa plataforma?
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center group">
                            <div className="w-12 h-12 bg-neo-green/10 flex items-center justify-center rounded group-hover:bg-neo-green/20 transition-colors">
                                <Mail className="text-neo-green" />
                            </div>
                            <div className="ml-4">
                                <p className="text-xs text-gray-500 font-mono uppercase">Email Corporativo</p>
                                <a href="mailto:contato@investnest.com.br" className="text-white font-mono text-lg hover:text-neo-green transition-colors">
                                    contato@<span className="font-baumans"><span className="text-white">invest</span><span className="text-neo-green">nest</span></span>.com.br
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-4 bg-neo-black/50 rounded border-l-2 border-neo-green">
                        <p className="text-neo-green text-xs font-mono">
                            <span className="animate-pulse">●</span> Respondemos em até 2 dias úteis.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};

export default Contact;