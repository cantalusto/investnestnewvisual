import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

interface TermsOfUseProps {
  onClose: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onClose }) => {
  const handleDownloadPDF = () => {
    // Cria uma nova janela otimizada para impressão/PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = document.querySelector('.terms-content');
    if (!content) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Termos de Uso - InvestNest</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              line-height: 1.6;
              color: #000;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background: #fff;
            }
            h1 {
              font-family: Arial, sans-serif;
              text-align: center;
              margin-bottom: 10px;
            }
            h2 {
              font-family: Arial, sans-serif;
              margin-top: 30px;
              margin-bottom: 15px;
              color: #333;
            }
            h3 {
              font-family: Arial, sans-serif;
              margin-top: 20px;
              margin-bottom: 10px;
              color: #555;
            }
            h4 {
              font-family: Arial, sans-serif;
              margin-top: 15px;
              margin-bottom: 8px;
              color: #666;
            }
            p {
              margin: 10px 0;
            }
            ul {
              margin: 10px 0;
              padding-left: 30px;
            }
            li {
              margin: 5px 0;
            }
            section {
              margin-bottom: 30px;
            }
            .contact-box {
              border: 1px solid #ddd;
              padding: 15px;
              margin: 15px 0;
              background: #f9f9f9;
            }
            .plans-box {
              border: 1px solid #ddd;
              padding: 15px;
              margin: 15px 0;
              background: #f9f9f9;
            }
            .signature-box {
              border: 1px solid #ddd;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
              background: #f9f9f9;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML.replace(/class="[^"]*"/g, '')}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="fixed inset-0 bg-neo-black z-[100] overflow-y-auto cursor-default">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="sticky top-0 bg-neo-black/95 backdrop-blur-md border-b border-neo-green/20 pb-4 mb-8 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-neo-green hover:text-neo-green/80 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-mono">Voltar</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-neo-green text-black px-4 py-2 rounded-lg font-mono hover:bg-neo-green/90 transition-colors"
            >
              <Download size={20} />
              Baixar PDF
            </button>
          </div>
          <h1 className="text-4xl font-baumans text-center mt-6">
            <span className="text-white">Termos de Uso</span>
          </h1>
          <p className="text-center text-gray-500 font-mono text-sm mt-2">
            Última atualização: 27/10/2025
          </p>
        </div>

        {/* Content */}
        <div className="terms-content bg-neo-dark/50 border border-neo-green/10 rounded-lg p-8 font-mono text-gray-300 text-sm leading-relaxed space-y-6">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">1.</span> Aceitação dos Termos
            </h2>
            <p className="mb-4">
              Bem-vindo à plataforma <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span>. Ao acessar e usar nossos serviços, você concorda em estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço.
            </p>
            <p>
              A <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> é uma plataforma de tecnologia que oferece ferramentas e informações para auxiliar na gestão de investimentos. Não somos uma instituição financeira e não oferecemos serviços de consultoria de investimentos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">2.</span> Descrição dos Serviços
            </h2>
            <p className="mb-4">A <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> oferece uma plataforma digital que permite aos usuários:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acompanhar e gerenciar seus investimentos em um único lugar</li>
              <li>Visualizar análises e relatórios sobre seus investimentos</li>
              <li>Receber informações educacionais sobre o mercado financeiro</li>
              <li>Acessar ferramentas de planejamento financeiro</li>
              <li>Conectar contas de diferentes instituições financeiras</li>
            </ul>
            <p className="mt-4">
              Os serviços são fornecidos "como estão" e podem ser atualizados, modificados ou descontinuados a qualquer momento, sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">3.</span> Cadastro e Conta de Usuário
            </h2>
            <p className="mb-4">Para utilizar nossos serviços, você deve:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Ser maior de 18 anos</li>
              <li>Fornecer informações verdadeiras, precisas e completas durante o cadastro</li>
              <li>Manter suas informações atualizadas</li>
              <li>Manter a confidencialidade de sua senha e conta</li>
              <li>Notificar imediatamente qualquer uso não autorizado de sua conta</li>
            </ul>
            <p className="mt-4">Você é responsável por todas as atividades que ocorrem em sua conta.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">4.</span> Uso Aceitável
            </h2>
            <p className="mb-4">Você concorda em usar a plataforma apenas para fins legais e de acordo com estes Termos. Você não deve:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Usar a plataforma de qualquer maneira que viole leis ou regulamentos aplicáveis</li>
              <li>Tentar obter acesso não autorizado a sistemas ou redes</li>
              <li>Interferir ou interromper a operação da plataforma</li>
              <li>Transmitir vírus, malware ou qualquer código destrutivo</li>
              <li>Usar a plataforma para atividades fraudulentas ou enganosas</li>
              <li>Copiar, modificar ou distribuir conteúdo da plataforma sem autorização</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">5.</span> Propriedade Intelectual
            </h2>
            <p className="mb-4">
              Todo o conteúdo da plataforma <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span>, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade exclusiva da <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> ou de seus licenciadores e é protegido por leis de direitos autorais.
            </p>
            <p>
              Você recebe uma licença limitada, não exclusiva e intransferível para acessar e usar a plataforma para fins pessoais e não comerciais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">6.</span> Privacidade e Proteção de Dados
            </h2>
            <p className="mb-4">
              Sua privacidade é importante para nós. Coletamos, usamos e protegemos seus dados pessoais de acordo com nossa Política de Privacidade e a Lei Geral de Proteção de Dados (LGPD).
            </p>
            <p>
              Ao usar nossos serviços, você consente com a coleta e uso de informações conforme descrito em nossa Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">7.</span> Isenção de Responsabilidade
            </h2>
            <p className="mb-4">
              A <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> não é uma instituição financeira e não oferece consultoria de investimentos. As informações fornecidas na plataforma são apenas para fins informativos e educacionais.
            </p>
            <p className="mb-4">Você reconhece que:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Investimentos envolvem riscos e você pode perder dinheiro</li>
              <li>A <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> não garante resultados ou retornos específicos</li>
              <li>Você é o único responsável por suas decisões de investimento</li>
              <li>Recomendamos consultar um profissional financeiro qualificado antes de tomar decisões de investimento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">8.</span> Limitação de Responsabilidade
            </h2>
            <p>
              Na extensão máxima permitida pela lei aplicável, a <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">9.</span> Links de Terceiros
            </h2>
            <p>
              Nossa plataforma pode conter links para sites ou serviços de terceiros que não são de propriedade ou controlados pela <span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span>. Não temos controle sobre o conteúdo, políticas de privacidade ou práticas de sites ou serviços de terceiros e não assumimos responsabilidade por eles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">10.</span> Modificações dos Termos
            </h2>
            <p>
              Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso com pelo menos 30 dias de antecedência antes de quaisquer novos termos entrarem em vigor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">11.</span> Rescisão
            </h2>
            <p className="mb-4">
              Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos.
            </p>
            <p>
              Todas as disposições dos Termos que, por sua natureza, devam sobreviver à rescisão, sobreviverão à rescisão, incluindo, sem limitação, disposições de propriedade, isenções de garantia, indenização e limitações de responsabilidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">12.</span> Lei Aplicável e Jurisdição
            </h2>
            <p className="mb-4">
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem consideração a seus conflitos de disposições legais.
            </p>
            <p>
              Nossa falha em fazer valer qualquer direito ou disposição destes Termos não será considerada uma renúncia a esses direitos. Se qualquer disposição destes Termos for considerada inválida ou inexequível por um tribunal, as disposições restantes destes Termos permanecerão em vigor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-neo-green">13.</span> Contato
            </h2>
            <p className="mb-4">Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco:</p>
            <div className="bg-neo-black/50 p-4 rounded border border-neo-green/20">
              <p className="font-bold text-white mb-2"><span className="font-baumans"><span className="text-white">Invest</span><span className="text-neo-green">Nest</span></span> Tecnologia e Finanças Ltda.</p>
              <p>Av. Herculano Bandeira, 383, Cx Postal: 562</p>
              <p>Pina, Recife-PE, CEP 51.110-130</p>
              <p>CNPJ: 63.033.667/0001-00</p>
              <p className="mt-2">Email: <span className="text-neo-green">contato@<span className="font-baumans"><span className="text-white">invest</span><span className="text-neo-green">nest</span></span>.com.br</span></p>
            </div>
          </section>

          {/* Contrato de Utilização */}
          <section className="border-t-2 border-neo-green/30 pt-8 mt-12">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Contrato de Utilização da Plataforma
            </h1>
            
            <div className="bg-neo-black/50 p-4 rounded border border-neo-green/20 mb-6">
              <p className="mb-2">
                <strong className="text-white">INVEST NEST TECNOLOGIA E FINANÇAS LTDA.</strong>, sociedade empresária de natureza limitada com sede na Av Herculano Bandeira, 383, Cx pst: 562, Pina, Recife-PE, CEP 51.110-130., inscrita no CNPJ/ME sob o n.º 63.033.667/0001-00, neste ato representada na forma de seu Contrato Social, doravante designada <span className="font-baumans text-white">INVESTNEST</span> e o <strong className="text-white">CLIENTE</strong> qualificado na ficha de cadastro, disposta no site da <span className="font-baumans text-white">INVESTNEST</span>.
              </p>
            </div>

            <h3 className="text-xl font-bold text-neo-green mb-4">CONSIDERANDO QUE:</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
              <li>A INVEST NEST TECNOLOGIA E FINANÇAS é proprietária e distribuidora de licenças de uso do Site denominado INVESTNEST.com.br que consiste em uma plataforma com tecnologia de investimento na web3 DeFi, mediante parâmetros definidos e inseridos no Site pelo próprio usuário;</li>
              <li>O CLIENTE, ao aderir a este contrato aceita todos os termos nele inseridos, declara ter conhecimento de uso do software, reconhece e aceita as condições de risco financeiros das operações realizadas na Web 3.</li>
            </ul>

            <p className="text-white font-bold mb-6">
              RESOLVEM as Partes celebrar o presente Contrato, o qual se regerá em conformidade com os seguintes termos e condições:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA PRIMEIRA — OBJETO</h3>
                <p className="mb-2">O presente Contrato tem por objetivo conceder acesso ao Cliente, bem como regular o uso do Site INVESTNEST.</p>
                <p className="mb-2"><strong>1.1.</strong> O Site INVESTNEST será acessado pelo Cliente através do link www.investnest.com.br a partir da inserção de dados de login e senha no site, possibilitando ao Cliente acessar as funcionalidades da ferramenta, bem como será possível o envio de ordens para negociação na Web3, mediante parâmetros definidos pelo Cliente.</p>
                <p><strong>1.2.</strong> A INVESTNEST não possui qualquer interferência sobre a estratégia, parâmetro ou algoritmo utilizado pelo Cliente para a execução da operação, motivo pelo qual não se responsabiliza por qualquer perda experimentada pelo Cliente em razão do mau uso do Site INVESTNEST.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA SEGUNDA — DECLARAÇÕES DO CLIENTE</h3>
                <p className="mb-2"><strong>2.</strong> O Cliente declara-se ciente:</p>
                <p className="mb-2"><strong>2.1</strong> Que toda a movimentação de pagamento ou recebimento dessa operação deverá ser realizada em titularidade do usuário cadastrado na plataforma;</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>(I) Da complexidade e da forma de utilização do Site INVESTNEST;</li>
                  <li>(II) Que, para a utilização do Site INVESTNEST deverá possuir conexão e equipamentos tecnológicos compatíveis e que possuam a configuração mínima exigida para acesso à internet;</li>
                  <li>(III) A INVESTNEST tem a prerrogativa de imediatamente e sem a necessidade de aviso prévio, interromper o acesso do Cliente, caso o uso ou acesso, por qualquer razão, coloque em risco a estrutura tecnológica da INVESTNEST;</li>
                </ul>
                <p><strong>2.2</strong> O presente contrato se destina aos investidores não profissionais, assim entendidos como os clientes Pessoa Física e Pessoas Jurídicas não institucionais.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA TERCEIRA — CONDIÇÕES FINANCEIRAS</h3>
                <p className="mb-4"><strong>3.</strong> No ato do cadastro na plataforma o Cliente concorda que o pagamento dos serviços da INVESTNEST se dará através de recebimento de porcentagem sobre o lucro gerado dos contratos inteligentes, baseados em blockchain, celebrados na web3 com o lucro variando de 10 a 14%, de acordo com a faixa de valor do investimento.</p>
                
                <p className="mb-4"><strong>3.1</strong> O valor investido pelo Cliente será devolvido em sua integralidade (100%) acrescido de juros de acordo com o Plano de investimento escolhido conforme tabela abaixo:</p>
                
                <div className="bg-neo-black/50 p-4 rounded border border-neo-green/20 mb-4 space-y-4">
                  <div>
                    <h4 className="text-neo-green font-bold mb-2">PLANO PADRÃO (30 dias por ciclo)</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Faixa de Valor: R$ 100,00 a R$ 500.000,00</li>
                      <li>Rendimento Previsto: Conforme tabela da plataforma</li>
                      <li>Prazo do Ciclo: 30 dias</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-neo-green font-bold mb-2">PLANO LOOPING PRATA (180 dias por ciclo)</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Faixa de Valor: R$ 100,00 a R$ 500.000,00</li>
                      <li>Rendimento Previsto: Juros compostos com rendimento progressivo</li>
                      <li>Prazo do Ciclo: 180 dias</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-neo-green font-bold mb-2">PLANO LOOPING OURO (360 dias por ciclo)</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Faixa de Valor: R$ 100,00 a R$ 500.000,00</li>
                      <li>Rendimento Previsto: Juros compostos com rendimento progressivo otimizado</li>
                      <li>Prazo do Ciclo: 360 dias</li>
                    </ul>
                  </div>
                </div>

                <p className="mb-2"><strong>3.2</strong> Caso deseje realizar o RESGATE ANTECIPADO o Cliente deve entrar em contato pelos canais de atendimento especificado na plataforma / app.</p>
                <p className="mb-2"><strong>3.3</strong> O Cliente declara estar ciente que o RESGATE ANTECIPADO configura quebra de contrato, acarretando a perda do rendimento previsto e cobrança de multa a ser deduzida do valor aportado.</p>
                <p className="mb-2"><strong>3.4</strong> Em caso de resgate antecipado ou após dedução das taxas valor líquido será depositado na conta bancária de titularidade do cliente especificada no ato do contrato, no prazo de até dois dias úteis.</p>
                <p className="mb-2"><strong>3.5</strong> O cliente poderá fazer aportes de maneira ilimitada, desde que observe o valor mínimo estabelecido por aporte especificado a seguir: Valor mínimo por contrato R$ 100,00 (cem reais) e valor máximo por contrato R$ 500.000,00 (quinhentos mil reais).</p>
                <p className="mb-2"><strong>3.6</strong> O cliente poderá escolher períodos maiores de ciclo para aumentar os seus rendimentos através de juros compostos, com o limite de 12 meses por contrato, escolhendo um dos planos especificados na plataforma como descrito no item 3.1.</p>
                <p className="mb-2"><strong>3.7</strong> O cliente receberá um extrato demonstrativo de lucros para fins de recolhimento de imposto de renda quando o investimento atingir as exigências da receita federal.</p>
                <p className="mb-2"><strong>3.8</strong> O presente termo se aplica a todos os ciclos estabelecidos na plataforma compreendidos entre 30 e 360 dias.</p>
                <p className="mb-2"><strong>3.9</strong> Não haverá nenhum tipo de cobrança ao Cliente investidor.</p>
                <p><strong>3.10</strong> O pagamento aos serviços da plataforma INVESTNEST se dará como estabelecido no item 3.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA QUARTA — SUSPENSÃO E CANCELAMENTO</h3>
                <p className="mb-2"><strong>4.</strong> Se por qualquer motivo, o pagamento do aporte não for localizado pela INVESTNEST, a contratação será suspensa até regularização por parte do cliente.</p>
                <p className="mb-2"><strong>4.1</strong> A INVESTNEST não cobrará pela utilização do site e nem autoriza a cobrança por meio de terceiros.</p>
                <p className="mb-2"><strong>4.2</strong> O presente contrato é celebrado por prazo determinado pelo ciclo escolhido na plataforma, o Cliente poderá rescindi-lo e cancelar o uso a qualquer tempo, a seu exclusivo critério, mediante solicitação dirigida à Área de Atendimento ao cliente da INVESTNEST, sob os termos descritos no item 3.2 invariavelmente.</p>
                <p className="mb-2"><strong>4.3</strong> O sistema ficará disponível ao cliente mesmo que tenha solicitado o cancelamento do investimento através da solicitação de resgate antecipado. Para utilizar o Cliente deve acessar a plataforma normalmente e fazer a escolha de um novo plano de investimento.</p>
                <p className="mb-2"><strong>4.4</strong> No ato do cadastro o cliente receberá em seu email as instruções de "login" de usuário para acesso à plataforma.</p>
                <p className="mb-2"><strong>4.5</strong> O "login" de usuário e a senha para acesso ao Site são pessoais e intransferíveis devendo o Cliente, por segurança, alterar a senha no primeiro acesso.</p>
                <p><strong>4.6</strong> As ordens inseridas no sistema, a partir da aposição de "login" do usuário quando da escolha do plano, são entendidas como ordens próprias e manifestação inequívoca de vontade do Cliente. A INVESTNEST desconhece e não se responsabiliza pela estratégia escolhida que pode, eventualmente, gerar algum tipo de perdas ao patrimônio do Cliente.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA QUINTA — RESPONSABILIDADES E LIMITAÇÕES</h3>
                <p className="mb-2"><strong>5.</strong> A INVESTNEST não se responsabiliza por inconsistências na Pool de liquidez que possam causar prejuízos ao Cliente.</p>
                <p><strong>5.1</strong> Na eventual impossibilidade de funcionamento do Site INVESTNEST não poderá ser invocada pelo cliente para requerer a reparação de prejuízo ou eventual perda de oportunidade, devendo o cliente acessar outros canais de atendimento como e-mail ou whatsapp.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA SEXTA — AUTORIZAÇÃO DE ACESSO A DADOS</h3>
                <p><strong>6.</strong> O cliente desde já autoriza a INVESTNEST a ter acesso a todo e qualquer dado e/ou informação sobre o Cliente que esteja registrada e/ou armazenada na plataforma, incluindo aquelas que estejam protegidas por sigilo bancário e/ou fiscal, para que assim o Cliente possa enviar ordens e ter acesso às suas informações privadas no Software.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA SÉTIMA — RESPONSABILIDADES DO CLIENTE</h3>
                <p className="mb-2"><strong>7.</strong> O Cliente será o único e exclusivo responsável:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>(i) pelo seu "login" e senha, bem como pelo manuseio operacional do sistema não podendo alegar o desconhecimento das funcionalidades para pleitear qualquer ressarcimento;</li>
                  <li>(ii) pela seleção, escolha ou criação dos PLANOS DE INVESTIMENTO a serem executadas pelo sistema, bem como pela parametrização das mesmas. As perdas decorrentes da execução das estratégias inseridas no sistema são de inteira responsabilidade do cliente;</li>
                  <li>(iii) pela adequação, ajuste e/ou alteração da estratégia, acompanhamento, reparametrização durante a configuração do PLANO DE INVESTIMENTO, não cabendo à INVESTNEST qualquer responsabilidade decorrente das eventuais perdas experimentadas em decorrência de tais ajustes feitos pelo cliente;</li>
                  <li>(iv) pela manutenção de ambiente e equipamentos hábeis a manter o correto funcionamento do site, tais como: conectividade, energia, atualizações do software, capacidade do terminal utilizado e etc.</li>
                </ul>

                <p className="mb-2"><strong>7.1</strong> A INVESTNEST não poderá ser responsabilizada nos casos de:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>(i) Atos alheios à vontade, tais como falhas verificadas no dispositivo do cliente, aplicativo de pagamentos, como queda/instabilidade de sistema, queda de links de internet, quedas de energia, casos fortuitos e/ou de força maior;</li>
                  <li>(ii) Falhas decorrentes do funcionamento do Site INVESTNEST;</li>
                  <li>(iii) Perda sofrida pelo Cliente decorrente de qualquer falha, incorreção, inexatidão ou erro dessas informações fornecidas;</li>
                  <li>(iv) Perda decorrente da inobservância, pelo cliente, das disposições contidas nas cláusulas 2 e 7;</li>
                  <li>(v) Origem e destinação da verba aplicada pelo Cliente na plataforma.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">CLÁUSULA OITAVA — DISPOSIÇÕES FINAIS</h3>
                <p><strong>8.</strong> As Partes elegem o Foro Central da Comarca de Recife-PE para dirimir quaisquer controvérsias oriundas do presente Contrato, renunciando-se a qualquer outro, por mais privilegiado que seja ou venha a ser.</p>
              </div>

              <div className="border-t border-neo-green/30 pt-6 mt-8 text-center">
                <p className="text-white font-bold mb-4">DOCUMENTO ASSINADO ELETRONICAMENTE</p>
                <div className="bg-neo-black/50 p-6 rounded border border-neo-green/20 inline-block">
                  <p className="font-bold text-white mb-2">INVEST NEST TECNOLOGIA E FINANÇAS LTDA.</p>
                  <p>AV HERCULANO BANDEIRA, 383, CXPST:562, PINA, RECIFE-PE, CEP 51.110-130</p>
                  <p className="mt-2">CNPJ: 63.033.667/0001-00</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
