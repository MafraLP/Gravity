export class Canva {
    static instance = null;

    constructor(canvasId) {
        //Singleton pattern: if an instance already exists, return it
        // and do not create a new one in order to work in the same canvas evrytime.
        if (Canva.instance) {
            return Canva.instance;
        }
    
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas element with id "${canvasId}" not found`);
        }
        this.ctx = this.canvas.getContext('2d');
        
        const size = Math.min(window.innerWidth, window.innerHeight);
        
        this.canvas.width = size/1.5;
        this.canvas.height = size/1.5;
        
        //center the canvas in the screen
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '50%';
        this.canvas.style.top = '50%';
        this.canvas.style.transform = 'translate(-50%, -50%)';

        this.ctx.translate(this.canvas.width/2, this.canvas.height/2); // Mover para o centro
        this.ctx.transform(1, 0.2, 0.8, 1, 0, 0); // Matriz de transformação para efeito de skew
        // Alternativamente: ctx.rotate(), ctx.scale(), etc.

        // Voltar para a origem 
        this.ctx.translate(-this.canvas.width/2, -this.canvas.height/2);
        
        Canva.instance = this; 
    }

    //static single getInstance
    static getInstance(canvasId) {
        if (!Canva.instance) {
            Canva.instance = new Canva(canvasId);
        }
        return Canva.instance;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCircle(x, y, radius) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.closePath();
    }
}