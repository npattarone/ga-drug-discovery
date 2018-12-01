const test = require('tape');
const { crossOver, mutation, offspring, generateSpecimen, calculateFitness } = require('../coreGA');

test('Should return 2 genes arrays crossovered', function (t) {
    let genesA = [6, 'B', 'C', 'D', 'S', 'N', 'O'];
    let genesB = [6, 'Z', 'T', 'V', 'B', 'M', 'L'];
    let genesC = [6, 'B', 'C', 'D', 'S', 'N', 'O'];

    let result = crossOver(genesA, genesB);

    t.notDeepEqual(genesA, result.genesA);
    t.notDeepEqual(genesB, result.genesB);
    t.deepEqual(genesA, genesC);

    console.log('result', result);

    t.end();
});

test('mutation() should change some value inside genes array', function (t) {
    let genesA = [6, 'B', 'C', 'D', 'S', 'N', 'O'];
    let mutatedGenes = mutation(genesA);

    t.notDeepEqual(genesA, mutatedGenes);

    console.log('mutatedGenes', mutatedGenes);

    t.end();
});

test('offspring() should return an array of 2 specimens containing different genes than their parents', function (t) {
    let genesA = [6, 'B', 'C', 'D', 'S', 'N', 'O'];
    let genesB = [6, 'Z', 'T', 'V', 'B', 'M', 'L'];

    let specimenA = { genes: genesA };
    let specimenB = { genes: genesB };

    let offsprings = offspring(specimenA, specimenB);

    t.notDeepEqual(offsprings[0].genes, genesA);
    t.notDeepEqual(offsprings[0].genes, genesB);
    t.notDeepEqual(offsprings[1].genes, genesA);
    t.notDeepEqual(offsprings[1].genes, genesB);

    console.log('offspring', offsprings);

    t.end();
});

test('generateSpecimen() should return an object containing specimen data', function (t) {
    let specimen = generateSpecimen();
    console.log(specimen);

    t.end();
});

test.only('calculateFitness() should return the maximum', function (t) {
    let genes = [7, 'Q', 'H', 'V', 'C', 'P', 'L', 'D'];
    let fitness = calculateFitness(genes);

    t.equal(7, fitness, 'Maximum fitness reached!');

    console.log('fitness', fitness);

    t.end();
});
