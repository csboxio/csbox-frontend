<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from "svelte";
	import { notificationStore } from "../lib/stores/stores.js";
	import Fa from 'svelte-fa/src/fa.svelte';
	import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
	import { fly, blur, draw} from 'svelte/transition';
	import {cubicOut} from "svelte/easing";
	import AOS from 'aos';
	import Swiper from 'swiper'
	import {browser} from "$app/environment";

	export let data

	let clientsEl;
	let carouselEl;

	onMount(() => {

		AOS.init({
			once: true,
			disable: 'phone',
			duration: 1000,
			easing: 'ease-out-cubic',
		});

		clientsEl = document.querySelectorAll('.clients-carousel');
		if (clientsEl.length > 0) {
			const clients = new Swiper('.clients-carousel', {
				slidesPerView: 'auto',
				spaceBetween: 64,
				centeredSlides: true,
				loop: true,
				speed: 5000,
				noSwiping: true,
				noSwipingClass: 'swiper-slide',
				autoplay: {
					delay: 0,
					disableOnInteraction: true,
				},
			});
		}

		carouselEl = document.querySelectorAll('.testimonials-carousel');


// Particle animation
		class ParticleAnimation {
			constructor(el, { quantity = 30, staticity = 50, ease = 50 } = {}) {
				this.canvas = el;
				if (!this.canvas) return;
				this.canvasContainer = this.canvas.parentElement;
				this.context = this.canvas.getContext('2d');
				this.dpr = window.devicePixelRatio || 1;
				this.settings = {
					quantity: quantity,
					staticity: staticity,
					ease: ease,
				};
				this.circles = [];
				this.mouse = {
					x: 0,
					y: 0,
				};
				this.canvasSize = {
					w: 0,
					h: 0,
				};
				this.onMouseMove = this.onMouseMove.bind(this);
				this.initCanvas = this.initCanvas.bind(this);
				this.resizeCanvas = this.resizeCanvas.bind(this);
				this.drawCircle = this.drawCircle.bind(this);
				this.drawParticles = this.drawParticles.bind(this);
				this.remapValue = this.remapValue.bind(this);
				this.animate = this.animate.bind(this);
				this.init();
			}

			init() {
				this.initCanvas();
				this.animate();
				window.addEventListener('resize', this.initCanvas);
				window.addEventListener('mousemove', this.onMouseMove);
			}

			initCanvas() {
				this.resizeCanvas();
				this.drawParticles();
			}

			onMouseMove(event) {
				const { clientX, clientY } = event;
				const rect = this.canvas.getBoundingClientRect();
				const { w, h } = this.canvasSize;
				const x = clientX - rect.left - (w / 2);
				const y = clientY - rect.top - (h / 2);
				const inside = x < (w / 2) && x > -(w / 2) && y < (h / 2) && y > -(h / 2);
				if(inside) {
					this.mouse.x = x;
					this.mouse.y = y;
				}
			}

			resizeCanvas() {
				this.circles.length = 0;
				this.canvasSize.w = this.canvasContainer.offsetWidth;
				this.canvasSize.h = this.canvasContainer.offsetHeight;
				this.canvas.width = this.canvasSize.w * this.dpr;
				this.canvas.height = this.canvasSize.h * this.dpr;
				this.canvas.style.width = this.canvasSize.w + 'px';
				this.canvas.style.height = this.canvasSize.h + 'px';
				this.context.scale(this.dpr, this.dpr);
			}

			circleParams() {
				const x = Math.floor(Math.random() * this.canvasSize.w);
				const y = Math.floor(Math.random() * this.canvasSize.h);
				const translateX = 0;
				const translateY = 0;
				const size = Math.floor(Math.random() * 2) + 1;
				const alpha = 0;
				const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
				const dx = (Math.random() - 0.5) * 0.2;
				const dy = (Math.random() - 0.5) * 0.2;
				const magnetism = 0.1 + Math.random() * 4;
				return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism };
			}

			drawCircle(circle, update = false) {
				const { x, y, translateX, translateY, size, alpha } = circle;
				this.context.translate(translateX, translateY);
				this.context.beginPath();
				this.context.arc(x, y, size, 0, 2 * Math.PI);
				this.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
				this.context.fill();
				this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
				if (!update) {
					this.circles.push(circle);
				}
			}

			clearContext() {
				this.context.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
			}

			drawParticles() {
				this.clearContext();
				const particleCount = this.settings.quantity;
				for (let i = 0; i < particleCount; i++) {
					const circle = this.circleParams();
					this.drawCircle(circle);
				}
			}

			// This function remaps a value from one range to another range
			remapValue(value, start1, end1, start2, end2) {
				const remapped = (value - start1) * (end2 - start2) / (end1 - start1) + start2;
				return remapped > 0 ? remapped : 0;
			}

			animate() {
				this.clearContext();
				this.circles.forEach((circle, i) => {
					// Handle the alpha value
					const edge = [
						circle.x + circle.translateX - circle.size, // distance from left edge
						this.canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
						circle.y + circle.translateY - circle.size, // distance from top edge
						this.canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
					];
					const closestEdge = edge.reduce((a, b) => Math.min(a, b));
					const remapClosestEdge = this.remapValue(closestEdge, 0, 20, 0, 1).toFixed(2);
					if(remapClosestEdge > 1) {
						circle.alpha += 0.02;
						if(circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
					} else {
						circle.alpha = circle.targetAlpha * remapClosestEdge;
					}
					circle.x += circle.dx;
					circle.y += circle.dy;
					circle.translateX += ((this.mouse.x / (this.settings.staticity / circle.magnetism)) - circle.translateX) / this.settings.ease;
					circle.translateY += ((this.mouse.y / (this.settings.staticity / circle.magnetism)) - circle.translateY) / this.settings.ease;
					// circle gets out of the canvas
					if (circle.x < -circle.size || circle.x > this.canvasSize.w + circle.size || circle.y < -circle.size || circle.y > this.canvasSize.h + circle.size) {
						// remove the circle from the array
						this.circles.splice(i, 1);
						// create a new circle
						const circle = this.circleParams();
						this.drawCircle(circle);
						// update the circle position
					} else {
						this.drawCircle({ ...circle, x: circle.x, y: circle.y, translateX: circle.translateX, translateY: circle.translateY, alpha: circle.alpha }, true);
					}
				});
				window.requestAnimationFrame(this.animate);
			}
		}

// Init ParticleAnimation
		const canvasElements = document.querySelectorAll('[data-particle-animation]');
		canvasElements.forEach(canvas => {
			const options = {
				quantity: canvas.dataset.particleQuantity,
				staticity: canvas.dataset.particleStaticity,
				ease: canvas.dataset.particleEase,
			};
			new ParticleAnimation(canvas, options);
		});


// Box highlighter
		class Highlighter {
			constructor(containerElement) {
				this.container = containerElement;
				this.boxes = Array.from(this.container.children);
				this.mouse = {
					x: 0,
					y: 0,
				};
				this.containerSize = {
					w: 0,
					h: 0,
				};
				this.initContainer = this.initContainer.bind(this);
				this.onMouseMove = this.onMouseMove.bind(this);
				this.init();
			}

			initContainer() {
				this.containerSize.w = this.container.offsetWidth;
				this.containerSize.h = this.container.offsetHeight;
			}

			onMouseMove(event) {
				const { clientX, clientY } = event;
				const rect = this.container.getBoundingClientRect();
				const { w, h } = this.containerSize;
				const x = clientX - rect.left;
				const y = clientY - rect.top;
				const inside = x < w && x > 0 && y < h && y > 0;
				if (inside) {
					this.mouse.x = x;
					this.mouse.y = y;
					this.boxes.forEach((box) => {
						const boxX = -(box.getBoundingClientRect().left - rect.left) + this.mouse.x;
						const boxY = -(box.getBoundingClientRect().top - rect.top) + this.mouse.y;
						box.style.setProperty('--mouse-x', `${boxX}px`);
						box.style.setProperty('--mouse-y', `${boxY}px`);
					});
				}
			}

			init() {
				this.initContainer();
				window.addEventListener('resize', this.initContainer);
				window.addEventListener('mousemove', this.onMouseMove);
			}
		}

// Init Highlighter
		const highlighters = document.querySelectorAll('[data-highlighter]');
		highlighters.forEach((highlighter) => {
			new Highlighter(highlighter);
		});

	});

	let tab
	$: tab = 1;

	function clickTab(num) {
		tab = num;
	}


	let categoryIndex = 0;
	const categories = ['students', 'instructors', 'professors', 'developers'];
	let category = categories[categoryIndex];

	onMount(() => {
		const interval = setInterval(() => {
			categoryIndex = (categoryIndex + 1) % categories.length;
			category = categories[categoryIndex];
		}, 2500);

		return () => clearInterval(interval);
	});

	let activeSlide = 0;

	const totalSlides = 5;

	function nextSlide() {
		activeSlide = (activeSlide + 1) % totalSlides;
	}

	function prevSlide() {
		activeSlide = (activeSlide - 1 + totalSlides) % totalSlides;
	}
</script>

<svelte:head>
	<link href="./style.css" rel="stylesheet">
	<link href="./css/vendors/aos.css" rel="stylesheet">
</svelte:head>

<style>
	@keyframes slideInFromLeft {
		from {
			filter: blur(1px);
			opacity: 0;
			transform: translateY(-100px);
		}
		to {
			opacity: 1;
			filter: blur(0);
			transform: translateY(0);
		}
	}

	.animate-slide-in {
		animation: slideInFromLeft 700ms cubic-bezier(0.01, 0.20, 0.60, 0.94) 0s 1;
	}

	.blur-in-out {
		animation: blurInOut 1s ease-in-out forwards;
	}

	@keyframes blurInOut {
		0% {
			filter: blur(0);
			opacity: 1;
		}
		50% {
			filter: blur(4px);
			opacity: 0.5;
		}
		100% {
			filter: blur(0);
			opacity: 1;
		}
	}
</style>
<!-- Page wrapper -->
<div class="flex flex-col min-h-screen overflow-hidden">
	<!-- Site header -->
	<header class="absolute w-full z-30">
		<div class="max-w-6xl mx-auto px-4 sm:px-6">
			<div class="flex items-center justify-between h-16 md:h-20">

				<!-- Site branding -->
				<div class="shrink-0 mr-4">
					<!-- Logo -->
					<a class="block" href="/" aria-label="CSBOX">
						<img src="./logo-fullColor-white-text.png" width="150" height="100%" alt="CSBOX">
					</a>
				</div>

				<!-- Desktop navigation -->
				<nav class="flex grow">

					<!-- Desktop sign in links -->
					<ul class="flex grow justify-end flex-wrap items-center">
						{#if browser}
						<li>
							<a class="font-medium text-sm text-slate-300 hover:text-white transition duration-150 ease-in-out" href="/auth" >Sign in</a>
						</li>
						{/if}

						{#if $page.data.session && browser}
							<li class="ml-6">
								<a class="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out w-full group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="/auth">
                                    <span class="relative inline-flex items-center">
                                        Dashboard <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"><Fa icon={faArrowRight}/></span>
                                    </span>
								</a>
							</li>
						{/if}
					</ul>

				</nav>

			</div>
		</div>
	</header>
	<!-- Page content -->
		<!-- Hero -->
		<section>
			<div class="relative max-w-6xl mx-auto px-4 sm:px-6">

				<!-- Particles animation -->
				<div class="absolute inset-0 -z-10" aria-hidden="true">
					<canvas data-particle-animation></canvas>
				</div>

				<!-- Illustration -->
				<div class="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
					<div class="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
						<img src="/images/glow-bottom.svg" class="max-w-none" width="2146" height="774" alt="Hero Illustration">
					</div>
				</div>

				<div class="pt-32 pb-16 md:pt-52 md:pb-32">
					<!-- Hero content -->
					<div class="max-w-3xl mx-auto text-center">
						<div class="mb-6" data-aos="fade-down">
						<div class="inline-flex relative before:absolute before:inset-0 before:bg-blue-500 before:blur-md">
							<a class="btn-sm py-0.5 text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.blue.500),_theme(colors.blue.500))_padding-box,_linear-gradient(theme(colors.blue.500),_theme(colors.blue.200)_75%,_theme(colors.transparent)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/50 before:rounded-full before:pointer-events-none shadow" href="/auth">
                                        <span class="relative inline-flex items-center">
                                             Read the white-paper <span class="tracking-normal text-blue-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1"><Fa icon={faArrowRight}/></span>
                                        </span>
							</a>
						</div>
						</div>
						<h1 class="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" data-aos="fade-down">Empower. Educate. Elevate.</h1>
						<p class="text-lg text-slate-300 mb-8" data-aos="fade-down" data-aos-delay="200">A cloud-based code learning platform built for next-generation education.</p>
						<div class="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4" data-aos="fade-down" data-aos-delay="400">
							<div>
								<a class="btn text-slate-200 hover:text-white bg-slate-900 bg-opacity-25 hover:bg-opacity-30 w-full transition duration-150 ease-in-out" href="#0">
									<svg class="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
										<path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
									</svg>
									<span>Read the docs</span>
								</a>
							</div>
						</div>

					</div>

				</div>
			</div>
		</section>
		<!-- Clients -->
		<section>
			<div class="relative max-w-6xl mx-auto px-4 sm:px-6">

				<!-- Particles animation -->
				<div class="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
					<div class="absolute inset-0 -z-10" aria-hidden="true">
						<canvas data-particle-animation data-particle-quantity="5"></canvas>
					</div>
				</div>

				<div class="pb-12 md:py-16">
					<div class="overflow-hidden">
						<!-- Carousel built with Swiper.js [https://swiperjs.com/] -->
						<!-- * Initialized in src/js/main.js -->
						<!-- * Custom styles in src/css/additional-styles/theme.scss -->
						<div class="clients-carousel swiper-container relative before:absolute before:inset-0 before:w-32 before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-slate-900 after:absolute after:inset-0 after:left-auto after:w-32 after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-slate-900">

							<div class="swiper-wrapper !ease-linear select-none items-center">

								<div class="swiper-slide !w-auto">
								</div>
								<div class="swiper-slide !w-auto">
								</div>

							</div>

						</div>
					</div>
				</div>
			</div>
		</section>
	<!-- Features #1 -->
	<section class="relative">

		<!-- Particles animation -->
		<div class="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24 -ml-32">
			<div class="absolute inset-0 -z-10" aria-hidden="true">
				<canvas data-particle-animation data-particle-quantity="6" data-particle-staticity="30"></canvas>
			</div>
		</div>

		<div class="max-w-6xl mx-auto px-4 sm:px-6">
			<div class="pb-16 md:pt-16">
				<!-- Section header -->
				<div class="max-w-4xl mx-auto text-center relative">
					<div class="flex justify-center">
						<div class="flex items-center">
							<span class="h2 text-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4 pr-2 sm:text-nowrap">Code learning platform for</span>
							{#key category}
								<span class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4" in:blur >{category}</span>
							{/key}
						</div>
					</div>
				</div>
				<div class="max-w-2xl mx-auto text-center pb-12 md:pb-20 relative">
					<p class="text-lg text-slate-400 text-center">A cloud based environment for educating, and learning.</p>
				</div>
				<!-- Highlighted boxes -->
				<div class="relative pb-12 md:pb-20">
					<!-- Blurred shape -->
					<div class="absolute bottom-0 -mb-20 left-1/2 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
							<defs>
								<linearGradient id="bs2-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
									<stop offset="0%" stop-color="#6366F1" />
									<stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
								</linearGradient>
							</defs>
							<path fill="url(#bs2-a)" fill-rule="evenodd" d="m346 898 461 369-284 58z" transform="translate(-346 -898)" />
						</svg>
					</div>
					<!-- Grid -->
					<div class="grid md:grid-cols-12 gap-6 group" data-highlighter>
						<!-- Box #1 -->
						<div class="md:col-span-12" data-aos="fade-down">
							<div class="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden">
								<div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
									<div class="flex flex-col md:flex-row md:items-center md:justify-between">
										<!-- Blurred shape -->
										<div class="absolute right-0 top-0 blur-2xl" aria-hidden="true">
											<svg xmlns="http://www.w3.org/2000/svg" width="342" height="393">
												<defs>
													<linearGradient id="bs-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
														<stop offset="0%" stop-color="#6366F1" />
														<stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
													</linearGradient>
												</defs>
												<path fill="url(#bs-a)" fill-rule="evenodd" d="m104 .827 461 369-284 58z" transform="translate(0 -112.827)" opacity=".7" />
											</svg>
										</div>
										<!-- Radial gradient -->
										<div class="absolute flex items-center justify-center bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 h-full aspect-square" aria-hidden="true">
											<div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-70"></div>
											<div class="absolute w-1/4 h-1/4 translate-z-0 bg-blue-400 rounded-full blur-[40px]"></div>
										</div>


										<!-- Text -->
										<div class="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 pt-0 md:p-8 md:pr-0">
											<div class="mb-5">
												<div>
													<h3 class="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">Platform</h3>
													<p class="text-slate-400">Elevate Your LMS into a Coding-Centric Platform
														Empower Students, Simplify Teaching, Unleash Coding Potential.</p>
												</div>
											</div>
											<div>
												<a class="btn-sm text-slate-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none" href="#0">
                                                            <span class="relative inline-flex items-center">
                                                                Learn more <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                                                            </span>
												</a>
											</div>
										</div>
										<!-- Image -->

												<img class="absolute bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:relative md:left-0 md:translate-x-0 py-4" src="/icons/home/codingman.gif" width="550" alt="Feature 01">

									</div>
								</div>
							</div>
						</div>

						<div class="md:col-span-7" data-aos="fade-down">
							<div class="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden">
								<div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
									<div class="flex flex-col md:flex-row md:items-center md:justify-between">
										<!-- Blurred shape -->
										<div class="absolute right-0 top-0 blur-2xl" aria-hidden="true">
											<svg xmlns="http://www.w3.org/2000/svg" width="342" height="393">
												<defs>
													<linearGradient id="bs-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
														<stop offset="0%" stop-color="#6366F1" />
														<stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
													</linearGradient>
												</defs>
												<path fill="url(#bs-a)" fill-rule="evenodd" d="m104 .827 461 369-284 58z" transform="translate(0 -112.827)" opacity=".7" />
											</svg>
										</div>
										<!-- Radial gradient -->
										<div class="absolute flex items-center justify-center bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 h-full aspect-square" aria-hidden="true">
											<div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-70"></div>
											<div class="absolute w-1/4 h-1/4 translate-z-0 bg-blue-400 rounded-full blur-[40px]"></div>
										</div>


										<!-- Text -->
										<div class="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 pt-0 md:p-8">
											<div>
												<h3 class="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">Cloud Environment</h3>
												<p class="text-slate-400">Based on the industry standard, Visual Studio Code. Anything is supported, no artificial limits, best in class performance.</p>
											</div>
										</div>
										<!-- Image -->
										<div class="relative w-full  md:h-auto overflow-hidden md:pb-8">
											<img class="absolute bottom-0 left-1/2 -translate-x-1/2 mx-auto max-w-none md:max-w-full md:relative md:left-0 md:translate-x-0" src="/icons/home/cloud-storage.png" width="250" height="100%" alt="Feature 02">
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- Box #3 -->
						<div class="md:col-span-5" data-aos="fade-down">
							<div class="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden">
								<div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
									<div class="flex flex-col">
										<!-- Radial gradient -->
										<div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square" aria-hidden="true">
											<div class="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
										</div>
										<!-- Text -->
										<div class="md:max-w-[480px] shrink-0 order-1 md:order-none p-6 pt-0 md:p-8">
											<div>
												<h3 class="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">Integrate with (LMSs)</h3>
												<p class="text-slate-400">Link any LTI 1.3 Learning Management to our platform.</p>
											</div>
										</div>
										<!-- Image -->

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Features list -->
				<div class="grid md:grid-cols-3 gap-8 md:gap-12">
					<!-- Feature -->
					<!-- Feature -->
					<!-- Feature -->
					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M14.574 5.67a13.292 13.292 0 0 1 1.298 1.842 1 1 0 0 1 0 .98C15.743 8.716 12.706 14 8 14a6.391 6.391 0 0 1-1.557-.2l1.815-1.815C10.97 11.82 13.06 9.13 13.82 8c-.163-.243-.39-.56-.669-.907l1.424-1.424ZM.294 15.706a.999.999 0 0 1-.002-1.413l2.53-2.529C1.171 10.291.197 8.615.127 8.49a.998.998 0 0 1-.002-.975C.251 7.29 3.246 2 8 2c1.331 0 2.515.431 3.548 1.038L14.293.293a.999.999 0 1 1 1.414 1.414l-14 14a.997.997 0 0 1-1.414 0ZM2.18 8a12.603 12.603 0 0 0 2.06 2.347l1.833-1.834A1.925 1.925 0 0 1 6 8a2 2 0 0 1 2-2c.178 0 .348.03.512.074l1.566-1.566C9.438 4.201 8.742 4 8 4 5.146 4 2.958 6.835 2.181 8Z" />
							</svg>
							<h4 class="font-medium text-slate-50">It works on</h4><h4 class="font-medium text-slate-50 line-through">my</h4><h4 class="font-medium text-slate-50">any machine</h4>
						</div>
						<p class="text-sm text-slate-400">No more wasting time with mismatch enviroments and different operating systems.</p>
					</div>
					<!-- Feature -->
					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
							</svg>
							<h4 class="font-medium text-slate-50">Decrease student attrition</h4>
						</div>
						<p class="text-sm text-slate-400">No more setting up ide's, languages, dependencies, compiling, building, exporting, zipping, submitting</p>
					</div>
					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
							</svg>
							<h4 class="font-medium text-slate-50">More time teaching, less headache</h4>
						</div>
						<p class="text-sm text-slate-400">Managing files, downloading, unzipping, running, compiling, building, waiting.</p>
					</div>

					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
							</svg>
							<h4 class="font-medium text-slate-50">Link to LMS</h4>
						</div>
						<p class="text-sm text-slate-400">Link to LMS, one-click to start coding, one-click to teaching.</p>
					</div>
					<!-- Feature -->
					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M14 0a2 2 0 0 1 2 2v4a1 1 0 0 1-2 0V2H2v12h4a1 1 0 0 1 0 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm-1.957 10.629 3.664 3.664a1 1 0 0 1-1.414 1.414l-3.664-3.664-.644 2.578a.5.5 0 0 1-.476.379H9.5a.5.5 0 0 1-.48-.362l-2-7a.5.5 0 0 1 .618-.618l7 2a.5.5 0 0 1-.017.965l-2.578.644Z" />
							</svg>
							<h4 class="font-medium text-slate-50">No Limits</h4>
						</div>
						<p class="text-sm text-slate-400">Any language, backend, or framework. Runs full Linux environments in the cloud.</p>
					</div>
					<!-- Feature -->
					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8ZM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1Z" />
							</svg>
							<h4 class="font-medium text-slate-50">Import</h4>
						</div>
						<p class="text-sm text-slate-400">Easily import existing content from your LMS, and start teaching.</p>
					</div>
					<!-- Feature -->
					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12Zm0 14V2H2v12h12Zm-3-7H5a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Z" />
							</svg>
							<h4 class="font-medium text-slate-50">Grading</h4>
						</div>
						<p class="text-sm text-slate-400">One-click open and run, no more broken submissions.</p>
					</div>

					<div>
						<div class="flex items-center space-x-2 mb-1">
							<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
								<path d="M7.999 2.34a4.733 4.733 0 0 0-6.604 6.778l5.904 5.762a1 1 0 0 0 1.4 0l5.915-5.77a4.733 4.733 0 0 0-6.615-6.77Zm5.208 5.348-5.208 5.079-5.2-5.07a2.734 2.734 0 0 1 3.867-3.864c.182.19.335.404.455.638a1.04 1.04 0 0 0 1.756 0 2.724 2.724 0 0 1 5.122 1.294 2.7 2.7 0 0 1-.792 1.923Z" />
							</svg>
							<h4 class="font-medium text-slate-50">Built for you</h4>
						</div>
						<p class="text-sm text-slate-400">Built for educators by educators, built for students by students.</p>
					</div>

				</div>


			</div>
		</div>
	</section>
		<!-- Features -->
		<section>
			<div class="relative max-w-6xl mx-auto px-4 sm:px-6">
				<!-- Illustration -->
				<div class="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden" aria-hidden="true">
					<div class="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
						<img src="./images/glow-top.svg" class="max-w-none" width="1404" height="658" alt="Features Illustration">
					</div>
				</div>
				<div class="pt-16 pb-12 md:pt-52 md:pb-20">
					<div>
						<!-- Section content -->
						<div class="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

							<!-- Content -->
							<div class="md:w-7/12 lg:w-1/2 order-1 md:order-none max-md:text-center" data-aos="fade-down">
								<!-- Content #1 -->
								<div>
									<div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">Streamline learning and grading</div>
								</div>
								<h3 class="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">Integrate with any LMS</h3>
								<p class="text-lg text-slate-400 mb-8">One-click to start coding, one-click to start grading.</p>
								<div class="mt-8 max-w-xs max-md:mx-auto space-y-2">
									<button class="flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100
													{tab !== 1 ? 'border-slate-700 opacity-50' : 'border-blue-700 shadow shadow-blue-500/25'}"
											on:click={() => clickTab(1)}>
										<svg class="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M550.5 241l-50.1-86.8c1.1-2.1 1.9-4.6 1.9-7.2 0-8-6.7-14.7-14.7-15l-55.4-95.9c.5-1.6 1.1-3.2 1.1-4.8 0-8.6-7-15.3-15.3-15.3-4.8 0-8.8 2.1-11.8 5.6H299.5C296.8 18.1 292.8 16 288 16s-8.8 2.1-11.5 5.6H170.4C167.5 18.1 163.4 16 158.6 16c-8.3 0-15.3 6.7-15.3 15.3 0 1.6 .5 3.5 1.1 4.8l-56 97.2c-5.4 2.4-9.1 7.5-9.1 13.7 0 .5 .3 1.1 .3 1.6l-53.3 92.1c-7.2 1.3-12.6 7.5-12.6 15 0 7.2 5.1 13.4 12.1 15l55.2 95.4c-.5 1.6-.8 2.9-.8 4.8 0 7.2 5.1 13.4 12.1 14.7l51.7 89.7c-.5 1.6-1.1 3.5-1.1 5.4 0 8.6 7 15.3 15.3 15.3 4.8 0 8.8-2.1 11.5-5.4h106.9C279.2 493.9 283.4 496 288 496s8.8-2.1 11.5-5.4h107.1c2.7 2.9 6.7 4.8 11 4.8 8.6 0 15.3-7 15.3-15.3 0-1.6-.3-2.9-.8-4.3l51.7-90.3c7-1.3 12.1-7.5 12.1-14.7 0-1.6-.3-3.2-.8-4.8l54.9-95.4c7-1.3 12.3-7.5 12.3-15 0-7.2-5.1-13.4-11.8-14.7zM153.5 450.7l-43.7-75.8h43.7v75.8zm0-83.8h-43.7c-.3-1.1-.8-2.1-1.3-3.2l45-47.4v50.6zm0-62.4l-50.4 53.3c-1.3-.5-2.7-1.3-4-1.6L43.4 259.8c.5-1.3 .5-2.7 .5-4s0-2.4-.3-3.5l52-90c2.7-.3 5.4-1.1 7.8-2.7l50.1 52v92.9zm0-102.3l-45.8-47.4c1.3-2.1 2.1-4.8 2.1-7.8 0-.3-.3-.8-.3-1.1l43.9-15.8v72.1zm0-80.6l-43.7 15.8 43.7-75.5v59.7zm326.5 39.1l.8 1.3L445.5 329.1l-63.8-67.2 98-101.5 .3 .3zM291.8 355.1l11.5 11.8H280.5l11.3-11.8zm-.3-11.3l-83.3-85.4 79.6-84.4 83 87.6-79.3 82.2zm5.4 5.9l79.3-82.2 67.5 71.3-5.9 28.1H313.7l-16.9-17.1zM410.4 44.4c1.1 .5 2.1 1.1 3.5 1.3l57.9 100.7v.5c0 2.9 .8 5.6 2.1 7.8L376.4 256l-83-87.6L410.4 44.4zm-9.1-2.1L287.7 162.5l-57.1-60.3 166.3-60h4.3zm-123.5 0c2.7 2.7 6.2 4.3 10.2 4.3s7.5-1.6 10.2-4.3h75L224.8 95.8 173.9 42.3h103.9zm-116.2 5.6l1.1-2.1a33.8 33.8 0 0 0 2.7-.8l51.2 53.8-54.9 19.8V47.9zm0 79.3l60.8-22 59.7 63.2-79.6 84.1-41-42.1v-83.3zm0 92.7L198 257.6l-36.4 38.3v-76.1zm0 87.9l42.1-44.5 82.8 86-17.1 17.7H161.6v-59.2zm7 162.1c-1.6-1.6-3.5-2.7-5.9-3.5l-1.1-1.6v-89.7h99.9l-91.6 94.8h-1.3zm129.9 0c-2.7-2.4-6.4-4.3-10.4-4.3s-7.8 1.9-10.4 4.3h-96.4l91.6-94.8h38.3l91.6 94.8H298.4zm120-11.8l-4.3 7.5c-1.3 .3-2.4 .8-3.5 1.3l-89.2-91.9h114.4l-17.4 83zm12.9-22.2l12.9-60.8h22l-34.8 60.8zm34.8-68.8h-20.4l4.6-21.2 17.1 18.2c-.5 .8-1.1 1.9-1.3 2.9zm66.2-107.4l-55.4 96.7c-1.3 .5-2.7 1.1-4 1.9l-20.6-22 34.6-163.9 45.8 79.3c-.3 1.3-.8 2.7-.8 4.3 0 1.3 .3 2.4 .5 3.8z"/></svg>
										<span>Seamless Integration</span>
									</button>
									<button
											class="flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100
											{tab !== 2 ? 'border-slate-700 opacity-50' : 'border-blue-700 shadow shadow-blue-500/25'}"
											on:click={() => clickTab(2)}>
										<svg class="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"/></svg>
										<span>Empower Educators</span>
									</button>
									<button
											class="flex items-center text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100
												{tab !== 3 ? 'border-slate-700 opacity-50' : 'border-blue-700 shadow shadow-blue-500/25'}"
											on:click={() => clickTab(3)}>
										<svg class="shrink-0 fill-slate-300 mr-3" xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>
										<span>Enhance Learning</span>
									</button>
								</div>
							</div>

							<!-- Image -->
							<div class="md:w-5/12 lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
								<div class="relative py-24 -mt-12">

									<!-- Particles animation -->
									<div class="absolute inset-0 -z-10">
										<canvas data-particle-animation data-particle-quantity="8" data-particle-staticity="30"></canvas>
									</div>

									<div class="flex items-center justify-center">
										<div class="relative w-48 h-48 flex justify-center items-center">
											<!-- Halo effect -->
											<svg class="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none blur-md" width="480" height="480" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
												<defs>
													<linearGradient id="pulse-a" x1="50%" x2="50%" y1="100%" y2="0%">
														<stop offset="0%" stop-color="#2b41ff" />
														<stop offset="86.382%" stop-color="#adb6ff" />
														<stop offset="100%" stop-color="#dee1ff" />
													</linearGradient>
												</defs>
												<g fill-rule="evenodd">
													<path class="pulse" fill="url(#pulse-a)" fill-rule="evenodd" d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"></path>
													<path class="pulse pulse-1" fill="url(#pulse-a)" fill-rule="evenodd" d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"></path>
													<path class="pulse pulse-2" fill="url(#pulse-a)" fill-rule="evenodd" d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"></path>
												</g>
											</svg>
											<!-- Grid -->
											<!-- Icons -->
											<!-- Make sure to use in: or they will glitch and transition at the same time -->
											{#if tab === 1}
												<div>
													<img src="/icons/home/integration-preview.png" class="absolute animate-slide-in inset-1 z-10">
												</div>
											{:else if tab === 2}
													<img src="/icons/home/dashboard.png" class="absolute animate-slide-in inset-1 z-10">
											{:else}
													<img src="/icons/home/rocket.png" class="absolute animate-slide-in inset-1 z-10">
											{/if}
											<div class="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] rounded-full overflow-hidden [mask-image:_radial-gradient(black,_transparent_60%)]">
												<div class="h-[200%] animate-endless">
													<div class="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20"></div>
													<div class="absolute inset-0 [background:_repeating-linear-gradient(transparent,_transparent_48px,_theme(colors.blue.500)_48px,_theme(colors.blue.500)_49px)]"></div>
													<div class="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.white)_48px,_theme(colors.white)_49px)] blur-[2px] opacity-20"></div>
													<div class="absolute inset-0 [background:_repeating-linear-gradient(90deg,transparent,_transparent_48px,_theme(colors.blue.500)_48px,_theme(colors.blue.500)_49px)]"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>

					</div>

				</div>
			</div>
		</section>

		<section class="relative">
			<div class="relative max-w-6xl mx-auto px-4 sm:px-6">

				<!-- Blurred shape -->
				<div class="absolute top-0 -mt-24 left-0 -ml-16 blur-2xl opacity-70 pointer-events-none -z-10" aria-hidden="true">
					<svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
						<defs>
							<linearGradient id="bs4-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
								<stop offset="0%" stop-color="#4572D1" />
								<stop offset="100%" stop-color="#1F3D70" stop-opacity="0" />
							</linearGradient>
						</defs>
						<path fill="url(#bs4-a)" fill-rule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
					</svg>
				</div>

				<div class="pt-16 pb-12 md:pt-32 md:pb-20">

					<!-- Section header -->
					<div class="max-w-3xl pb-12 md:pb-20">
						<h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Faculty Benefits</h2>
						<p class="text-lg text-slate-400 px-4">
							Faculty often spend significant time configuring technical environments, diverting attention from teaching. Simplifying these complexities allows educators to
							focus on in-depth coding concepts, offer better guidance, and address complex queries effectively. This optimization creates a more immersive learning environment for both faculty and students.</p>
					</div>
				</div>
			</div>
		</section>

	<section class="relative">
		<div class="relative max-w-6xl mx-auto px-4 sm:px-6">

			<!-- Blurred shape -->
			<div class="absolute top-0 -mt-24 left-0 -ml-16 blur-2xl opacity-70 pointer-events-none -z-10" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
					<defs>
						<linearGradient id="bs4-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
							<stop offset="0%" stop-color="#4572D1" />
							<stop offset="100%" stop-color="#1F3D70" stop-opacity="0" />
						</linearGradient>
					</defs>
					<path fill="url(#bs4-a)" fill-rule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
				</svg>
			</div>

			<div class="pt-16 pb-12 md:pt-32 md:pb-20">

				<!-- Section header -->
				<div class="max-w-3xl pb-12 md:pb-20">
					<h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Student Benefits</h2>
					<p class="text-lg text-slate-400 px-4">Students' challenges with technical setup hinder their engagement and practical coding application, impacting effective learning and contributing to increased attrition rates.
						Introducing coding activities from day one enables educators to prioritize teaching, optimizing instructional time, and significantly enhancing overall educational quality.</p>
				</div>
			</div>
		</div>
	</section>

		<!-- Features #3 -->
		<section class="relative">

			<!-- Blurred shape -->
			<div class="absolute top-0 -translate-y-1/4 left-1/2 -translate-x-1/2 blur-2xl opacity-50 pointer-events-none -z-10" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
					<defs>
						<linearGradient id="bs3-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
							<stop offset="0%" stop-color="#6366F1" />
							<stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
						</linearGradient>
					</defs>
					<path fill="url(#bs3-a)" fill-rule="evenodd" d="m410 0 461 369-284 58z" transform="matrix(1 0 0 -1 -410 427)" />
				</svg>
			</div>

			<div class="max-w-6xl mx-auto px-4 sm:px-6">
				<div class="pt-16 pb-12 md:pt-32 md:pb-20 border-b border-slate-800">

					<!-- Section header -->
					<div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
						<h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">More than a login box</h2>
						<p class="text-lg text-slate-400">There are many variations available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
					</div>

					<div class="max-w-3xl mx-auto">
						<div data-aos="fade-down">
							<div class="group" data-highlighter>
								<div class="relative bg-slate-800 rounded-3xl p-px before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden">
									<div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
										<!-- Radial gradient -->
										<div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square" aria-hidden="true">
											<div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px]"></div>
										</div>
										<img src="./images/feature-image-04.png" width="768" height="400" alt="Feature 04">
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>

		<!-- Testimonials carousel -->
	<section>
		<div class="max-w-6xl mx-auto px-4 sm:px-6">
			<div class="pt-12 md:pt-20">

				<!-- Section header -->
				<div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
					<div>
						<div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-3">The security first platform</div>
					</div>
					<h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Spot issues faster</h2>
					<p class="text-lg text-slate-400">All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
				</div>


				<div class="relative before:absolute before:inset-0 before:-translate-x-full before:z-20 before:bg-gradient-to-l before:from-transparent before:to-slate-900 before:to-20% after:absolute after:inset-0 after:translate-x-full after:z-20 after:bg-gradient-to-r after:from-transparent after:to-slate-900 after:to-20%">
					<div class="testimonials-carousel swiper-container group">
						<div class="flex flex-wrap justify-center" data-highlighter>
						{#each Array(totalSlides) as _, index}

							<div class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 swiper-slide mb-4 mx-2 h-auto relative bg-slate-800 rounded-3xl p-px  before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-purple-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px] after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10 overflow-hidden group/slide">
								<div class="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
									<!-- Particles animation -->
									<div class="absolute inset-0 -z-10 opacity-0  group-hover/slide:opacity-100 transition-opacity duration-500 ease-in-out" aria-hidden="true">
										<canvas data-particle-animation data-particle-quantity="3"></canvas>
									</div>
									<!-- Radial gradient -->
									<div class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
										<div class="absolute inset-0 translate-z-0 rounded-full bg-slate-800  transition-colors duration-500 ease-in-out blur-[60px]"></div>
									</div>
									<div class="flex flex-col p-6 h-full">
										<img class="mb-3" src="./images/carousel-icon-01.svg" width="56" height="56" alt="Icon 01">
										<div class="grow">
											<div class="font-bold text-lg mb-1">Anonymous User</div>
											<div class="text-slate-400 mb-3">Incorporate rich user profiling, and facilitate more transactions.</div>
										</div>
										<div class="text-right">
											<a class="text-sm font-medium text-slate-300 hover:text-white inline-flex items-center transition duration-150 ease-in-out group" href="#0">Learn More <span class="tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span></a>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
					</div>
				</div>

				<!-- Arrows -->

			</div>
		</div>
	</section>


	<!-- Features #4 -->
		<section class="relative">
			<div class="relative max-w-6xl mx-auto px-4 sm:px-6">

				<!-- Blurred shape -->
				<div class="absolute top-0 -mt-24 left-0 -ml-16 blur-2xl opacity-70 pointer-events-none -z-10" aria-hidden="true">
					<svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
						<defs>
							<linearGradient id="bs4-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
								<stop offset="0%" stop-color="#A855F7" />
								<stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
							</linearGradient>
						</defs>
						<path fill="url(#bs4-a)" fill-rule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
					</svg>
				</div>

				<div class="pt-16 pb-12 md:pt-32 md:pb-20">

					<!-- Section header -->
					<div class="max-w-3xl pb-12 md:pb-20">
						<h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Why trust us?</h2>
						<p class="text-lg text-slate-400">Many desktop publishing packages and web page editors now use lorem ipsum as their default model text, and a search will uncover many web sites still in their infancy.</p>
					</div>

					<!-- Rows -->
					<div class="divide-y divide-slate-800">
						<!-- Row -->
						<div class="py-8 first-of-type:pt-0 last-of-type:pb-0">
							<div>
								<div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-6">API Authorization</div>
							</div>
							<div class="grid md:grid-cols-3 gap-8 md:gap-12 mb-2">
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M13 16c-.153 0-.306-.035-.447-.105l-3.851-1.926c-.231.02-.465.031-.702.031-4.411 0-8-3.14-8-7s3.589-7 8-7 8 3.14 8 7c0 1.723-.707 3.351-2 4.63V15a1.003 1.003 0 0 1-1 1Zm-4.108-4.054c.155 0 .308.036.447.105L12 13.382v-2.187c0-.288.125-.562.341-.752C13.411 9.506 14 8.284 14 7c0-2.757-2.691-5-6-5S2 4.243 2 7s2.691 5 6 5c.266 0 .526-.02.783-.048a1.01 1.01 0 0 1 .109-.006Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Discussions</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M15 9a3.841 3.841 0 0 0-2.661 1.545A2.524 2.524 0 0 0 10 9a1 1 0 1 0 0 2c.361 0 .57.279.89 1.284C10.243 13.08 9.441 14 9 14a1 1 0 0 0 0 2 3.841 3.841 0 0 0 2.661-1.545A2.524 2.524 0 0 0 14 16a1 1 0 0 0 0-2c-.361 0-.571-.279-.89-1.284C13.757 11.92 14.559 11 15 11a1 1 0 0 0 0-2Z"/><path d="M10 8a1 1 0 0 0 0-2H7.825c.432-2.421.983-4 2.175-4a1 1 0 0 1 1 1 1 1 0 0 0 2 0 3 3 0 0 0-3-3C7.193 0 6.313 2.9 5.793 6H3a1 1 0 1 0 0 2h2.49c-.506 3.52-1 6-2.49 6a1 1 0 0 1-1-1 1 1 0 0 0-2 0 3 3 0 0 0 3 3c3.367 0 3.964-4.175 4.49-7.858L7.51 8H10Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Team views</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5ZM15.707 14.293 13.314 11.9a8.019 8.019 0 0 1-1.414 1.414l2.393 2.393a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Powerful search</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
							</div>
						</div>
						<!-- Row -->
						<div class="py-8">
							<div>
								<div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-6">User Management</div>
							</div>
							<div class="grid md:grid-cols-3 gap-8 md:gap-12 mb-2">
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M2 6H0V2a2 2 0 0 1 2-2h4v2H2v4ZM16 6h-2V2h-4V0h4a2 2 0 0 1 2 2v4ZM14 16h-4v-2h4v-4h2v4a2 2 0 0 1-2 2ZM6 16H2a2 2 0 0 1-2-2v-4h2v4h4v2Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Analytics</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M6.974 14c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Notifications</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1ZM3 2h10v8H9v4H3V2Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Integrations</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
							</div>
						</div>
						<!-- Row -->
						<div class="py-8">
							<div>
								<div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-6">Standard Security</div>
							</div>
							<div class="grid md:grid-cols-3 gap-8 md:gap-12 mb-2">
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M15.5 11H13a5.022 5.022 0 0 1-3.453-1.4l-1.2 1.607A7.065 7.065 0 0 0 12 12.92v1.586a.5.5 0 0 0 .853.349l3-3A.5.5 0 0 0 15.5 11ZM1 5a5.022 5.022 0 0 1 3.453 1.4l1.205-1.61A7.028 7.028 0 0 0 1 3a1 1 0 1 0 0 2ZM13 5h2.5a.5.5 0 0 0 .354-.853l-3-3A.5.5 0 0 0 12 1.5v1.58a7.032 7.032 0 0 0-4.6 2.72L5 9a5.025 5.025 0 0 1-4 2 1 1 0 0 0 0 2 7.034 7.034 0 0 0 5.6-2.8L9 7a5.025 5.025 0 0 1 4-2Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Privacy</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M14 14H2a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2ZM7.293 11.707a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L9 8.586V1a1 1 0 1 0-2 0v7.586L3.707 5.293a1 1 0 0 0-1.414 1.414l5 5Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Data export</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
								<!-- Feature -->
								<div>
									<div class="flex items-center space-x-2 mb-1">
										<svg class="shrink-0 fill-slate-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
											<path d="M14.6.085 8 2.885 1.4.085c-.5-.2-1.4-.1-1.4.9v11c0 .4.2.8.6.9l7 3c.3.1.5.1.8 0l7-3c.4-.2.6-.5.6-.9v-11c0-1-.9-1.1-1.4-.9ZM2 2.485l5 2.1v8.8l-5-2.1v-8.8Zm12 8.8-5 2.1v-8.7l5-2.1v8.7Z" />
										</svg>
										<h4 class="font-medium text-slate-50">Real-time sync</h4>
									</div>
									<p class="text-sm text-slate-400">Login box must find the right balance for the user convenience, privacy and security.</p>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>

		<!-- Pricing -->
		<section class="relative">
			<!-- Radial gradient -->
			<div class="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
				<div class="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/3 aspect-square">
					<div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-50"></div>
				</div>
			</div>
			<div class="max-w-6xl mx-auto px-4 sm:px-6">
				<div class="py-12 md:py-20">
					<!-- Content -->
					<div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
						<div>
							<div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">Pricing plans</div>
						</div>
						<h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Competitive Pricing</h2>
						<p class="text-lg text-slate-400">Our platform is lower-price and higher performance compared to any competitor.</p>
					</div>
					<!-- Pricing tabs -->
					<div class="relative">
						<!-- Blurred shape -->
						<div class="max-md:hidden absolute bottom-0 -mb-20 left-2/3 -translate-x-1/2 blur-2xl opacity-70 pointer-events-none" aria-hidden="true">
							<svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
								<defs>
									<linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
										<stop offset="0%" stop-color="#A855F7" />
										<stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
									</linearGradient>
								</defs>
								<path fill="url(#bs5-a)" fill-rule="evenodd" d="m661 736 461 369-284 58z" transform="matrix(1 0 0 -1 -661 1163)" />
							</svg>
						</div>
						<!-- Content -->
						<div class="grid md:grid-cols-4 xl:-mx-6 text-sm [&>div:nth-of-type(-n+4)]:py-6 [&>div:nth-last-of-type(-n+4)]:pb-6 max-md:[&>div:nth-last-of-type(-n+4)]:mb-8 max-md:[&>div:nth-of-type(-n+4):nth-of-type(n+1)]:rounded-t-3xl max-md:[&>div:nth-last-of-type(-n+4)]:rounded-b-3xl md:[&>div:nth-of-type(2)]:rounded-tl-3xl md:[&>div:nth-of-type(4)]:rounded-tr-3xl md:[&>div:nth-last-of-type(3)]:rounded-bl-3xl md:[&>div:nth-last-of-type(1)]:rounded-br-3xl [&>div]:bg-slate-700/20 [&>div:nth-of-type(4n+1)]:bg-transparent max-md:[&>div:nth-of-type(4n+5)]:hidden max-md:[&>div:nth-of-type(4n+2)]:order-1 max-md:[&>div:nth-of-type(4n+3)]:order-2 max-md:[&>div:nth-of-type(4n+4)]:order-3 max-md:md:[&>div:nth-of-type(n)]:mb-0 [&>div:nth-of-type(4n+3)]:relative before:[&>div:nth-of-type(4n+3)]:absolute before:[&>div:nth-of-type(4n+3)]:-inset-px before:[&>div:nth-of-type(4n+3)]:rounded-[inherit] before:[&>div:nth-of-type(4n+3)]:border-x-2 before:[&>div:nth-of-type(3)]:border-t-2 before:[&>div:nth-last-of-type(2)]:border-b-2 before:[&>div:nth-of-type(4n+3)]:border-blue-500 before:[&>div:nth-of-type(4n+3)]:-z-10 before:[&>div:nth-of-type(4n+3)]:pointer-events-none">
							<!-- Pricing toggle -->
							<div class="px-6 flex flex-col justify-end">
								<div class="pb-5 md:border-b border-slate-800">
									<!-- Toggle switch -->
									<div class="max-md:text-center">
										<div class="inline-flex items-center whitespace-nowrap">
											<div class="text-sm text-slate-500 font-medium mr-2 md:max-lg:hidden">Monthly</div>
											<div class="relative">
												<input type="checkbox" id="toggle" class="peer sr-only" />
												<label for="toggle" class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-400 px-0.5 outline-slate-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow-sm before:transition-transform before:duration-150 peer-checked:bg-blue-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-blue-500">
													<span class="sr-only">Pay Yearly</span>
												</label>
											</div>
											<div class="text-sm text-slate-500 font-medium ml-2">Yearly <span class="text-teal-500">(-20%)</span></div>
										</div>
									</div>
								</div>
							</div>
							<!-- Competitor 1 --> 
							<div class="px-6 flex flex-col justify-end">
								<div class="grow pb-4 mb-4 border-b border-slate-800">
									<div class="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-0.5">Competitor 1</div>
									<div class="mb-1">
										<span class="text-lg font-medium text-slate-500">$</span><span class="text-3xl font-bold text-slate-50">1000</span><span class="text-sm text-slate-600 font-medium">/mo (platform fee)</span>
									</div>
									<div class="mb-1">
										<span class="text-lg font-medium text-slate-500">$</span><span class="text-2xl font-bold text-slate-50">10</span><span class="text-sm text-slate-600 font-medium">/mo (per user)</span>
									</div>
									<div class="text-slate-500">Not Including Hosting ~$20-40/mo (per user).</div>
								</div>
							</div>
							<!-- Pro price -->
							<div class="px-6 flex flex-col justify-end">
								<div class="grow pb-4 mb-4 border-b border-slate-800">
									<div class="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-0.5"><img src="/logo-fullColor-white-text.png" width="150" height="100%" alt="CSBOX"/></div>
									<div class="mb-1">
										<span class="text-lg font-medium text-slate-500">$</span><span class="text-3xl font-bold text-slate-50">10</span><span class="text-sm text-slate-600 font-medium">/mo (per user)</span>
									</div>
									<div class="text-slate-500">No limits.</div>
								</div>
								<div class="pb-4 border-b border-slate-800">
									<a class="btn-sm text-white bg-blue-500 hover:bg-blue-600 w-full transition duration-150 ease-in-out group" href="#0">
										Get Started <span class="tracking-normal text-blue-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
									</a>
								</div>
							</div>
							<!-- Enterprise price -->
							<div class="px-6 flex flex-col justify-end">
								<div class="grow pb-4 mb-4 border-b border-slate-800">
									<div class="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-0.5">Competitor 2</div>
									<div class="mb-1">
										<span class="text-lg font-medium text-slate-500">$</span><span class="text-3xl font-bold text-slate-50">~30</span><span class="text-sm text-slate-600 font-medium">/mo (per user)</span>
									</div>
									<div class="text-slate-500">$0.36 per hour, per user.</div>
								</div>
							</div>
							<!-- # Usage -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4">Features</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Usage</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Usage</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Usage</div>
							</div>
							<!-- Social Connections -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Fixed Monthly Price</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">

								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>$10 <span class="md:hidden">Fixed Total Platform Cost</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>Unlimited <span class="md:hidden">Fixed Monthly Price</span></span>
								</div>
							</div>
							<!-- Custom Domains -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Custom Domains</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>4 <span class="md:hidden">Custom Domains</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>Unlimited <span class="md:hidden">Custom Domains</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>Unlimited <span class="md:hidden">Custom Domains</span></span>
								</div>
							</div>
							<!-- User Role Management -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">User Role Management</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>Unlimited <span class="md:hidden">User Role Management</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>Unlimited <span class="md:hidden">User Role Management</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>Unlimited <span class="md:hidden">User Role Management</span></span>
								</div>
							</div>
							<!-- External Databases -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">External Databases</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>1 <span class="md:hidden">External Databases</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>5 <span class="md:hidden">External Databases</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span>Unlimited <span class="md:hidden">External Databases</span></span>
								</div>
							</div>
							<!-- # Features -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4">Features</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Features</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Features</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Features</div>
							</div>
							<!-- Custom Connection -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Custom Connection</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Custom Connection</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Custom Connection</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Custom Connection</span></span>
								</div>
							</div>
							<!-- Advanced Deployment Options -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Advanced Deployment Options</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Advanced Deployment Options</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Advanced Deployment Options</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Advanced Deployment Options</span></span>
								</div>
							</div>
							<!-- Extra Add-ons -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Extra Add-ons</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Extra Add-ons</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Extra Add-ons</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Extra Add-ons</span></span>
								</div>
							</div>
							<!-- Admin Roles -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Admin Roles</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
									<span><span class="md:hidden">Admin Roles</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
									<span><span class="md:hidden">Admin Roles</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Admin Roles</span></span>
								</div>
							</div>
							<!-- Deploy and Monitor -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Deploy and Monitor</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
									<span><span class="md:hidden">Deploy and Monitor</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
									<span><span class="md:hidden">Deploy and Monitor</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Deploy and Monitor</span></span>
								</div>
							</div>
							<!-- Enterprise Add-ons -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Enterprise Add-ons</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
									<span><span class="md:hidden">Enterprise Add-ons</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
									<span><span class="md:hidden">Enterprise Add-ons</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Enterprise Add-ons</span></span>
								</div>
							</div>
							<!-- # Support -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4">Support</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 hidden">Support</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Support</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-50 font-medium mt-4 md:hidden">Support</div>
							</div>
							<!-- Premium Support -->
							<div class="px-6 flex flex-col justify-end">
								<div class="py-2 text-slate-400 border-b border-slate-800">Premium Support</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center border-b border-slate-800 py-2 text-slate-400 max-md:hidden">
									<span><span class="md:hidden">Premium Support</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Premium Support</span></span>
								</div>
							</div>
							<div class="px-6 flex flex-col justify-end">
								<div class="flex items-center h-full border-b border-slate-800 py-2 text-slate-400">
									<svg class="shrink-0 fill-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" width="12" height="9">
										<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
									</svg>
									<span><span class="md:hidden">Premium Support</span></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Testimonials -->
		<section>
			<div class="max-w-3xl mx-auto px-4 sm:px-6">
				<div class="relative pb-12 md:pb-20">

					<!-- Particles animation -->
					<div class="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-6">
						<div class="absolute inset-0 -z-10" aria-hidden="true">
							<canvas data-particle-animation data-particle-quantity="10" data-particle-staticity="30"></canvas>
						</div>
					</div>

					<!-- Carousel -->
					<div class="text-center">
						<!-- Testimonial image -->
						<div class="relative h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_40%,theme(colors.white))]">
							<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] -z-10 pointer-events-none before:rounded-full rounded-full before:absolute before:inset-0 before:bg-gradient-to-b before:from-slate-400/20 before:to-transparent before:to-20% after:rounded-full after:absolute after:inset-0 after:bg-slate-900 after:m-px before:-z-20 after:-z-20">
								<!-- Alpine.js template for testimonial images: https://github.com/alpinejs/alpine#x-for -->
								<template x-for="(item, index) in items" :key="index">
									<div
											x-show="active === index"
											class="absolute inset-0 -z-10"
											x-transition:enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
											x-transition:enter-start="opacity-0 -rotate-[60deg]"
											x-transition:enter-end="opacity-100 rotate-0"
											x-transition:leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
											x-transition:leave-start="opacity-100 rotate-0"
											x-transition:leave-end="opacity-0 rotate-[60deg]"
									>
										<img class="relative top-11 left-1/2 -translate-x-1/2 rounded-full" :src="item.img" width="56" height="56" :alt="item.name">
									</div>
								</template>
							</div>
						</div>
						<!-- Text -->
						<div class="mb-10">
							<div class="relative flex flex-col transition-all duration-150 delay-300 ease-in-out" x-ref="testimonials">
								<!-- Alpine.js template for testimonials: https://github.com/alpinejs/alpine#x-for -->
								<template x-for="(item, index) in items" :key="index">
									<div
											x-show="active === index"
											x-transition:enter="transition ease-in-out duration-500 delay-200 order-first"
											x-transition:enter-start="opacity-0 -translate-x-4"
											x-transition:enter-end="opacity-100 translate-x-0"
											x-transition:leave="transition ease-out duration-300 delay-300 absolute"
											x-transition:leave-start="opacity-100 translate-x-0"
											x-transition:leave-end="opacity-0 translate-x-4"
									>
										<div class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60" x-text="item.quote"></div>
									</div>
								</template>
							</div>
						</div>
						<!-- Buttons -->
						<div class="flex flex-wrap justify-center -m-1.5">
							<!-- Alpine.js template for buttons: https://github.com/alpinejs/alpine#x-for -->
							<template x-for="(item, index) in items" :key="index">
								<button
										class="btn-sm m-1.5 text-xs py-1.5 text-slate-300 transition duration-150 ease-in-out [background:linear-gradient(theme(colors.slate.900),_theme(colors.slate.900))_padding-box,_conic-gradient(theme(colors.slate.400),_theme(colors.slate.700)_25%,_theme(colors.slate.700)_75%,_theme(colors.slate.400)_100%)_border-box] relative before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-full before:pointer-events-none"
										:class="active === index ? 'opacity-100' : 'opacity-30 hover:opacity-60'"

								>
                                        <span class="relative">
                                            <span class="text-slate-50" x-text="item.name"></span> <span class="text-slate-600">-</span> <span x-text="item.role"></span>
                                        </span>
								</button>
							</template>
						</div>
					</div>

				</div>
			</div>
		</section>

		<!-- CTA -->
		<section>
			<div class="max-w-6xl mx-auto px-4 sm:px-6">
				<div class="relative px-8 py-12 md:py-20 rounded-[3rem] overflow-hidden">
					<!-- Radial gradient -->
					<div class="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square" aria-hidden="true">
						<div class="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-70"></div>
						<div class="absolute w-1/4 h-1/4 translate-z-0 bg-blue-400 rounded-full blur-[40px]"></div>
					</div>
					<!-- Blurred shape -->
					<div class="absolute bottom-0 translate-y-1/2 left-0 blur-2xl opacity-50 pointer-events-none -z-10" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
							<defs>
								<linearGradient id="bs5-a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
									<stop offset="0%" stop-color="#A855F7" />
									<stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
								</linearGradient>
							</defs>
							<path fill="url(#bs5-a)" fill-rule="evenodd" d="m0 0 461 369-284 58z" transform="matrix(1 0 0 -1 0 427)" />
						</svg>
					</div>
					<!-- Content -->
					<div class="max-w-3xl mx-auto text-center">
						<div>
							<div class="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">The security first platform</div>
						</div>
						<h2 class="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">Take control of your business</h2>
						<p class="text-lg text-slate-400 mb-8">All the lorem ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
						<div>
							<a class="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group" href="#0">
								Get Started <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>


	<!-- Site footer -->
	<footer>
		<div class="max-w-6xl mx-auto px-4 sm:px-6">

			<!-- Blocks -->
			<div class="grid sm:grid-cols-12 gap-8 py-8 md:py-12">

				<!-- 1st block -->
				<div class="sm:col-span-12 lg:col-span-4 order-1 lg:order-none">
					<div class="h-full flex flex-col sm:flex-row lg:flex-col justify-between">
						<div class="mb-4 sm:mb-0">
							<div class="mb-4">
								<!-- Logo -->
								<a class="block" href="/" aria-label="CSBOX">
									<img src="./images/logo.svg" width="38" height="38" alt="Stellar">
								</a>
							</div>
							<div class="text-sm text-slate-300">&copy; CSBOX.com <span class="text-slate-500">-</span> All rights reserved.</div>
						</div>
						<!-- Social links -->
						<ul class="flex">
							<li>
								<a class="flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0" aria-label="Twitter">
									<svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
										<path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
									</svg>
								</a>
							</li>
							<li class="ml-2">
								<a class="flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0" aria-label="Dev.to">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
										<path class="w-8 h-8 fill-current" d="M12.29 14.3a.69.69 0 0 0-.416-.155h-.623v3.727h.623a.689.689 0 0 0 .416-.156.543.543 0 0 0 .21-.466v-2.488a.547.547 0 0 0-.21-.462ZM22.432 8H9.568C8.704 8 8.002 8.7 8 9.564v12.872A1.568 1.568 0 0 0 9.568 24h12.864c.864 0 1.566-.7 1.568-1.564V9.564A1.568 1.568 0 0 0 22.432 8Zm-8.925 9.257a1.631 1.631 0 0 1-1.727 1.687h-1.657v-5.909h1.692a1.631 1.631 0 0 1 1.692 1.689v2.533ZM17.1 14.09h-1.9v1.372h1.163v1.057H15.2v1.371h1.9v1.056h-2.217a.72.72 0 0 1-.74-.7v-4.471a.721.721 0 0 1 .7-.739H17.1v1.054Zm3.7 4.118c-.471 1.1-1.316.88-1.694 0l-1.372-5.172H18.9l1.058 4.064 1.056-4.062h1.164l-1.378 5.17Z" />
									</svg>
								</a>
							</li>
							<li class="ml-2">
								<a class="flex justify-center items-center text-blue-500 hover:text-blue-400 transition duration-150 ease-in-out" href="#0" aria-label="Github">
									<svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
										<path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>

				<!-- 2nd block -->
				<div class="sm:col-span-6 md:col-span-3 lg:col-span-2">
					<h6 class="text-sm text-slate-50 font-medium mb-2">Products</h6>
					<ul class="text-sm space-y-2">
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Features</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Integrations</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Pricing & Plans</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Changelog</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Our method</a>
						</li>
					</ul>
				</div>

				<!-- 3rd block -->
				<div class="sm:col-span-6 md:col-span-3 lg:col-span-2">
					<h6 class="text-sm text-slate-50 font-medium mb-2">Company</h6>
					<ul class="text-sm space-y-2">
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">About us</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Diversity & Inclusion</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Blog</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Careers</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Financial statements</a>
						</li>
					</ul>
				</div>

				<!-- 4th block -->
				<div class="sm:col-span-6 md:col-span-3 lg:col-span-2">
					<h6 class="text-sm text-slate-50 font-medium mb-2">Resources</h6>
					<ul class="text-sm space-y-2">
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Community</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Terms of service</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Report a vulnerability</a>
						</li>
					</ul>
				</div>

				<!-- 5th block -->
				<div class="sm:col-span-6 md:col-span-3 lg:col-span-2">
					<h6 class="text-sm text-slate-50 font-medium mb-2">Legals</h6>
					<ul class="text-sm space-y-2">
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Refund policy</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Terms & Conditions</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Privacy policy</a>
						</li>
						<li>
							<a class="text-slate-400 hover:text-slate-200 transition duration-150 ease-in-out" href="#0">Brand Kit</a>
						</li>
					</ul>
				</div>

			</div>

		</div>
	</footer>

</div>


