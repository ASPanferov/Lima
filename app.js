// Lima RoadMap and CEO Profile Application

class LimaApp {
    constructor() {
        this.currentSection = 'roadmap';
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.sections = document.querySelectorAll('.content-section');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.initProgressBars();
        this.setupScrollEffects();
        this.initFinancialCalculator();
    }

    setupEventListeners() {
        // Navigation buttons
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetSection = e.target.getAttribute('data-section');
                this.switchSection(targetSection);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const sections = ['roadmap', 'ceo', 'audit', 'claude-training'];
                const currentIndex = sections.indexOf(this.currentSection);
                const nextIndex = e.key === 'ArrowRight' ? 
                    (currentIndex + 1) % 4 : 
                    (currentIndex - 1 + 4) % 4;
                const nextSection = sections[nextIndex];
                this.switchSection(nextSection);
            }
        });

        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Add hover effects to cards
        this.setupHoverEffects();
    }

    switchSection(targetSection) {
        if (this.currentSection === targetSection) return;

        // Update navigation buttons
        this.navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === targetSection) {
                btn.classList.add('active');
            }
        });

        // Hide current section
        const currentSectionEl = document.getElementById(this.currentSection);
        const targetSectionEl = document.getElementById(targetSection);

        if (currentSectionEl) {
            currentSectionEl.style.opacity = '0';
            currentSectionEl.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                currentSectionEl.classList.remove('active');
                
                // Show target section
                targetSectionEl.classList.add('active');
                
                // Trigger reflow
                targetSectionEl.offsetHeight;
                
                // Animate in
                targetSectionEl.style.opacity = '1';
                targetSectionEl.style.transform = 'translateY(0)';
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Re-animate progress bars if switching to roadmap
                if (targetSection === 'roadmap') {
                    setTimeout(() => this.animateProgressBars(), 300);
                }
                
                // Animate CEO cards if switching to CEO section
                if (targetSection === 'ceo') {
                    setTimeout(() => this.animateCEOCards(), 300);
                }
                
                // Animate Claude training cards if switching to training section
                if (targetSection === 'claude-training') {
                    setTimeout(() => this.animateTrainingCards(), 300);
                }
                
                // Animate audit cards if switching to audit section
                if (targetSection === 'audit') {
                    setTimeout(() => this.animateAuditCards(), 300);
                }
                
            }, 150);
        }

        this.currentSection = targetSection;
    }

    setupAnimations() {
        // Initial fade-in animation for the active section
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }

        // Animate elements on scroll
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll(
            '.status-card, .phase-block, .week-card, .team-member-card, .skill-item, .analysis-item, .recommendation-card, .metric-card, .metric-widget, .analysis-card, .week-block, .projection-card, .investment-card, .step-card, .advantage, .return-metric'
        );

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add CSS for animate-in class
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    initProgressBars() {
        // Animate progress bars on load
        setTimeout(() => {
            this.animateProgressBars();
        }, 500);
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach((bar, index) => {
            const targetWidth = bar.style.width || '0%';
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                bar.style.width = targetWidth;
            }, index * 200);
        });
    }

    animateCEOCards() {
        const cards = document.querySelectorAll('#ceo .skill-item, #ceo .analysis-item');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    animateTrainingCards() {
        const cards = document.querySelectorAll('#claude-training .training-overview > div > div, #claude-training .claude-benefits > div > div, #claude-training .screenshots-section > div');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    animateAuditCards() {
        const cards = document.querySelectorAll('#audit .metric-card, #audit .metric-widget, #audit .analysis-card, #audit .week-block, #audit .projection-card, #audit .investment-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate technical debt chart
        const techDebtChart = document.querySelector('#audit .tech-debt-chart');
        if (techDebtChart) {
            const segments = techDebtChart.querySelectorAll('.debt-segment');
            segments.forEach((segment, index) => {
                const originalWidth = segment.style.width;
                segment.style.width = '0%';
                setTimeout(() => {
                    segment.style.transition = 'width 1s ease';
                    segment.style.width = originalWidth;
                }, 500 + index * 200);
            });
        }

        // Animate funding bars
        const fundingBars = document.querySelectorAll('#audit .funding-bar');
        fundingBars.forEach((bar, index) => {
            const originalWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 1.2s ease';
                bar.style.width = originalWidth;
            }, 800 + index * 150);
        });
    }

    setupHoverEffects() {
        // Add enhanced hover effects to cards
        const cards = document.querySelectorAll(
            '.status-card, .week-card, .team-member-card, .skill-item, .analysis-item, .recommendation-card, .metric-card, .metric-widget, .analysis-card, .week-block, .projection-card, .investment-card, .step-card, .advantage, .return-metric'
        );

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });

        // Add click ripple effect to buttons
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('style[data-ripple]')) {
            style.setAttribute('data-ripple', 'true');
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupScrollEffects() {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';

        // Add parallax effect to navigation
        let lastScrollY = window.scrollY;
        const nav = document.querySelector('.main-nav');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                nav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Add scroll-based animations for phase blocks
        const phaseBlocks = document.querySelectorAll('.phase-block');
        const phaseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    
                    // Animate progress bars within this phase
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                            bar.style.width = targetWidth;
                        }, index * 300);
                    });
                }
            });
        }, { threshold: 0.3 });

        phaseBlocks.forEach(block => {
            phaseObserver.observe(block);
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle resize events
    handleResize() {
        // Recalculate animations and layouts on resize
        const debouncedResize = this.debounce(() => {
            // Re-trigger scroll animations
            this.setupScrollAnimations();
        }, 250);

        window.addEventListener('resize', debouncedResize);
    }

    // Financial Calculator
    initFinancialCalculator() {
        const priceSlider = document.getElementById('price-per-user');
        const growthSlider = document.getElementById('users-growth');
        const currentUsersSlider = document.getElementById('current-users');
        const churnSlider = document.getElementById('churn-rate');
        const teamCostSlider = document.getElementById('team-cost');
        const cacSlider = document.getElementById('cac');
        
        const priceValue = document.getElementById('price-value');
        const growthValue = document.getElementById('growth-value');
        const currentUsersValue = document.getElementById('current-users-value');
        const churnValue = document.getElementById('churn-value');
        const teamCostValue = document.getElementById('team-cost-value');
        const cacValue = document.getElementById('cac-value');
        const currentPrice = document.getElementById('current-price');

        if (!priceSlider || !growthSlider || !currentUsersSlider) return;

        // Initialize chart
        this.initRevenueChart();
        
        // Initialize chart period controls
        this.initChartPeriodControls();

        const updateCalculator = () => {
            const price = parseInt(priceSlider.value);
            const growthPerMonth = parseInt(growthSlider.value);
            const startingUsers = parseInt(currentUsersSlider.value);
            const churnRate = parseFloat(churnSlider?.value || 3);
            const teamCost = parseInt(teamCostSlider?.value || 8800);
            const cac = parseInt(cacSlider?.value || 150);

            // Update display values
            priceValue.textContent = `$${price}`;
            growthValue.textContent = `+${growthPerMonth} чел`;
            currentUsersValue.textContent = `${startingUsers} чел`;
            if (churnValue) churnValue.textContent = `${churnRate}%`;
            if (teamCostValue) teamCostValue.textContent = `$${teamCost.toLocaleString()}`;
            if (cacValue) cacValue.textContent = `$${cac}`;
            if (currentPrice) currentPrice.textContent = price;

            // Update projections with new metrics
            this.updateMonthlyProjections(price, growthPerMonth, startingUsers, churnRate, teamCost, cac);
            this.updateRevenueChart(price, growthPerMonth, startingUsers, churnRate, teamCost, cac);
        };

        priceSlider.addEventListener('input', updateCalculator);
        growthSlider.addEventListener('input', updateCalculator);
        currentUsersSlider.addEventListener('input', updateCalculator);
        if (churnSlider) churnSlider.addEventListener('input', updateCalculator);
        if (teamCostSlider) teamCostSlider.addEventListener('input', updateCalculator);
        if (cacSlider) cacSlider.addEventListener('input', updateCalculator);

        // Initial calculation
        updateCalculator();
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenue-chart');
        if (!ctx) return;

        this.revenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'MRR ($)',
                        data: [],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Затраты ($)',
                        data: [],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Прибыль ($)',
                        data: [],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Пользователи',
                        data: [],
                        borderColor: '#60a5fa',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#60a5fa',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'FKGroteskNeue, Inter, sans-serif',
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#2563eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                if (label.includes('MRR')) {
                                    return `${label}: $${value.toLocaleString()}`;
                                } else {
                                    return `${label}: ${value.toLocaleString()} чел`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                            font: {
                                family: 'FKGroteskNeue, Inter, sans-serif',
                                size: 11
                            },
                            color: '#6b7280'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                            font: {
                                family: 'FKGroteskNeue, Inter, sans-serif',
                                size: 11
                            },
                            color: '#2563eb',
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        title: {
                            display: true,
                            text: 'MRR ($)',
                            color: '#2563eb',
                            font: {
                                family: 'FKGroteskNeue, Inter, sans-serif',
                                size: 12,
                                weight: '600'
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            font: {
                                family: 'FKGroteskNeue, Inter, sans-serif',
                                size: 11
                            },
                            color: '#60a5fa',
                            callback: function(value) {
                                return value.toLocaleString() + ' чел';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Пользователи',
                            color: '#60a5fa',
                            font: {
                                family: 'FKGroteskNeue, Inter, sans-serif',
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    initChartPeriodControls() {
        const chartTabs = document.querySelectorAll('.chart-tab');
        chartTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                chartTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                const period = parseInt(e.target.dataset.period);
                this.chartPeriod = period;
                
                // Update chart with new period
                const priceSlider = document.getElementById('price-per-user');
                const growthSlider = document.getElementById('users-growth');
                const currentUsersSlider = document.getElementById('current-users');
                const churnSlider = document.getElementById('churn-rate');
                const teamCostSlider = document.getElementById('team-cost');
                const cacSlider = document.getElementById('cac');
                
                if (priceSlider && growthSlider && currentUsersSlider) {
                    this.updateRevenueChart(
                        parseInt(priceSlider.value),
                        parseInt(growthSlider.value),
                        parseInt(currentUsersSlider.value),
                        parseFloat(churnSlider?.value || 3),
                        parseInt(teamCostSlider?.value || 8800),
                        parseInt(cacSlider?.value || 150)
                    );
                }
            });
        });
        
        // Set default period
        this.chartPeriod = 12;
    }

    updateMonthlyProjections(pricePerUser, usersGrowthPerMonth, startingUsers, churnRate = 3, teamCost = 8800, cac = 150) {
        const summaryContainer = document.getElementById('projections-summary');
        const breakdownContainer = document.getElementById('monthly-breakdown');
        
        if (!summaryContainer || !breakdownContainer) return;

        // Generate monthly data for 36 months with churn
        const monthlyData = [];
        let currentUsers = startingUsers;
        
        for (let month = 0; month < 36; month++) {
            // Calculate users with churn
            if (month > 0) {
                const churnedUsers = Math.round(currentUsers * (churnRate / 100));
                currentUsers = currentUsers - churnedUsers + usersGrowthPerMonth;
            } else {
                currentUsers = startingUsers;
            }
            
            const mrr = currentUsers * pricePerUser;
            const arr = mrr * 12;
            
            // Calculate costs: team + customer acquisition
            const acquisitionCost = usersGrowthPerMonth * cac;
            const totalCosts = teamCost + acquisitionCost;
            const profit = mrr - totalCosts;
            
            monthlyData.push({
                month: month + 1,
                users: currentUsers,
                mrr,
                arr,
                costs: totalCosts,
                profit,
                growth: month === 0 ? 0 : usersGrowthPerMonth,
                churn: month === 0 ? 0 : Math.round(currentUsers * (churnRate / 100))
            });
        }

        // Update yearly summary
        const yearlySummary = [];
        for (let year = 1; year <= 3; year++) {
            const yearMonths = monthlyData.slice((year - 1) * 12, year * 12);
            const endUsers = yearMonths[yearMonths.length - 1].users;
            const avgMRR = yearMonths.reduce((sum, m) => sum + m.mrr, 0) / 12;
            const totalARR = avgMRR * 12;
            const totalCosts = yearMonths.reduce((sum, m) => sum + m.costs, 0);
            const totalProfit = yearMonths.reduce((sum, m) => sum + m.profit, 0);
            
            yearlySummary.push({
                year,
                endUsers,
                avgMRR: Math.round(avgMRR),
                totalARR: Math.round(totalARR),
                totalCosts: Math.round(totalCosts),
                totalProfit: Math.round(totalProfit)
            });
        }

        summaryContainer.innerHTML = yearlySummary.map(year => `
            <div class="year-summary">
                <h5>Год ${year.year}</h5>
                <div class="summary-metric">
                    <span class="label">Пользователи на конец года</span>
                    <span class="value">${year.endUsers.toLocaleString()}</span>
                </div>
                <div class="summary-metric">
                    <span class="label">Средний MRR</span>
                    <span class="value">$${year.avgMRR.toLocaleString()}</span>
                </div>
                <div class="summary-metric">
                    <span class="label">ARR</span>
                    <span class="value">$${year.totalARR.toLocaleString()}</span>
                </div>
                <div class="summary-metric">
                    <span class="label">Общие затраты</span>
                    <span class="value" style="color: #ef4444;">$${year.totalCosts.toLocaleString()}</span>
                </div>
                <div class="summary-metric">
                    <span class="label">Прибыль за год</span>
                    <span class="value" style="color: ${year.totalProfit >= 0 ? '#10b981' : '#ef4444'};">$${year.totalProfit.toLocaleString()}</span>
                </div>
            </div>
        `).join('');

        // Update monthly breakdown (show first 12 months by default)
        const monthNames = [
            'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
        ];

        const breakdown = monthlyData.slice(0, 12).map((data, index) => `
            <div class="month-row">
                <div class="month-name">${monthNames[index]} 2025</div>
                <div class="users">${data.users.toLocaleString()}</div>
                <div class="mrr">$${data.mrr.toLocaleString()}</div>
                <div class="costs" style="color: #ef4444;">$${data.costs.toLocaleString()}</div>
                <div class="profit" style="color: ${data.profit >= 0 ? '#10b981' : '#ef4444'};">$${data.profit.toLocaleString()}</div>
                <div class="churn">${data.churn > 0 ? '-' + data.churn : '—'}</div>
                <div class="growth">${data.growth > 0 ? '+' + data.growth : '—'}</div>
            </div>
        `).join('');

        breakdownContainer.innerHTML = `
            <div class="month-row" style="background: var(--blue-100); font-weight: 600;">
                <div class="month-name">Месяц</div>
                <div class="users">Пользователи</div>
                <div class="mrr">MRR</div>
                <div class="costs">Затраты</div>
                <div class="profit">Прибыль</div>
                <div class="churn">Churn</div>
                <div class="growth">Прирост</div>
            </div>
            ${breakdown}
        `;
    }

    updateRevenueChart(pricePerUser, usersGrowthPerMonth, startingUsers, churnRate = 3, teamCost = 8800, cac = 150) {
        if (!this.revenueChart) return;

        const months = this.chartPeriod || 12;
        
        // Generate chart data with churn and costs
        const labels = [];
        const mrrData = [];
        const costsData = [];
        const profitData = [];
        const usersData = [];
        
        let currentUsers = startingUsers;
        
        for (let month = 0; month < months; month++) {
            // Calculate users with churn
            if (month > 0) {
                const churnedUsers = Math.round(currentUsers * (churnRate / 100));
                currentUsers = currentUsers - churnedUsers + usersGrowthPerMonth;
            } else {
                currentUsers = startingUsers;
            }
            
            const mrr = currentUsers * pricePerUser;
            const acquisitionCost = usersGrowthPerMonth * cac;
            const totalCosts = teamCost + acquisitionCost;
            const profit = mrr - totalCosts;
            
            // Create month labels
            const monthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
            const year = 2025 + Math.floor(month / 12);
            const monthIndex = month % 12;
            labels.push(`${monthNames[monthIndex]} ${year}`);
            
            mrrData.push(mrr);
            costsData.push(totalCosts);
            profitData.push(profit);
            usersData.push(currentUsers);
        }

        // Update chart data
        this.revenueChart.data.labels = labels;
        this.revenueChart.data.datasets[0].data = mrrData; // MRR
        this.revenueChart.data.datasets[1].data = costsData; // Costs
        this.revenueChart.data.datasets[2].data = profitData; // Profit
        this.revenueChart.data.datasets[3].data = usersData; // Users
        
        // Update chart
        this.revenueChart.update('none'); // 'none' for instant update

        // Update chart stats
        this.updateChartStats(mrrData, usersData, months, costsData, profitData);
    }

    updateChartStats(mrrData, usersData, months, costsData = [], profitData = []) {
        const statsContainer = document.getElementById('chart-stats');
        if (!statsContainer) return;

        const finalMRR = mrrData[mrrData.length - 1];
        const finalUsers = usersData[usersData.length - 1];
        const initialMRR = mrrData[0];
        const initialUsers = usersData[0];
        const mrrGrowth = ((finalMRR - initialMRR) / initialMRR * 100).toFixed(1);
        const usersGrowth = ((finalUsers - initialUsers) / initialUsers * 100).toFixed(1);
        const totalRevenue = mrrData.reduce((sum, mrr) => sum + mrr, 0);
        const totalCosts = costsData.length > 0 ? costsData.reduce((sum, cost) => sum + cost, 0) : 0;
        const totalProfit = profitData.length > 0 ? profitData.reduce((sum, profit) => sum + profit, 0) : 0;
        const breakEvenMonth = profitData.findIndex(profit => profit >= 0) + 1;

        statsContainer.innerHTML = `
            <div class="stat-item">
                <div class="stat-value">$${finalMRR.toLocaleString()}</div>
                <div class="stat-label">Финальный MRR</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${finalUsers.toLocaleString()}</div>
                <div class="stat-label">Финальные пользователи</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">+${mrrGrowth}%</div>
                <div class="stat-label">Рост MRR</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">$${totalRevenue.toLocaleString()}</div>
                <div class="stat-label">Общая выручка за ${months} мес</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" style="color: #ef4444;">$${totalCosts.toLocaleString()}</div>
                <div class="stat-label">Общие затраты за ${months} мес</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" style="color: ${totalProfit >= 0 ? '#10b981' : '#ef4444'};">$${totalProfit.toLocaleString()}</div>
                <div class="stat-label">Общая прибыль за ${months} мес</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" style="color: ${breakEvenMonth > 0 && breakEvenMonth <= months ? '#10b981' : '#ef4444'};">${breakEvenMonth > 0 && breakEvenMonth <= months ? breakEvenMonth + ' мес' : 'Нет'}</div>
                <div class="stat-label">Break-even период</div>
            </div>
        `;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new LimaApp();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add keyboard shortcuts info (optional)
    console.log('Lima RoadMap & CEO Profile');
    console.log('Keyboard shortcuts:');
    console.log('← → : Navigate between sections');
    console.log('Made with ❤️ for Lima Project');

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        
        if (Math.abs(deltaX) > 50) { // Minimum swipe distance
            const sections = ['roadmap', 'ceo', 'audit', 'claude-training'];
            const currentIndex = sections.indexOf(app.currentSection);
            
            if (deltaX > 0 && currentIndex > 0) {
                // Swipe right - go to previous section
                app.switchSection(sections[currentIndex - 1]);
            } else if (deltaX < 0 && currentIndex < sections.length - 1) {
                // Swipe left - go to next section
                app.switchSection(sections[currentIndex + 1]);
            }
        }
    }, { passive: true });

    // Performance optimization: lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add focus management for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add focus styles for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyle);
});

// Handle visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.progress-fill').forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    }
});

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LimaApp;
}