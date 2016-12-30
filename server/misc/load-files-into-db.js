var sqlite3 = require('sqlite3');
var fs = require('fs');
var _ = require('underscore');

var name = 'workouts.db';

var db = new sqlite3.Database(name);

var data = fs.readFileSync('workouts.csv', 'utf-8').split('\n');
data = _.map(data, function(e) {
  return e.trim().split(',');
});

var nameMapping = {
  'Handstands': 'hs',
  'Rings HS': 'rhs',
  'Handstand Pushups': 'hspushups',
  'Rings HSPU': 'rhspu',
  'Press': 'press',
  'Press Handstands': 'presshs',
  'Rings Press HS': 'rpresshs',
  'Straight Arm Press HS': 'sapresshs',
  'Manna': 'manna',
  'Back Lever': 'bl',
  'Front Lever': 'fl',
  'FL Rows': 'flrow',
  'Rows': 'row',
  'Pull-ups': 'pullup',
  'R Pull-ups + OAC': 'rpullup',
  'Weighted Pull-ups': 'weightedpullup',
  'Explosive Pull-ups': 'explosivepullup',
  'Iron Cross': 'ironcross',
  'Planche (PB/FL)': 'planche',
  'Rings Planche': 'rplanche',
  'PB/FL PL Pushups': 'planchepushup',
  'Rings PL Pushups': 'rplanchepushup',
  'Pushups': 'pushup',
  'One Arm Pushups': 'oapushup',
  'Dips': 'dip',
  'Ring Dips': 'rdip',
  'Weighted Dips': 'weighteddip',
  'Muscle-ups / Inverted MUs': 'muscleup',
  'Elbow Levers': 'el',
  'Flag': 'flag',
  'Ab Wheel': 'abs',
  'Rings Full Statics': 'rstatic',
  'Rings Kip Skills': 'rkip',
  'Rings Felge Skills': 'rfelge',
  'Squats': 'squats'
};

var obj = [];
var level;
for (let i = 1; i < data.length; i++) {
  for (let j = 1; j < data[0].length; j++) {
    if (data[i][j] !== '') {
      var exercise = {
        level: parseInt(data[i][0], 10),
        progression: nameMapping[data[0][j]],
        name: data[i][j]
      }
      exercise.eid = exercise.progression + '_' + exercise.level;
      exercise.prerequisites = ((i-1 !== 0) && data[i-1][j] !== '') ? exercise.progression + '_' + (exercise.level - 1) : undefined
      obj.push(exercise);
    }
  }
}
console.log(obj[50])

db.serialize(function() {
  db.run("CREATE TABLE EXERCISES (eid TEXT, level INTEGER, progression TEXT, name TEXT, prerequisites TEXT)");

  var stmt = db.prepare("INSERT INTO EXERCISES VALUES (?, ?, ?, ?, ?)");
  obj.forEach(function(e) {
    stmt.run(e.eid, e.level, e.progression, e.name, e.prerequisites);
  })

  stmt.finalize();

  db.run("CREATE TABLE NAMEMAPPING (key TEXT, value TEXT)");

  var stmt = db.prepare("INSERT INTO NAMEMAPPING VALUES (?, ?)");
  _.each(nameMapping, function(v, k) {
    stmt.run(v, k);
  });

  stmt.finalize();

});

db.close();