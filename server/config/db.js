const mongoose =require('mongoose')
mongoose.connect("mongodb+srv://admin:admin@cluster0.xw575.mongodb.net/proshop?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the database"))
	.catch(err => console.log("Something went wrong when connecting to the database", err));
