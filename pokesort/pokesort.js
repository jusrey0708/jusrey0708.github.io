all = [];
tree = [];
choice = 0;
n = 0
showAll = false;

showAlts = false;
showRegional = false;
showMega = false;
showGMax = false;

function init() {
    const locals = getLocalStorage();
    if (locals) {
        all = locals.all;
        tree = locals.tree;
        choice = locals.choice;
        n = locals.n
        document.getElementById('percent').innerHTML = `${n - all.length - 1}/${n}`;
        showAlts = document.getElementById('alt').checked = locals.showAlts;
        showRegional = document.getElementById('regional').checked= locals.showRegional;
        showMega = document.getElementById('mega').checked= locals.showMega;
        showGMax = document.getElementById('gmax').checked= locals.showGMax;
    } else {

        const baseIds = window.pokemon.filter(x => !x.alt && !x.region && !x.mega && !x.gmax).map(x => x.id);
        const altIds = window.pokemon.filter(x => x.alt).map(x => x.id);
        const regionalIds = window.pokemon.filter(x => x.region).map(x => x.id);
        const megaIds = window.pokemon.filter(x => x.mega).map(x => x.id);
        const gmaxIds = window.pokemon.filter(x => x.gmax).map(x => x.id);

        all = [...baseIds];
        all = showAlts ? [...all, ...altIds] : all;
        all = showRegional ? [...all, ...regionalIds] : all;
        all = showMega ? [...all, ...megaIds] : all;
        all = showGMax ? [...all, ...gmaxIds] : all;

        n = all.length;
        console.log(all.length, showAlts, showRegional, showMega, showGMax);

        const initialCurrent = goRando();
        tree = [[], initialCurrent, []];
        document.getElementById('percent').innerHTML = `1/${n}`;

        choice = goRando();
        setLocalStorage();
    }

    currentBranch = tree;

    document.getElementById('current').style.visibility = "visible";
    document.getElementById('option').style.visibility = "visible";

    if (choice != undefined) {
        document.getElementById('current').innerHTML = getDataById(tree[1]);
        document.getElementById('option').innerHTML = getDataById(choice);
    } else {
        document.getElementById('current').style.visibility = "hidden";
        document.getElementById('option').style.visibility = "hidden";
    }
    document.getElementById('results').innerHTML = resultDisplay();
}

function reset() {
    localStorage.removeItem('poke-stuff');
    showAlts = document.getElementById('alt').checked;
    showRegional = document.getElementById('regional').checked;
    showMega = document.getElementById('mega').checked;
    showGMax = document.getElementById('gmax').checked;
    init();
}

function goRando() {
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
        document.getElementById('current').innerHTML = getDataById(currentBranch[1]);
    }
}

function handleLess() {
    if (currentBranch[0].length === 0) {
        currentBranch[0] = [[], choice, []];
        handleNewCurrent();
    } else {
        currentBranch = currentBranch[0];
        document.getElementById('current').innerHTML = getDataById(currentBranch[1]);
    }
}

function handleNewCurrent() {
    document.getElementById('results').innerHTML = resultDisplay();
    document.getElementById('percent').innerHTML = `${n - all.length}/${n}`;

    choice = goRando();
    tree = rebalanceTree();
    currentBranch = tree;
    if (choice != undefined) {
        document.getElementById('current').innerHTML = getDataById(tree[1]);
        document.getElementById('option').innerHTML = getDataById(choice);
    } else {
        document.getElementById('current').style.visibility = "hidden";
        document.getElementById('option').style.visibility = "hidden";
    }
    setLocalStorage();
}

function setLocalStorage() {
    localStorage.setItem('poke-stuff', JSON.stringify({
        tree,
        all,
        choice,
        n,
        showAlts,
        showRegional,
        showMega,
        showGMax
    }));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('poke-stuff'));
}

function rebalanceTree() {
    const orderedList = results();
    return balanceBranch(orderedList);
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
    let thing = results();
    thing.reverse();
    if (!showAll) {
        thing = thing.slice(0, 10);
    }
    return thing.map((id, rank) => getResultHtml(id, rank)).join('<br>');
}

function redoResults() {
    showAll = !showAll;
    document.getElementById('results').innerHTML = resultDisplay();
}

function getDataById(id) {
    // id is a string here so using "==" to match string to number
    const data = window.pokemon.find(x => x.id == id);
    return `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
            <br>
            <span class="name-label">${data.name.toUpperCase()}</span>`;
}

function getResultHtml(id, rank) {
    return `<div class='result'>
                <span class="ranking-label">#${rank + 1}</span>
                <br>
                ${getDataById(id)}
            </div>`
}


init();