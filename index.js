import SVG from "svg.js"

console.log("SVG", SVG);

const PASTELLHEX = ['#a7ff74', '#ffe8e8', '#81b4ff', '#ffa9a9', '#f7ffa6', '#c5bbff', '#69faff', '#ffd29b', '#98ffc0'];

//const container = new SVG("container").size(window.innerWidth, window.innerHeight);


const pSize = 200;
const plot = new SVG('plot').size(pSize * 2 , pSize * 2);

const g = plot.group();

g.path().attr('d', 'M 0 200 L 0 0') //sigmoidLine({from: node, to: target}))
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.8)
    .attr('stroke', `black` )

g.path().attr('d', 'M 0 200 L 200 200') //sigmoidLine({from: node, to: target}))
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.8)
        .attr('stroke', `black` )
        //.attr('fill', 'transparent')


const INCREMENT = 0.1;

//const f = plotFn(cos, pSize-20);

let perUnitScale = 1000;

function plotter (f, startX=0, endX=20, steps=200, pixPerX = 10, yRange=2) {

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

        console.log(x, f(x), v.x, v.y)

        g.path()
            .attr('d', `M ${v.x} ${v.y} L ${v.x2} ${v.y2}`)
            .attr('stroke-width', 0.3)
            .attr('stroke-opacity', 0.8)
            .attr('stroke', `black` )
    }

}

plotter(cos);

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


const Plot = class {
    constructor(size = {x: 100, y:100}) {

    }

}


function pathRound(d) {
    const f = Object.assign({}, d.from);
    const t = Object.assign({}, d.to);


    f.x = f.normX;
    f.y = f.normY;

    t.x = t.normX;
    t.y = t.normY;

    console.log("pos", t, f + " " + d)

    const dX = t.x - f.x;
    const dY = t.y - f.y;

    return `M ${f.x} ${f.y} Q ${f.x + dX/4} ${f.y - dX/10}, ${f.x + dX/2} ${f.y} T ${t.x} ${t.y}`

    // return `M ${f.x} ${f.y} Q ${f.x + dX/4} ${f.y - 50}, ${f.x + dX/2} ${f.y} T ${t.x} ${t.y}`
    //https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
    //"M10 80 Q 52.5 10, 95 80 T 180 80"
}