
const express = require('express');     // return a function
const app = express();                  // return an object

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json());

const courses = [];

// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/', (req, res) => {
    res.send("Welcome In LMS");

});

app.get('/web/students/create', (req, res) => {
    res.sendfile('./StudentLMS.html')
});

app.get('/web/courses/create', (req, res) => {
    res.sendfile('./CourseLMS.html')
});

// api/courses/1 to get course of id 1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    res.send(course);
});


// Add course
app.post('/api/courses', (req, res) => {

    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code,
        description: req.body.description
    };
    courses.push(course);
    res.send(course);
});


// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }


    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    course.code = req.body.code;
    course.description = req.body.description;
    res.send(course);
});


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});



const students = [];

// to get all courses
app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }
    res.send(student);
});

// Add course
app.post('/api/students', (req, res) => {

    // create a new course object
    const student = {
        id: students.length + 1,
        name: req.body.name, // assuming that request body there's a name property
        code: req.body.code,
    };
    students.push(student);
    res.send(student);
});


// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    student.name = req.body.name;
    student.code = req.body.code;
    res.send(student);
});


// Deleting a course
app.delete('/api/students/:id', (req, res) => {
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(student);
});



// Environment variable
const port = process.env.PORT || 3000

app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);

