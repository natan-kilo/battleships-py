let clicked = [];
let newShip = [];
let coordinateSystem = [
    ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"],
    ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10"],
    ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"],
    ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10"],
    ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e10"],
    ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10"],
    ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10"],
    ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10"],
    ["i1", "i2", "i3", "i4", "i5", "i6", "i7", "i8", "i9", "i10"],
    ["j1", "j2", "j3", "j4", "j5", "j6", "j7", "j8", "j9", "j10"]
];
function setDisabled() {
    document.getElementById().setAttribute("disabled", "disabled");
}

function setShip(coords) {
    if (clicked.length < 17 && !clicked.includes(coords)){
        clicked.push(coords);
        document.getElementById("btn"+coords).className = "shipbody";
    }
    else if (clicked.includes(coords)) {
        for (let i  = 0; i < clicked.length; i++){
            if (clicked[i] === coords) {
                clicked.splice(i, 1);
            }
            document.getElementById("btn" + coords).className = "";
        }
    }
}

function getCoordinates(coord) {
    for (let i = 0; i < coordinateSystem.length; i < 0) {
        if (coordinateSystem[i].includes(coord)) {
            return [i, coordinateSystem[i].indexOf(coord)];
        }
    }
}

function calculateInline() {
    let xyList = [];
    twoLong = [];
    threeLong = [];
    fourLong = [];
    fiveLong = [];
    for (let i = 0; i<clicked.length; i++){
        xyList.push(getCoordinates(clicked[i]));

    }
}

function findNeighbours(list, start) {
    neighbours = [];
    neighbours.push(start);
    let mul_0 = 0;
    let mul_1 = 0;
    if (list.includes([start[0] + 1, start[1]]) || list.includes([start[0] - 1, start[1]])) {
        mul_0 = 1;
        mul_1 = 0;
    }
    else if (list.includes([start[0], start[1] + 1]) || list.includes([start[0], start[1] - 1])) {
        mul_1 = 1;
        mul_0 = 0;
    }
    counter = 1;
    while (start[0] + counter * mul_0 < 11 && start[1] + counter * mul_1 < 11) {
        if (list.includes([start[0] + counter * mul_0, start[1] + counter * mul_1])) {
            neighbours.push([start[0] + counter * mul_0, start[1] + counter * mul_1]);
        }
        counter += 1;
    }
    counter = 1;
    while (start[0] - counter * mul_0 > 0 && start[1] - counter * mul_1 > 0) {
        if (list.includes([start[0] - counter * mul_0, start[1] - counter * mul_1])) {
            neighbours.push([start[0] - counter * mul_0, start[1] - counter * mul_1])        }
        counter += 1;
    }
}