import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, FileCode } from 'lucide-react';

const AboutCard: React.FC<{ title: string; subtitle: string; description: string; icon: React.ReactNode; index: number }> = ({ title, subtitle, description, icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-neo-dark/50 border border-neo-green/10 p-8 rounded-lg relative overflow-hidden group hover:border-neo-green/40 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="text-neo-green mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">
            {icon}
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-1">{title}</h3>
        <h4 className="text-xs font-mono text-neo-green mb-4 uppercase tracking-wider">{subtitle}</h4>
        <p className="text-gray-400 font-mono text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-neo-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
        >
          SOBRE A <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span>
        </motion.h2>
        <p className="font-mono text-gray-400 max-w-3xl mx-auto text-lg">
          A <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> é uma plataforma de tecnologia financeira voltada à inovação no mercado de investimentos descentralizados (DeFi).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AboutCard 
          index={0}
          title="DeFi"
          subtitle="Investimentos Descentralizados"
          description="Nosso objetivo é simplificar o acesso a investimentos digitais seguros e automatizados."
          icon={<Cpu size={40} />}
        />
        <AboutCard 
          index={1}
          title="Smart"
          subtitle="Contratos Inteligentes"
          description="Utilizamos Smart Contracts para garantir eficiência, transparência e autonomia aos investidores."
          icon={<FileCode size={40} />}
        />
        <AboutCard 
          index={2}
          title="LGPD"
          subtitle="Segurança e Privacidade"
          description="Trabalhamos com responsabilidade, conforme a Lei Geral de Proteção de Dados (LGPD) e com processos de validação contábil."
          icon={<ShieldCheck size={40} />}
        />
      </div>
    </section>
  );
};

export default Features;