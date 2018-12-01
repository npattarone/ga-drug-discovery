const { generateSpecimen, offspring } = require('./coreGA');
const populationSize = 5;

let generationCount = 0;
let population = generatePopulation(populationSize);
population = sortByFitnessPopulation(population);

function generatePopulation(populationSize) {
    return Array
        .from(Array(populationSize).keys())
        .map(() => generateSpecimen());
}

function sortByFitnessPopulation(population) {
    return population.sort((specimenA, specimenB) => specimenB.fitness - specimenA.fitness);
}

while (population[0].fitness < 7) {

    generationCount++;

    let fittest = population[0];
    let secondFittest = population[1];

    let offsprings = offspring(fittest, secondFittest);

    population = population.slice(0, population.length - 2);
    population = population.concat(offsprings);
    population = sortByFitnessPopulation(population);

    console.log(`Generation: ${generationCount} - Fittest: ${population[0].fitness}`);
}

console.log(`Fittest found at Generation ${generationCount} - 
    Fitness: ${population[0].fitness} - 
    Genes: ${population[0].genes}`);