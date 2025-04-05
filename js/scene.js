import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Scene {
    static instance = null;

    constructor(canvasId) {
        if (Scene.instance) {
            return Scene.instance;
        }

        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas element with id "${canvasId}" not found`);
        }

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        

        const size = Math.min(window.innerWidth, window.innerHeight) / 1.5;
        this.renderer.setSize(size, size);
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '50%';
        this.canvas.style.top = '50%';
        this.canvas.style.transform = 'translate(-50%, -50%)';
        
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.camera.position.z = 50;
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        
        this.points = null;
        
        this.animate();
        
        window.addEventListener('resize', () => this.onResize());
        
        Scene.instance = this;
    }

    static getInstance(canvasId) {
        if (!Scene.instance) {
            Scene.instance = new Scene(canvasId);
        }
        return Scene.instance;
    }

    onResize() {
        const size = Math.min(window.innerWidth, window.innerHeight) / 1.5;
        this.renderer.setSize(size, size);
        this.camera.aspect = 1;
        this.camera.updateProjectionMatrix();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    clear() {
        if (this.points) {
            this.scene.remove(this.points);
            this.points.geometry.dispose();
            this.points.material.dispose();
            this.points = null;
        }
    }

    drawPoints(amount, rows, cols) {
        this.clear();
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(amount * 3); 
        const colors = new Float32Array(amount * 3);

        const gridWidth = 40; 
        const gridHeight = 40; 
        
        const cellWidth = gridWidth / cols;
        const cellHeight = gridHeight / rows;
        
        for (let i = 0; i < amount; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            

            const x = (col * cellWidth) - (gridWidth / 2) + (cellWidth / 2);
            const y = (row * cellHeight) - (gridHeight / 2) + (cellHeight / 2);
            const z = 0;
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            colors[i * 3] = 0;
            colors[i * 3 + 1] = 0;
            colors[i * 3 + 2] = 1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            sizeAttenuation: true
        });
        
        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }
}