class AnimatedLogo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Get attributes for customization
        const width = this.getAttribute('width') || '434';
        const height = this.getAttribute('height') || '434';
        
        // Get color attributes (with defaults)
        const lettersFill = this.getAttribute('letters-fill') || '#FFFFFF';
        const lettersStroke = this.getAttribute('letters-stroke') || '#FFFFFF';
        const globeFill = this.getAttribute('globe-fill') || '#1296E6';
        const globeStroke = this.getAttribute('globe-stroke') || '#FFFFFF';
        
        // Get animation timing attributes
        const lettersDrawDelay = this.getAttribute('letters-draw-delay') || '0s';
        const lettersFillDelay = this.getAttribute('letters-fill-delay') || '1.125s';
        const globeDrawDelay = this.getAttribute('globe-draw-delay') || '7.1s';
        const globeFillDelay = this.getAttribute('globe-fill-delay') || '8.75s';
        const lettersDrawDuration = this.getAttribute('letters-draw-duration') || '12s';
        const lettersFillDuration = this.getAttribute('letters-fill-duration') || '3.25s';
        const globeDrawDuration = this.getAttribute('globe-draw-duration') || '2.75s';
        const globeFillDuration = this.getAttribute('globe-fill-duration') || '2s';
        
        // Get stroke width attributes
        const lettersStrokeWidth = this.getAttribute('letters-stroke-width') || '6px';
        const globeStrokeWidth = this.getAttribute('globe-stroke-width') || '12px';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }

                .logo-container {
                    opacity: 0;
                    animation: fadeIn 0.1s ease-out forwards;
                }

                /* Apply theme colors to letter elements */
                .letters-back path:not([style*="fill:none"]) {
                    fill: ${lettersFill};
                }

                .letters-back path[style*="stroke"] {
                    stroke: ${lettersStroke};
                }

                /* Apply theme colors to globe element */
                .globe .circle {
                    fill: ${globeFill};
                    stroke: ${globeStroke};
                }

                /* Path drawing animation */
                @keyframes drawPath {
                    from {
                        stroke-dashoffset: 2400;
                    }
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                /* Fade-in animation */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                /* Fill fade-in animation */
                @keyframes fillFadeIn {
                    from {
                        fill-opacity: 0;
                    }
                    to {
                        fill-opacity: 1;
                    }
                }

                /* Apply path drawing to letter strokes */
                .letters-back path[style*="stroke"] {
                    stroke-dasharray: 2000;
                    stroke-dashoffset: 2000;
                    animation: drawPath ${lettersDrawDuration} ease-out ${lettersDrawDelay} forwards;
                }
                
                /* Apply fill to letters */
                .letters-back path:not([style*="fill:none"]) {
                    fill-opacity: 0;
                    animation: fillFadeIn ${lettersFillDuration} ease-out ${lettersFillDelay} forwards;
                }
                
                /* Apply path drawing to globe circle */
                .globe .circle {
                    stroke-dasharray: 2000;
                    stroke-dashoffset: 2000;
                    fill-opacity: 0;
                    transform-origin: center;
                    transform: rotate(158deg);
                    animation: drawPath ${globeDrawDuration} ease-out ${globeDrawDelay} forwards,
                               fillFadeIn ${globeFillDuration} ease-out ${globeFillDelay} forwards;
                }
            </style>
            <div class="logo-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 434 434" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5">
                    <g class="globe">
                        <path d="M426.319 219.421c-1.469 115.844-96.816 208.561-212.964 207.089S4.24 329.934 5.709 214.09C7.177 98.245 102.524 5.528 218.672 7s209.115 96.576 207.647 212.421" class="circle" style="stroke-width:${globeStrokeWidth}"/>
                    </g>
                    <g class="letters-back">
                        <path d="M35.203 293.632 79.99 149.335l37.034 84.527 36.356-84.364 46.19 144.004-31.741.201-19.531-65.186-31.456 68.257-30.13-68.298L65.09 293.78z"/>
                        <path d="M35.203 293.632 79.99 149.335l37.034 84.527 36.356-84.364 46.19 144.004-31.741.201-19.531-65.186-31.456 68.257-30.13-68.298L65.09 293.78z" style="fill:none;stroke-width:${lettersStrokeWidth}"/>
                        <path d="m229.237 294.548-.504-117.165-41.714.107-.043-.581-.332-25.308 109.771.181.197 25.7-41.405-.127-.18 117.236z"/>
                        <path d="m229.237 294.548-.504-117.165-41.714.107-.043-.581-.332-25.308 109.771.181.197 25.7-41.405-.127-.18 117.236z" style="fill:none;stroke-width:${lettersStrokeWidth}"/>
                    </g>
                </svg>
            </div>
        `;
    }

    // Method to replay animation
    replay() {
        const container = this.shadowRoot.querySelector('.logo-container');
        container.style.animation = 'none';
        setTimeout(() => {
            container.style.animation = '';
        }, 10);
    }
}

// Define the custom element
customElements.define('animated-logo', AnimatedLogo);
