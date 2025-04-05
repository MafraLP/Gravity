import { Canva } from "./canva.js";

export class App {
    constructor() {
        console.log("App constructor called");
        this.canva = Canva.getInstance("canva");
        console.log("Canva instance obtained");
        this.init();
    }

    init() {
        console.log("App initialized app");
        this.setupEventListeners();
        
        // Desenhe alguns pontos iniciais
        const initialDots = document.getElementById("dot-amount-range").value;
        this.drawDots(initialDots);
    }

    drawDots(amount) {
        console.log("Drawing dots:", amount);
        this.canva.clear();
        
        if (amount <= 0) return;
        
        // Calcula quantas linhas e colunas teremos na grade
        const aspectRatio = this.canva.canvas.width / this.canva.canvas.height;
        const cols = Math.ceil(Math.sqrt(amount * aspectRatio));
        const rows = Math.ceil(amount / cols);
        
        const cellWidth = this.canva.canvas.width / cols;
        const cellHeight = this.canva.canvas.height / rows;
        const cellCenterX = cellWidth / 2;
        const cellCenterY = cellHeight / 2;
        
        for (let count = 0; count < amount; count++) {
            const row = Math.floor(count / cols);
            const col = count % cols;
            const x = col * cellWidth + cellCenterX;
            const y = row * cellHeight + cellCenterY;
                const radius = Math.min(cellWidth, cellHeight, 1); 
                this.canva.drawCircle(x, y, radius);
            this.canva.drawCircle(x, y, 1);
        }
    }
    setupEventListeners() {
        console.log("Setting up event listeners");
        const slider = document.getElementById("dot-amount-range");
        console.log("Slider element:", slider);
        
        if (!slider) {
            console.error("Slider element not found!");
            return;
        }

        const handleSliderChange = (event) => {
            console.log("Slider event triggered!");
            let dotAmount = parseInt(event.target.value);
            
            // Calcula a raiz quadrada aproximada
            let sqrt = Math.sqrt(dotAmount);
            
            // Arredonda para o inteiro mais próximo
            let roundedSqrt = Math.round(sqrt);
            
            // Calcula o quadrado perfeito mais próximo
            dotAmount = roundedSqrt * roundedSqrt;
            
            // Atualiza o valor do slider visualmente
            event.target.value = dotAmount;
            
            console.log("Dot amount:", dotAmount);
            this.drawDots(dotAmount);
        };

        slider.addEventListener("input", handleSliderChange);
        slider.addEventListener("change", handleSliderChange);
        
        console.log("Event listeners added to slider");
    }
}