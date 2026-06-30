const router = require('express').Router();

const creatures = [
    {
        name: 'dolphins',
        habitat: 'Oceans and seas worldwide, from coastal shallows to the open sea, with a few species in rivers.',
        diet: 'Carnivorous, feeding mainly on fish and squid.',
        conservationStatus: 'Varies by species; many oceanic dolphins are Least Concern, while some river dolphins are Endangered.',
        funFact: 'Dolphins use echolocation, emitting clicks and listening for echoes to locate prey and navigate.',
    },
    {
        name: 'manatees',
        habitat: 'Shallow, slow-moving rivers, estuaries, and warm coastal waters of the Atlantic and Caribbean.',
        diet: 'Herbivorous, grazing on seagrasses and other aquatic plants.',
        conservationStatus: 'Vulnerable.',
        funFact: 'Often called "sea cows," manatees can eat about a tenth of their body weight in vegetation each day.',
    },
    {
        name: 'sea turtles',
        habitat: 'Tropical and subtropical oceans worldwide, nesting on sandy beaches.',
        diet: 'Varies by species, ranging from jellyfish and sponges to seagrasses and algae.',
        conservationStatus: 'Most species are Endangered or Vulnerable.',
        funFact: 'Female sea turtles return to the same beach where they hatched to lay their own eggs.',
    },
];

router.get('/', (req, res) => {
    res.json({ data: creatures });
});

module.exports = router;
