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
        // Data atual como referência
        const today = new Date();
        // Configura as datas de abertura para cada card
        this.cards = [
            { id: 'modal1', openDate: new Date(today) },
            { id: 'modal2', openDate: new Date(today.setMonth(today.getMonth() + 1)) },
            { id: 'modal3', openDate: new Date(today.setMonth(today.getMonth() + 1)) }
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