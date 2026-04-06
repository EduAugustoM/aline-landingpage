import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import { Badge, Button, DividerOrnamental } from './components/ui';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('Início');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const activeEl = navRefs.current[activeSection];
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeSection]);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.gsap-panel');
    
    // Rastreador de seções para a Navbar
    panels.forEach((panel: any) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(panel.id),
        onEnterBack: () => setActiveSection(panel.id),
      });
    });

    // Fade up elements
    const fadeElements = gsap.utils.toArray('.gsap-fade-up');
    fadeElements.forEach((el: any) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          }
        }
      );
    });

    // Stagger grids
    const staggerLists = gsap.utils.toArray('.gsap-stagger-list');
    staggerLists.forEach((list: any) => {
      gsap.fromTo(list.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: list,
            start: 'top 85%'
          }
        }
      );
    });

  }, { scope: mainRef });

  return (
    // Explicit w-full overflow-hidden
    <div ref={mainRef} className="bg-background text-foreground overflow-hidden w-full m-0 p-0">
      
      {/* Navigation (z-[100] garante que nunca some!) */}
      <nav className="fixed w-full z-[100] top-0 transition-all duration-300 bg-[#F0E0AA]/80 backdrop-blur-md border-b border-primary/20 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <a href="#Início" className="text-xl md:text-2xl font-display font-semibold tracking-tighter text-foreground hover:opacity-80 transition-opacity">
            Aline Oliveira
          </a>
        </div>
        <div className="hidden md:flex relative items-center">
          <div className="flex gap-8 items-center text-sm font-medium tracking-wide">
            {['Início', 'antes-depois', 'serviços', 'diferenciais', 'depoimentos', 'sobre'].map((sec) => (
              <a
                key={sec}
                id={`link-${sec}`}
                href={`#${sec}`}
                ref={el => navRefs.current[sec] = el}
                className={`py-2 px-1 transition-colors capitalize ${activeSection === sec ? 'text-primary' : 'text-foreground hover:text-primary/70'}`}
              >
                {sec.replace('-', ' ')}
              </a>
            ))}
          </div>
          <div 
            className="absolute -bottom-1 h-0.5 bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          ></div>
        </div>
        <Button href="https://wa.me/5564993416869" target="_blank" rel="noopener noreferrer" className="hidden md:flex py-2 px-6 text-sm hover:!bg-[#25D366] hover:!text-white hover:border-[#25D366] transition-colors">
          Agendar Horário
        </Button>
      </nav>

      {/* 1. Hero Section (Design System Style) */}
      <section id="Início" className="gsap-panel w-full relative min-h-screen flex items-center bg-background px-6 md:px-12 z-0 shadow-2xl pt-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8 z-10">
          
          {/* Esquerda: Textos Básicos */}
          <div className="gsap-fade-up flex-1 flex flex-col items-start max-w-xl text-left">
            <Badge className="mb-6 font-medium text-primary bg-primary/10 border-primary/20">Cabeleireira · Santa Helena</Badge>
            <h1 className="text-5xl md:text-7xl font-display leading-[1.05] tracking-tight mb-8 text-foreground">
              Aline Oliveira<br/>
              <span className="text-primary italic font-body font-light tracking-wide text-2xl md:text-5xl">A L I S A M E N T O S</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-light">
              Técnicas exclusivas de alisamento que respeitam cada fio — do rebelde ao delicado. 
              Resultado real, duradouro e sem danos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <Button href="https://wa.me/5564993416869" target="_blank" rel="noopener noreferrer" className="bg-foreground text-background hover:bg-foreground/80 border-none px-8 rounded-full">
                Agendar meu horário
                <Icon icon="lucide:arrow-right" className="ml-2" />
              </Button>
              <Button href="#antes-depois" variant="secondary" className="border-primary/30 hover:border-primary text-foreground px-8 rounded-full">
                <Icon icon="solar:eye-linear" className="mr-2" />
                Ver Resultados
              </Button>
            </div>
          </div>

          {/* Direita: Vídeo quadrado (forma) com Floating Badges */}
          <div className="flex-1 w-full flex items-center justify-center relative mt-10 lg:mt-0">
            {/* O vídeo formatado (quadrado) - Restaurando arredondamento premium */}
            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square overflow-hidden">
              <img 
                src="/assets/PlidoLaranjaSlido2_1-ezgif.com-video-to-webp-converter.webp" 
                alt="Alisamento Perfeito" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Badge flutuante 1 (perfil da Aline) - Top Right */}
            <div className="gsap-fade-up absolute -right-4 md:-right-8 top-8 md:top-16 z-20">
              <div className="bg-[#1C1A14] text-[#E8C97A] p-5 rounded-3xl shadow-2xl shadow-black/20 w-64 border border-[#B8820A]/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#B8820A] flex items-center justify-center text-white font-display text-xl shrink-0">A</div>
                  <div>
                    <h4 className="font-semibold text-sm text-white">Aline Oliveira</h4>
                    <p className="text-[11px] text-[#B8820A] uppercase tracking-wider mt-0.5">Especialista</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-1.5 w-8 bg-white/10 rounded"></div>
                  <div className="h-1.5 w-12 bg-[#B8820A] rounded"></div>
                  <div className="h-1.5 w-6 bg-white/10 rounded"></div>
                  <div className="h-1.5 w-8 bg-[#B8820A] rounded"></div>
                </div>
              </div>
            </div>

            {/* Badge flutuante 2 (card dourado) - Bottom Left */}
            <div className="gsap-fade-up absolute -left-4 md:-left-12 bottom-8 md:bottom-16 z-20">
              <div className="bg-[#B8820A] text-white p-6 sm:p-7 rounded-[2rem] shadow-2xl shadow-[#B8820A]/20 w-64 md:w-72 transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-[#FFF0C0]/20 cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[10px] tracking-widest uppercase font-semibold text-[#FFF0C0]">Selo de Eficiência</div>
                  <Icon icon="solar:star-shine-linear" className="text-xl text-[#FFF0C0]" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-1 text-white">Liso<br/>Perfeito</h3>
                <p className="text-xs text-white/90 font-light mb-8">Tratamento Exclusivo e Saudável</p>
                
                <div className="flex justify-between items-end">
                  <div className="flex gap-1 h-6 items-end">
                    <div className="w-1 h-3 bg-white/30"></div>
                    <div className="w-1.5 h-6 bg-white/50"></div>
                    <div className="w-2.5 h-7 bg-[#FFF0C0]"></div>
                    <div className="w-1 h-4 bg-white/40"></div>
                    <div className="w-1.5 h-5 bg-white/40"></div>
                    <div className="w-1 h-2 bg-white/30"></div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full border border-[#FFF0C0]/40 flex items-center justify-center text-[#FFF0C0] opacity-80 hover:opacity-100 transition-colors">
                    <Icon icon="lucide:arrow-right" className="text-xl -rotate-45" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Prova Visual */}
      <section id="antes-depois" className="gsap-panel w-full min-h-screen py-32 bg-[#1C1A14] text-white px-6 md:px-12 z-10 shadow-2xl relative">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
          <div className="text-center mb-16 gsap-fade-up">
            {/* Correção de cores: Texto estipulado rigidamente para aparecer */}
            <Badge className="border-white/20 text-[#FFF0C0] bg-white/5">Antes e Depois</Badge>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-2 text-[#FFF8E7]">Resultados que falam por si</h2>
            <DividerOrnamental />
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-light">
              Antes e depois reais de clientes atendidas no estúdio. Sem filtro, sem edição.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gsap-stagger-list relative z-10">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                <img src={`/assets/WhatsApp Image 2026-04-04 at 23.11.12.jpeg`} alt="Antes e Depois" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-white/50 mt-12 gsap-fade-up font-light tracking-wide">
            Cada resultado é único porque cada cabelo é único.
          </p>
        </div>
      </section>

      {/* 3. Serviços */}
      <section id="serviços" className="gsap-panel w-full min-h-screen py-16 md:py-20 flex flex-col justify-center px-6 md:px-12 bg-background z-20 shadow-2xl relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-10 gsap-fade-up">
            <Badge className="mb-2">O que eu faço</Badge>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display mb-2 text-foreground">Tratamento ideal para você</h2>
            <div className="flex items-center gap-3 w-full max-w-[500px] mx-auto mt-4 mb-6">
              <div className="flex-1 h-[1px] bg-primary/30"></div>
              <div className="w-1.5 h-1.5 bg-primary rotate-45 shrink-0"></div>
              <div className="flex-1 h-[1px] bg-primary/30"></div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Todos os procedimentos são realizados com produtos selecionados e técnica personalizada para o seu tipo de fio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gsap-stagger-list mb-8">
            {[
              { title: "Escova Progressiva", desc: "O clássico que nunca sai de moda. Fios lisos e sem volume.", price: "180", icon: "solar:scissors-linear", theme: "bg-[#FFF0C0] border-[#E8C97A] text-[#7A5200]" },
              { title: "Progressiva Premium", desc: "Fórmula exclusiva nutritiva profunda. Duradoura e simultânea.", price: "280", icon: "solar:star-shine-linear", theme: "bg-[#B8820A] border-[#B8820A] text-[#FFF8E7]" },
              { title: "Botox Capilar", desc: "Redução de volume sem abrir mão dos movimentos naturais.", price: "150", icon: "solar:shield-check-linear", theme: "bg-white border-[#B8820A]/40 text-[#B8820A]" },
              { title: "Hidratação Profunda", desc: "Tratamento intensivo para fios ressecados.", price: "120", icon: "solar:magic-stick-3-linear", theme: "bg-white border-[#B8820A]/40 text-[#B8820A]" },
              { title: "Escova Simples", desc: "Finalização leve com muito balanço e brilho instantâneo.", price: "80", icon: "solar:leaf-linear", theme: "bg-white border-[#B8820A]/40 text-[#B8820A]" },
              { title: "Cortes", desc: "Do repicado moderno ao reto minimalista, encontre a harmonia ideal.", price: "90", icon: "solar:scissors-linear", theme: "bg-white border-[#B8820A]/40 text-[#B8820A]" },
              { title: "Tinturas", desc: "Cor vibrante garantindo a preservação total da saúde do cabelo.", price: "160", icon: "solar:pallete-2-linear", theme: "bg-white border-[#B8820A]/40 text-[#B8820A]" },
              { title: "Design de Sobrancelhas", desc: "Moldura perfeita combinando com a arquitetura do seu rosto.", price: "45", icon: "solar:eye-linear", theme: "bg-white border-[#B8820A]/40 text-[#B8820A]" },
              { title: "Pacote VIP Completo", desc: "A experiência suprema para quem não abre mão do melhor cuidado.", price: "480", icon: "solar:crown-star-linear", theme: "bg-[#1C1A14] border-[#1C1A14] text-[#E8C97A]", featured: true }
            ].map((service, i) => (
              <div key={i} className="group [transform-style:preserve-3d] cursor-default" style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-12px) scale(1.04)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)'}
              >
              <div className={`p-6 md:p-7 rounded-3xl border transition-all duration-400 ease-out flex flex-col h-full bg-white relative group-hover:shadow-2xl group-hover:border-primary/50 group-hover:z-10 ${service.featured ? 'border-primary shadow-2xl ring-2 ring-primary/20' : 'border-foreground/10'}`}>
                
                <div className={`absolute bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border ${service.theme} group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 z-10 shadow-sm group-hover:shadow-md`}>
                  <Icon icon={service.icon} className="text-xl md:text-2xl" />
                </div>

                {service.featured && (
                  <span className="absolute top-6 right-6 inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-primary text-white z-10 shadow-sm">VIP</span>
                )}

                <h3 className="text-xl md:text-2xl font-display mb-3 text-foreground z-10 pr-12">{service.title}</h3>
                <p className="text-base text-muted-foreground font-light leading-relaxed z-10 relative">{service.desc}</p>
                
                <div className="mt-auto z-10 relative pr-16 pt-2">
                  <div className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-primary mb-1">A partir de</div>
                  <div className="text-2xl md:text-3xl font-display font-light text-foreground group-hover:text-primary transition-colors duration-500">R$ {service.price}</div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Diferenciais */}
      <section id="diferenciais" className="gsap-panel w-full min-h-screen py-32 bg-[#FFF0C0] text-foreground px-6 md:px-12 z-30 shadow-2xl relative">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
          
          {/* Header Centralizado */}
          <div className="text-center mb-16 lg:mb-24 gsap-fade-up">
            <Badge className="bg-white/30 border-[#8C6A3A]/40 text-foreground">Por que a Aline?</Badge>
            <h2 className="text-5xl md:text-7xl font-display mb-2 mt-4 leading-none text-foreground">
              Não é só alisamento.<br/><i className="text-[#8C6A3A] italic">É cuidado.</i>
            </h2>
            <DividerOrnamental className="mx-auto" />
          </div>

          {/* Grid: Imagem na Esquerda, Textos na Direita */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="gsap-fade-up flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-lg aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/30 transition-all duration-700 hover:-translate-y-4 hover:rotate-2 hover:shadow-[0_20px_50px_rgba(140,106,58,0.4)]">
                 <img src="/assets/Prancheta 1.png" alt="Cuidados" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            
            <div className="gsap-stagger-list flex flex-col gap-10 lg:gap-12 justify-center order-1 lg:order-2">
              {[
                { title: "Avaliação personalizada", text: "Antes de qualquer procedimento, analiso o histórico do seu fio para escolher a técnica certa.", icon: "solar:eye-linear" },
                { title: "Produtos selecionados", text: "Trabalho apenas com linhas profissionais de alta performance e tecnologia avançada.", icon: "solar:star-shine-linear" },
                { title: "Resultado com durabilidade", text: "Você sai sabendo o que fazer e como manter em casa da forma mais duradoura.", icon: "solar:clock-circle-linear" },
                { title: "Atendimento exclusivo", text: "Atendimento unificado. Todo meu espaço e foco são só pra você durante o procedimento.", icon: "solar:crown-star-linear" }
              ].map((diff, i) => (
                <div key={i} className="flex gap-6 group p-6 -m-6 rounded-[2rem] hover:bg-white/40 border border-transparent hover:border-[#8C6A3A]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-default">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 flex items-center justify-center text-foreground text-3xl group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-sm group-hover:shadow-lg">
                    <Icon icon={diff.icon} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display mb-2 text-foreground">{diff.title}</h3>
                    <p className="text-foreground/80 leading-relaxed font-light text-lg">{diff.text}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Depoimentos */}
      <section id="depoimentos" className="gsap-panel w-full min-h-screen py-32 px-6 md:px-12 bg-background z-40 shadow-2xl relative">
        <div className="max-w-7xl mx-auto h-full">
          <div className="text-center mb-16 gsap-fade-up">
            <Badge>O que dizem as clientes</Badge>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-2 leading-none text-foreground">Quem conheceu<br/>não quer outro lugar.</h2>
            <DividerOrnamental />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gsap-stagger-list mb-12">
            {[
              { text: "Nunca imaginei que meu cabelo pudesse ficar assim. A Aline entendeu exatamente o que eu precisava.", author: "Fernanda R." },
              { text: "Saí completamente apaixonada. Voltei três vezes desde então.", author: "Camila S." },
              { text: "O atendimento é diferente. Cuida de verdade e o ambiente é maravilhoso. Vale a pena.", author: "Mariana T." },
              { text: "Com a Aline, finalmente consegui o resultado que queria — o liso supremo sem quebrar.", author: "Juliana M." }
            ].map((dep, i) => (
              <div key={i} className="p-8 border-l-[4px] border-l-primary rounded-r-[1.5rem] bg-white border-y border-r border-foreground/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-primary text-3xl leading-none">✦</div>
                  <div className="flex gap-1 text-[#F5C842]">
                    {[...Array(5)].map((_, idx) => (
                      <Icon key={idx} icon="solar:star-bold" className="text-xl" />
                    ))}
                  </div>
                </div>
                <p className="text-lg italic mb-8 font-light text-foreground/80 leading-relaxed">"{dep.text}"</p>
                <div>
                  <strong className="font-display font-medium text-2xl text-foreground">{dep.author}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sobre */}
      <section id="sobre" className="gsap-panel w-full min-h-screen py-32 bg-[#1C1A14] text-background px-6 md:px-12 z-50 shadow-2xl relative">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="gsap-fade-up relative h-[400px] md:h-[550px] rounded-[3rem] overflow-hidden border border-primary/30 shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:-rotate-1 hover:shadow-[0_20px_50px_rgba(184,130,10,0.3)]">
            <img src="/assets/WhatsApp Image 2026-01-05 at 16.44.18.jpeg" alt="Aline Oliveira" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
          
          <div className="gsap-fade-up text-background">
            <Badge className="border-primary text-[#F5C842] bg-primary/10">Quem sou eu</Badge>
            <h2 className="text-5xl md:text-7xl font-display mb-2 text-[#FFF8E7]">Aline Oliveira</h2>

            <div className="flex items-center gap-3 w-full max-w-[445px] mt-6 mb-10">
              <div className="flex-1 h-[1px] bg-primary/40"></div>
              <div className="w-1.5 h-1.5 bg-primary rotate-45 shrink-0"></div>
              <div className="flex-1 h-[1px] bg-primary/40"></div>
            </div>
            
             
            <div className="space-y-6 text-lg text-white/80 mb-12 font-light leading-relaxed">
                <p>Sou especialista em alisamento capilar com 15 anos de experiência dedicados a reconstruir a harmonia dos fios — e a confiança de quem os carrega.</p>
              <p>Hoje atendo com agenda controlada e método focado para garantir toda autonomia do seu cronograma com total dedicação em seu resultado estético.</p>
            </div>

            <Button href="https://wa.me/5564993416869" target="_blank" rel="noopener noreferrer" className="bg-[#B8820A] hover:bg-[#8C6A3A] text-white border-none w-full sm:w-auto">
              Venha me conhecer
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Final Call + Location */}
      <section className="gsap-panel w-full min-h-screen pt-32 pb-48 px-6 md:px-12 bg-[#F0E8D8] relative">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Esquerda: Maps/Endereço */}
            <div className="gsap-fade-up bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-primary/10 flex flex-col">
              <div className="flex flex-col items-center text-center">
                <Badge>Onde me encontrar</Badge>
                <h2 className="text-4xl md:text-5xl font-display mb-2 text-foreground">Santa Helena de Goiás</h2>
              </div>
              
              <div className="space-y-10 mb-6 mt-6 text-foreground">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0 bg-[#FFF0C0]">
                    <Icon icon="solar:map-point-linear" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Endereço</h4>
                    <p className="text-foreground/70 leading-relaxed font-light">
                      Av. Antonio José de Souza<br/>
                      QD46 LT13-B SN - Parque Residencial Isaura<br/>
                      Santa Helena de Goiás — GO
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0 bg-[#FFF0C0]">
                    <Icon icon="solar:clock-circle-linear" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Atendimento</h4>
                    <p className="text-foreground/70 leading-relaxed font-light">
                      Terça a Sábado, 09h às 19h<br/>
                      <span className="text-primary font-medium tracking-wide text-sm opacity-80 uppercase">*Apenas com hora marcada</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <Button href="https://maps.app.goo.gl/LN1PuAWjGPTFfcq78" target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full">
                  <Icon icon="solar:streets-map-point-bold-duotone" className="mr-2 text-xl" />
                  Ver no Google Maps
                </Button>
              </div>
            </div>

            {/* Direita: CTA Final Apenas Agendar */}
            <div className="gsap-fade-up bg-[#1C1A14] text-white p-10 md:p-14 rounded-[3rem] shadow-2xl flex flex-col justify-center border border-[#B8820A]/30">
              <h2 className="text-4xl md:text-6xl font-display mb-8 font-light text-[#FFF8E7] leading-[1.1]">
                Pronta para <i className="text-primary italic">transformar</i> seu cabelo?
              </h2>
              <p className="text-lg text-white/70 mb-12 leading-relaxed font-light">
                As vagas são limitadas. Exclusividade imperdível para garantir que você tenha a melhor experiência possível.
              </p>
              
              <Button href="https://wa.me/5564993416869" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white hover:bg-[#20BE5C] hover:scale-105 transition-all text-lg border-none shadow-xl shadow-green-500/30">
                <Icon icon="simple-icons:whatsapp" className="mr-3 text-2xl" /> 
                Agendar pelo WhatsApp
              </Button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 w-full py-8 text-center text-foreground/50 border-t border-transparent flex flex-col items-center">
          <p className="font-medium tracking-wide">Aline Oliveira Alisamentos © 2026</p>
          <div className="flex gap-6 mt-4 text-primary">
            <a href="https://www.instagram.com/salaoaline_oliveira/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:scale-110 transition-transform">
              <Icon icon="simple-icons:instagram" className="text-2xl cursor-pointer" />
            </a>
            <a href="https://wa.me/5564993416869" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:scale-110 transition-transform">
              <Icon icon="simple-icons:whatsapp" className="text-2xl cursor-pointer" />
            </a>
          </div>
        </footer>
      </section>

    </div>
  );
}

export default App;
