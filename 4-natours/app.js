const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next)=> {
    console.log('Hello from the middleware');
    next(); // superImportant use next in all of your middlewares
});

app.use((req, res, next)=> {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


// 2. ROUTE HANDLERS

const getTours = (req, res)=> {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }});
}

const getTour =  (req, res)=> {
    try {
        const id = req.params.id * 1; // a number string multiplied by himself will return a Number;
        const tour = tours.find(el => el.id === id);
        
        //if (id > tours.length) {
        if (!tour){
            return res.status(404).json({
                status: "fail",
                message: "Invalid ID"
            })
        }
        
    
        res.status(200).json({
            status: "success",
            id,
            data: {
                tour
            }
        });
        
    } catch (error) {
        console.log(error);
        throw new error;
    }
    
    
    
}

const createTour =  (req, res)=> {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    });
}

const updateTour =  (req , res)=> {
    if (req.params.id * 1 > tours.length ){
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            tour: '<Updated tour here...>'
        }
    })
}
const deleteTour =  (req , res)=> {
    if (req.params.id * 1 > tours.length ){
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        });
    }
    
    res.status(204).json({
        status: "success",
        data: null
    });
};

const getUsers = (req, res) => {

    res.status(500).json({
        status: 'error',
        message: 'THis route is not yet define'
    })
}

const createUser = (req, res) => {

    res.status(500).json({
        status: 'error',
        message: 'THis route is not yet define'
    })
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'THis route is not yet define'
    })
};

const updateUser = (req, res) => { 
    res.status(500).json({
        status: 'error',
        message: 'THis route is not yet define'
    })
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'THis route is not yet define'
    })
};
// 3. ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter
.route('/')
.get(getTours)
.post(createTour);

tourRouter.route('/:id')
.get(getTour)
.delete(deleteTour)
.patch(updateTour);

userRouter.route('/')
.get(getUsers)
.post(createUser);

userRouter.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

// 4. START SERVER

const port = 3000;
app.listen(port, ()=> {
    console.log(`App running on port ${port}...`);
});

