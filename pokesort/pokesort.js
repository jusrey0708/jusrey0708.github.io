all = [];
tree = [];
choice = 0;
n=898


function init() {
    const locals = getLocalStorage();
    if (locals) {
        all = locals.all;
        tree = locals.tree;
        choice = locals.choice;
    } else {
        all = Array(n + 1).fill(0);
        all.forEach((x, i) => all[i] = i);
        all.splice(0, 1);

        const initialCurrent = goRando();

        tree = [[], initialCurrent, []];
        currentBranch = tree;

        choice = goRando();
    }

    showAll = false;

    document.getElementById('current').style.visibility = "visible";
    document.getElementById('option').style.visibility = "visible";

    if (choice != undefined) {
        document.getElementById('current').innerHTML = getImageById(tree[1]);
        document.getElementById('option').innerHTML = getImageById(choice);
    } else {
        document.getElementById('current').style.visibility = "hidden";
        document.getElementById('option').style.visibility = "hidden";
    }
    document.getElementById('results').innerHTML = resultDisplay();
}

function goRando() {
    console.log(all);
    const index = Math.floor(Math.random() * all.length);
    const rando = all[index];
    all.splice(index, 1);
    return rando;
}


function handleMore() {
    if (currentBranch[2].length === 0) {
        currentBranch[2] = [[], choice, []];
        handleNewCurrent();
    } else {
        currentBranch = currentBranch[2];
        document.getElementById('current').innerHTML = getImageById(currentBranch[1]);
    }
}

function handleLess() {
    if (currentBranch[0].length === 0) {
        currentBranch[0] = [[], choice, []];
        handleNewCurrent();
    } else {
        currentBranch = currentBranch[0];
        document.getElementById('current').innerHTML = getImageById(currentBranch[1]);
    }
}

function handleNewCurrent() {
    document.getElementById('results').innerHTML = resultDisplay();
    document.getElementById('percent').innerHTML = `${n-all.length}/${n} ranked`
    choice = goRando();
    tree = rebalanceTree();
    currentBranch = tree;
    if (choice != undefined) {
        document.getElementById('current').innerHTML = getImageById(tree[1]);
        document.getElementById('option').innerHTML = getImageById(choice);
    } else {
        document.getElementById('current').style.visibility = "hidden";
        document.getElementById('option').style.visibility = "hidden";
    }
    setLocalStorage();
}

function setLocalStorage() {
    localStorage.setItem('poke-stuff', JSON.stringify({ tree, all, choice }));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('poke-stuff'));
}

function rebalanceTree() {
    const orderedList = results();
    const thing = balanceBranch(orderedList);
    return thing;
}

function balanceBranch(array) {
    if (array.length === 0) {
        return [];
    }
    if (array.length === 1) {
        return [[], array[0], []];
    }

    const index = Math.floor(array.length / 2)
    const front = array.slice(0, index)
    const back = array.slice(index + 1);

    return [balanceBranch(front), array[index], balanceBranch(back)]

}



function results() {
    return tree.toString().split(',').filter(x => x);
}

function resultDisplay() {
    const thing = results();
    thing.reverse();
    if (showAll) {
        return thing.map((x, i) => `<span>#${i + 1}</span><br>` + getImageById(x)).join('<br>');
    }
    return thing.slice(0, 10).map((x, i) => `<span>#${i + 1}</span><br>` + getImageById(x)).join('<br>');
}

function redoResults() {
    showAll = !showAll;
    document.getElementById('results').innerHTML = resultDisplay();
}

function getImageById(id) {
    return `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">`
}


init();