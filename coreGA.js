const UNIVERSE_OF_GENES = ['G', 'A', 'V', 'C', 'P', 'L', 'I', 'M', 'W', 'F', 'K', 'R', 'H', 'S', 'T', 'Y', 'N', 'Q', 'D', 'E'];

function offspring(specimenA, specimenB) {
    let { genesA, genesB } = crossOver(specimenA.genes, specimenB.genes);

    genesA = mutation(genesA);
    genesB = mutation(genesB);

    return [
        { genes: genesA, fitness: calculateFitness(genesA), geneLength: genesA.length, maxGeneLength: 11 },
        { genes: genesB, fitness: calculateFitness(genesB), geneLength: genesB.length, maxGeneLength: 11 }
    ];
}

function getRandomGene(avoid) {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * UNIVERSE_OF_GENES.length);
    } while (UNIVERSE_OF_GENES[randomIndex] === avoid);

    return UNIVERSE_OF_GENES[randomIndex];
}

function mutation(genes) {
    let mutationPoint = Math.floor((Math.random() * genes.length) + 1);
    let mutatedOriginalGene = genes[mutationPoint];
    let randomGene = getRandomGene(mutatedOriginalGene);
    let clonedGenes = genes.slice();

    clonedGenes[mutationPoint] = randomGene;

    return clonedGenes;
}

function crossOver(genesA, genesB) {
    let crossOverPoint = Math.floor((Math.random() * genesA.length) + 1);
    let daddyGenes = genesA.slice();
    let mommyGenes = genesB.slice();

    for (let index = 1; index <= crossOverPoint; index++) {
        let temp = daddyGenes[index];

        if (genesB.length > crossOverPoint) {
            daddyGenes[index] = mommyGenes[index];
            mommyGenes[index] = temp;
        }
    }

    return { genesA: daddyGenes, genesB: mommyGenes };
}

function calculateFitness(specimenGenes) {
    let fitness = 0;
    fitness += applyRuleOne(specimenGenes);

    let index = 1;
    let reachedCondition = false;
    while (!reachedCondition && !(specimenGenes.length <= index)) {

        let gene = specimenGenes[index];
        let offset = index + 5;

        if (gene) {
            if (offset < specimenGenes.length) {
                let geneA = gene;
                let geneB = specimenGenes[offset];

                let ruleTwoResult = applyRuleTwo(geneA, geneB);

                fitness += ruleTwoResult;

                if (ruleTwoResult == 2) {
                    fitness += applyRuleThree(specimenGenes.slice(index + 1, offset));
                }

                reachedCondition = ruleTwoResult > 0;
            }
        }

        index++;
    }

    return fitness;
}

function applyRuleOne(genes) {
    let fitnessRuleOne = 0;

    if (genes[0] >= 6) {
        fitnessRuleOne++;
    } else {
        fitnessRuleOne = genes[0] / 10;
    }

    return fitnessRuleOne;
}

function applyRuleTwo(geneA, geneB) {

    let fitnessRuleTwo = 0;
    let valuesGeneA = ['K', 'R', 'H'];
    let valuesGeneB = ['D', 'E'];

    if (valuesGeneA.indexOf(geneA) !== -1 && valuesGeneB.indexOf(geneB) !== -1) {
        fitnessRuleTwo += 2;
    } else if (valuesGeneA.indexOf(geneA) !== -1 || valuesGeneB.indexOf(geneB) !== -1) {
        fitnessRuleTwo++;
    }

    return fitnessRuleTwo;
}

function applyRuleThree(genes) {
    let fitnessRuleThree = 0;
    let nonPolarGenes = ['G', 'A', 'V', 'C', 'P', 'L', 'I', 'M', 'W', 'F'];

    for (let geneIndex = 0; geneIndex < 4; geneIndex++) {
        let offsetGene = genes[geneIndex];

        if (nonPolarGenes.indexOf(offsetGene) !== -1) {
            fitnessRuleThree++;
        }
    }

    return fitnessRuleThree;
}

function generateSpecimen() {
    let specimen = {};

    specimen.maxGeneLength = 11;
    specimen.geneLength = Math.floor((Math.random() * specimen.maxGeneLength) + 1); // Returns a number between 1 and 11
    specimen.genes = [];

    for (let index = 0; index < specimen.geneLength; index++) {
        if (index === 0) {
            specimen.genes.push(specimen.geneLength - 1);
        } else {
            let randomIndex = Math.floor(Math.random() * UNIVERSE_OF_GENES.length); // Select a random position from the universe of genes

            specimen.genes.push(UNIVERSE_OF_GENES[randomIndex]);
        }
    }

    specimen.fitness = calculateFitness(specimen.genes);

    return specimen;
}

module.exports = {
    UNIVERSE_OF_GENES,
    crossOver,
    mutation,
    offspring,
    generateSpecimen,
    calculateFitness
}