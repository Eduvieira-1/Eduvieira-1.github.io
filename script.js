class SurpriseApp {
    constructor() {
        this.currentDate = new Date();
        // Data do aniversário: 09/06/2025 às 00:00:00
        this.targetDate = new Date(2025, 5, 9, 0, 0, 0); // Mês é 0-based, então 5 = Junho
        console.log('Data alvo:', this.targetDate);
        this.cards = [];
        this.initializeCards();
        this.setupEventListeners();
        this.startCountdown();
        this.setupModalListeners();
    }
    initializeCards() {
        const baseDate = new Date(2025, 3, 14); // 14 de abril de 2025

        const modal1Date = new Date(baseDate);
        const modal2Date = new Date(baseDate);
        modal2Date.setMonth(modal2Date.getMonth() + 1); // 14 de maio de 2025

        const modal3Date = new Date(baseDate);
        modal3Date.setMonth(modal3Date.getMonth() + 2); // 14 de junho de 2025


        this.cards = [
            { id: 'modal1', openDate: modal1Date },
            { id: 'modal2', openDate: modal2Date },
            { id: 'modal3', openDate: modal3Date }
        ];
    }
    setupEventListeners() {
        // Adiciona evento de clique para cada card
        this.cards.forEach(card => {
            const cardElement = document.querySelector(`[data-bs-target="#${card.id}"]`);
            if (cardElement) {
                cardElement.addEventListener('click', (e) => {
                    if (!this.canOpenCard(card)) {
                        e.preventDefault();
                    }
                });
            }
        });
    }
    setupModalListeners() {

        this.cards.forEach(card => {
            const modal = document.getElementById(card.id);
            if (modal) {
                modal.addEventListener('show.bs.modal', () => {
                    const voucherElement = modal.querySelector('.voucher');
                    if (voucherElement) {
                        if (this.canOpenCard(card)) {
                            voucherElement.style.display = 'block';
                        } else {
                            voucherElement.style.display = 'none';
                        }
                    }
                });
            }
        });
    }
    canOpenCard(card) {
        return this.currentDate >= card.openDate;
    }
    startCountdown() {

        this.updateCountdown();

        setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
    updateCountdown() {
        const now = new Date();
        const difference = this.targetDate.getTime() - now.getTime();

        if (difference <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }


        const totalSeconds = Math.floor(difference / 1000);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;


        document.getElementById('days').textContent = this.padNumber(days);
        document.getElementById('hours').textContent = this.padNumber(hours);
        document.getElementById('minutes').textContent = this.padNumber(minutes);
        document.getElementById('seconds').textContent = this.padNumber(seconds);


        console.log('Tempo restante:', {
            dias: days,
            horas: hours,
            minutos: minutes,
            segundos: seconds
        });
    }
    padNumber(num) {
        return num.toString().padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SurpriseApp();
}); 