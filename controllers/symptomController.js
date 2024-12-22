// controllers/symptomController.js
const User = require('../models/User'); // Assuming User has a symptoms array

const addSymptom = async (req, res) => {
    try {
        console.log(req.body); // Log form data
    
        const { date, symptom, severity, allergyType } = req.body;
        const userid=req.session.userId;
        const user = await User.findById(userid);
        if (!user) {
            console.error('User not found:', req.session.userId);
            return res.status(401).send('User not found.');
        }

        console.log('User found:', user);

        user.symptoms.push({ date, symptom, severity, allergyType });
        await user.save();

        console.log('Symptom added successfully');
        res.redirect('/profile');
    } catch (error) {
        console.error('Error adding symptom:', error);
        res.status(500).send('Error adding symptom.');
    }
};


module.exports = { addSymptom };
