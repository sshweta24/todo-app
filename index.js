const express = require ('express');
const path = require('path');
const port = 8001;
const app = express();



const db = require('./config/mongoose');
const Contact = require('./models/contact');
//setting up view engine 
app.set('view engine', 'ejs');
app.set('views', './view');




app.get('/',function(req,res){
    Contact.find({},function(err, contacts){

            if (err){ 
                console.log('error in fetching contacts');
                return;
            }

            return res.render('home',{
                title: "Contact List",
                // contact_list: contactlist
                contact_list:Contact
    });

    });

})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
    console.log(__dirname,);
    res.send('<h1>hellooo there!!<h1>');
});

app.get('/', function(req, res){

        return res.render('home',{
            title: "Contact List",
            // contact_list: contactlist
            contact_list:Contact
        });
    
});


app.post('/create-Contact',function(req,res){
Contact.create({
    category: req.body.category,
    datee : req.body.datee,
    desc: req.body.desc
    },
    function(err,newContact){
    if(err){console.log('error in creating contact');
    return; }
    console.log('***', newContact);
    return res.redirect('back');
});

});

app.listen(8000, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', 8000);
})
