var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var cors        = require('cors');
var bodyParser  = require('body-parser');
var logger      = require('morgan');

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/asignaturas');

var StudentSchema = mongoose.Schema({
    name: String,
    address: String,
    phones: {
        home: String,
        work : String
    },
    subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'subjects'}]
});
var Student = mongoose.model('students', StudentSchema);

var SubjectSchema = mongoose.Schema({
    name: String,
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'students'}],
    when: String
});
var Subject = mongoose.model('subjects', SubjectSchema);

app.get('/api/subjects', function(req, res) {
    Subject.find(req.query,function(err, subjects) {
        if(err) {
            res.send(err);
        }
        res.json(subjects);

    });
});


app.get('/api/subjects/:id', function(req, res) {
    var o_id = new mongoose.Types.ObjectId(req.params.id);
    Subject.findOne({_id: o_id}).populate("students").exec(function(err, subject) {
        if(err) {
            res.send(err);
        }
        res.send(subject);
    });

});

app.get('/api/students', function(req, res) {
  Student.find(req.query,function(err, subjects) {
    if(err) {
      res.send(err);
    }
    res.json(subjects);
  });
});

app.get('/api/students/:id', function(req, res) {
  var o_id = new mongoose.Types.ObjectId(req.params.id);
  Student.findOne({_id: o_id}).populate("subjects").exec(function(err, subject) {
    if(err) {
      res.send(err);
    }
    res.send(subject);
  });

});

/*
app.post('/api/subjects/:id/students', function(req, res) {
    Student.create({
        name: req.body.name,
        address: req.body.address
    }, function(err, student) {
        if(err) {
            res.send(err);
        }
        console.log("Student creado");
        Subject.findOne({_id: req.params.id}, function(err, subject) {
            subject.students.push(student);
            subject.save(function(err, data){
                if(err) {
                    res.send(err);
                }
                res.send(student);
            });
        })
    })
})
*/

app.use(express.static('public'));
app.use('/', express.static('public/views'));

// Escucha en el puerto 2709 y corre el server
app.listen(2709, function() {
    console.log('App listening on port 2709');
});
