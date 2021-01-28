exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('avengers')
    .truncate()
    .then(function() {
      return knex('avengers').insert([
        { superhero: 'Iron Man', power: "Rich genius" },
        { superhero: 'Captain America', power: "Superhuman" },
        { superhero: 'Hulk', power: "STRONG!" },
        { superhero: 'Thor', power: "God of thunder" },
      ]);
    });
};
