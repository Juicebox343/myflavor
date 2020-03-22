const bodyParser	= require('body-parser'),
methodOverride      = require('method-override'), 
expressSanitizer    = require('express-sanitizer'),
express             = require('express'),
app                 = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(expressSanitizer());
app.use(require('express-session')({ secret: 'chloe and milo are very good girls', resave: false, saveUninitialized: false }));
app.use(methodOverride('_method'));

//requiring routes
const indexRoutes = require('./routes/index'),  
	  accountRoutes = require('./routes/user'),
	  itemRoutes = require('./routes/item');

app.use("/", indexRoutes);
app.use("/:id", accountRoutes);
app.use('/:id/items', itemRoutes);

app.listen(process.env.PORT || 3000, () => console.log('The My Flavor server has started'));
