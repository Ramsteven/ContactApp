require('dotenv').config();
const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://contactapp-723e0.firebaseio.com/'
});

const db = admin.database();


router.get('/',(req, res) =>{
    db.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { contacts : data });
    })
})

// add route
router.post('/new-contact',(req,res) => {
    console.log(req.body)
    const newContact = {
        firtsName : req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    }

    db.ref('contacts').push(newContact)
    res.redirect('/');
});

// delete route
router.get('/delete-contact/:id', (req,res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
})

module.exports = router;