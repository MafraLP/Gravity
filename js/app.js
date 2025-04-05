import { Scene } from "./scene.js";

export class App {
    constructor() {
        console.log("App constructor called");
        this.scene = Scene.getInstance("canva");
        console.log("Scene instance obtained");
        this.init();
    }

    init() {
        console.log("App initialized app");
        this.setupEventListeners();
        
        // Desenhar pontos iniciais
        const initialDots = document.getElementById("dot-amount-range").value;
        this.drawDots(initialDots);
    }

    drawDots(amount) {
        console.log("Drawing dots:", amount);
        
        if (amount <= 0) return;
        
        // Calcula quantas linhas e colunas teremos na grade
        const aspectRatio = 1; // Agora trabalhamos com um canvas quadrado
        const cols = Math.ceil(Math.sqrt(amount * aspectRatio));
        const rows = Math.ceil(amount / cols);
        
        // Desenha os pontos na cena 3D
        this.scene.drawPoints(amount, rows, cols);
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
            
            // Garantir que o número seja um quadrado perfeito
            let sqrt = Math.sqrt(dotAmount);
            let roundedSqrt = Math.round(sqrt);
            let perfectSquare = roundedSqrt * roundedSqrt;
            
            // Se o valor não for um quadrado perfeito, ajustar para o mais próximo
            if (perfectSquare !== dotAmount) {
                dotAmount = perfectSquare;
                slider.value = dotAmount;
            }
            
            this.drawDots(dotAmount);
        };

        slider.addEventListener("input", handleSliderChange);
        slider.addEventListener("change", handleSliderChange);
        
        console.log("Event listeners added to slider");
    }
}