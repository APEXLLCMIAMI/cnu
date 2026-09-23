/**
 * Archivo principal de JavaScript
 * Proyecto: Corn Island - Paraíso del Caribe
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENÚ MÓVIL (HAMBURGUESA)
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Cambiar icono
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       2. HEADER FIJO Y CAMBIO DE ESTILO AL SCROLL
       ========================================================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0';
        }
    });

    /* ==========================================================================
       3. INTERSECTION OBSERVER PARA ANIMACIONES AL SCROLL
       ========================================================================== */
    // Elementos a observar
    const fadeElements = document.querySelectorAll('.fade-in, .slide-up, .zoom-in, .fade-in-left, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 15% del elemento debe ser visible para activar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Dejar de observar una vez que aparece
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    /* ==========================================================================
       4. SIMULACIÓN DE FORMULARIO
       ========================================================================== */
    const planForm = document.getElementById('plan-form');
    const formMessage = document.getElementById('form-message');

    if (planForm) {
        planForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir recarga de página
            
            // Simular envío (en un caso real aquí iría un fetch/AJAX)
            const btnSubmit = planForm.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ENVIANDO...';
            btnSubmit.disabled = true;

            setTimeout(() => {
                // Restaurar botón y ocultar form
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
                
                // Mostrar mensaje de éxito
                planForm.reset(); // Limpiar campos
                formMessage.style.display = 'block';

                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500); // 1.5 seg de "carga" simulada
        });
    }

    /* ==========================================================================
       5. FILTROS DE HOTELES
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const hotelCards = document.querySelectorAll('.hotel-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar active al clickeado
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            
            hotelCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'todos' || (categories && categories.includes(filterValue))) {
                    card.style.display = 'flex'; // Usamos flex porque las tarjetas usan flex
                    card.style.animation = 'none';
                    // Trigger reflow to restart animation
                    void card.offsetWidth;
                    card.style.animation = 'fadeInUp 0.5s forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       6. ACTUALIZACIÓN DE AÑO EN FOOTER
       ========================================================================== */
    const footerYear = document.querySelector('.footer-bottom p:nth-child(2)');
    if(footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = `&copy; ${year} Guía Turística Corn Island. Todos los derechos reservados.`;
    }
});
