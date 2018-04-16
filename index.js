import SVG from "svg.js"

// const pSize = 200;
// const g = plot.group();
// //plot X and Y axis
// g.path().attr('d', 'M 0 200 L 0 0')
//     .attr('stroke-width', 2)
//     .attr('stroke-opacity', 0.8)
//     .attr('stroke', `black` )
//
// g.path().attr('d', 'M 0 200 L 200 200')
//     .attr('stroke-width', 2)
//     .attr('stroke-opacity', 0.8)
//     .attr('stroke', `black` )
// //.attr('fill', 'transparent')



const PLOTPARAMS = {
    containerID: 'plot',
    size: 400,
    granularity: 200, //steps -- paths drawn total
    interval: [0, 20],
    yRange: 2,
    axis: [1,1,0,0] //right upper, right lower
}

const Plot = class {
    constructor(parameters) {

        Object.assign(this, parameters);
        this.xRange = this.interval[1] - this.interval[0];
        this.unitSizeX = this.size / this.xRange;
        this.unitSizeY = this.size / this.yRange;
        // this.incrementX = this.unitSizeX / this.gra;

        this.container = new SVG(this.containerID).size(this.size * 2, this.size * 2); //random *2
        this.pathGroup = this.container.group();
        this.pathGroup.path()
            .attr('d', `M 0 ${this.size} L 0 0`)
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.8)
            .attr('stroke', `black` );

        this.pathGroup.path()
            .attr('d', `M 0 ${this.size} L ${this.size} ${this.size}`)
            .attr('stroke-width', 2)
            .attr('stroke-opacity', 0.8)
            .attr('stroke', `black`)

    }
    init(func) {
        this.f = func;
        this.computeValues();
        this.computePositions();
        this.makePaths();
    }
    computeValues(){
        const t = this;
        if (!t.f) {Console.log('PLOT CLASS has not FUNCTION')};

        t.Xs = new Array(t.granularity).fill(1).map((x, i) => (i-t.interval[0])  / t.unitSizeX);
        //this.Ys = Xs.map(x => this.f(x));
        t.values = t.Xs.map(function(e) {
            return {x: e, y: t.f(e)}
        });
    }
    computePositions() {
        const t = this;
        t.pos = t.values.map(function(v) {
            return {x: v.x * t.unitSizeX, y: t.size - v.y * t.unitSizeY}
        });
    }
    makePaths(pos = this.pos){
        const t = this;
        for (let i= 0; i < pos.length-1; i++) {
            const v = pos[i];
            const v2 = pos[i+1];
            t.pathGroup.path().attr('d', `M ${v.x} ${v.y} L ${v2.x} ${v2.y}`)
                .attr('stroke-width', 0.3)
                .attr('stroke-opacity', 0.8)
                .attr('stroke', `black` )
        }
    }


    //     for (let x=startX; x<endX; x+=increment) {
    //         const v = {
    //             x: x * pixPerX,
    //             y: pSize - (f(x) * yScaler),
    //             x2: (x+ increment) * pixPerX,
    //             y2:  pSize - (f(x+increment) * yScaler)
    //         }
    // }
}

const P = new Plot(PLOTPARAMS);
P.init(cos);
console.log(P);


let lastPath;
function graphHover(x,y) {
        let lastPath = g.path();
        let p = document.getElementById('currentPath');
        if (p) {p.remove()}
        const calcY = pSize - cos(x/ppX) * 100;
    lastPath
        .attr('d', `M 0 ${calcY} L ${x} ${calcY}`)
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.8)
        .attr('stroke', `black` )
        .attr('id', 'currentPath')
}



document.getElementById('plot').addEventListener('mousemove', function (e) {

    const x = e.layerX - this.offsetLeft;
    const y = e.layerY -this.offsetTop
    // graphHover(x,y);
})

function plotter (f, startX=0, endX=20, steps=200, pixPerX = ppX, yRange=2) {

    const range = endX -startX;
    const increment = range/steps;
    const yScaler = pSize / yRange;
    for (let x=startX; x<endX; x+=increment) {
        const v = {
            x: x * pixPerX,
            y: pSize - (f(x) * yScaler),
            x2: (x+ increment) * pixPerX,
            y2:  pSize - (f(x+increment) * yScaler)
        }
        g.path()
            .attr('d', `M ${v.x} ${v.y} L ${v.x2} ${v.y2}`)
            .attr('stroke-width', 0.3)
            .attr('stroke-opacity', 0.8)
            .attr('stroke', `black` )
    }

}

//plotter(cos);

function plotFn (func, pSize) {
    return function (x) {
        return func(x);
    }
}


function circumference(x) {
    return 2 * x * Math.PI;
}
function cos(x) {
    return Math.cos(x);
}
