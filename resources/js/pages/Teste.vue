<script setup>
import { Link } from '@inertiajs/vue3';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BotMessageSquare } from 'lucide-vue-next';
import { onMounted, onUnmounted, ref, nextTick } from 'vue';

gsap.registerPlugin(ScrollTrigger);

// Refs de estado
const percentage = ref(0);
const isLoading = ref(true);

const projects = [
    {
        title: 'MODELOS LICENC.IA',
        category: 'Inteligência Artificial',
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'BASE DE LEGISLAÇÕES BRASILEIRA',
        category: 'Workflow',
        image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'CONECTADO A VOCÊ',
        category: 'TUDO O QUE VOCÊ PRECISA',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    },
];

onMounted(() => {
    const tlLoader = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
    });

    const counter = { value: 0 };

    // 1. Sequência do Loader
    tlLoader
        .to(counter, {
            value: 100,
            duration: 2,
            onUpdate: () => {
                percentage.value = Math.floor(counter.value);
            },
        })
        .to('.loader-container', {
            yPercent: -100,
            duration: 1.2,
            delay: 0.2,
        })
        .add(() => {
            // Remove o estado de loading e limpa triggers fantasmas
            isLoading.value = false;
            ScrollTrigger.getAll().forEach((t) => t.kill());

            // Aguarda o Vue atualizar o DOM após remover o loader
            nextTick().then(() => {
                iniciarAnimacoesPrincipais();
            });
        });
});

function iniciarAnimacoesPrincipais() {
    // Revelação do Header
    gsap.to('.reveal-header', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        skewY: 0,
        duration: 1.5,
        ease: 'power4.out',
    });

    // Revelação das Imagens (Clip Path)
    gsap.to('.image-reveal', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        stagger: 0.2,
        duration: 1.5,
        ease: 'expo.out',
    });

    // --- CONFIGURAÇÃO DO SCROLL HORIZONTAL ---
    const slider = document.querySelector('.div-horizontal');
    const sections = gsap.utils.toArray('.secao-horizontal');

    if (slider) {
        const sliderTl = gsap.timeline({
            scrollTrigger: {
                trigger: slider,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                start: 'top top',
                end: () => '+=' + (slider.scrollWidth - window.innerWidth),
                invalidateOnRefresh: true,
            },
        });

        sliderTl.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: 'none',
        });
    }

    // Parallax das imagens
    gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                scrub: true,
            },
        });
    });

    // Efeito de flutuação contínuo (loop)
    gsap.to('.login-bounce', {
        y: '-=15',
        duration: 2.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
    });

    ScrollTrigger.refresh();
}

onUnmounted(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
    <section class="relative flex min-h-screen items-center px-8 lg:px-20 overflow-hidden">
            <div class="grid w-full max-w-[1600px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
                <div class="z-10 order-2 lg:order-1">
                    <div class="overflow-hidden mb-4">
                        <span class="reveal-text inline-block translate-y-full text-emerald-600 font-bold uppercase tracking-widest text-xs">
                            Based in Natal, RN / Full Stack Developer
                        </span>
                    </div>
                     <div class="flex flex-col justify-center">
                            <div>
                                <h1
                                    class="reveal-header font-ubermove-bold translate-y-[100px] skew-y-4 text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase opacity-0 lg:text-[5vw]"
                                >
                                    Thaynã <br />
                                    <span class="text-[6vw] text-gray-400"
                                        >Bittencourt</span
                                    >
                                </h1>
                            </div>
                            <div>
                                <p
                                    class="font-ubermove mt-6 max-w-md skew-y-4 text-xl text-zinc-600"
                                >
                                    Desenvolvedor Full Stack especializado em
                                    ecossistema Laravel, Vue.js e automações com
                                    n8n.
                                </p>
                            </div>
                        </div>
                    
                    <div class="reveal-text mt-10 flex space-x-6 opacity-0">
                        <Github class="w-5 h-5 cursor-pointer hover:text-emerald-600 transition-colors" />
                        <Linkedin class="w-5 h-5 cursor-pointer hover:text-emerald-600 transition-colors" />
                        <Mail class="w-5 h-5 cursor-pointer hover:text-emerald-600 transition-colors" />
                    </div>
                </div>

                <div class="relative order-1 lg:order-2">
                    <div class="hero-img-wrapper overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-square bg-zinc-200">
                        <img 
                            src="/img/eu preto e branco.jpeg" 
                            alt="Thaynã" 
                            class="hero-img h-full w-full object-cover grayscale scale-110"
                        />
                    </div>
                </div>
            </div>
        </section>
</template>

<style scoped>
/* Reset de scroll lateral para evitar bugs no GSAP */
:global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden !important;
}

@font-face {
    font-family: 'UberMove';
    src: url('/resources/css/fonts/UberMoveMedium.otf') format('opentype'); /* Ajuste o formato se for .otf */
    font-weight: 400; /* Equivalente ao 'normal' */
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'UberMove';
    src: url('/resources/css/fonts/UberMoveBold.otf') format('opentype');
    font-weight: 700; /* Equivalente ao 'bold' */
    font-style: normal;
    font-display: swap;
}

/* Classe para o texto Normal/Medium */
.font-ubermove {
    font-family: 'UberMove', sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
}

/* Classe para o texto Bold */
.font-ubermove-bold {
    font-family: 'UberMove', sans-serif;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
}

.noise-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://grainy-gradients.vercel.app/noise.svg');
    opacity: 0.04;
    pointer-events: none;
    z-index: 999;
}

.image-reveal {
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
    will-change: clip-path;
}

.div-horizontal {
    will-change: transform;
}

.secao-horizontal {
    flex-shrink: 0;
    width: 100vw;
    height: 100vh;
}
</style>
