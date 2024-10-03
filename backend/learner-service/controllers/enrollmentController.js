require('dotenv').config()
const Enrollment = require('../models/enrollmentModel')
const mongoose = require('mongoose')


const stripe = require('stripe')(process.env.STRIPE_SECRET)



// get all enrollments
const getEnrollments = async (req, res) => {

    const enrollments = await Enrollment.find()

    res.status(200).json(enrollments)
}

// get all my enrollments
const getMyEnrollments = async (req, res) => {
  const {id} = req.params
  console.log('ididid',id)

  const enrollments = await Enrollment.find({ uid: id })
  console.log('enenenen',enrollments)

  res.status(200).json(enrollments)
}

const getEnrollment = async (req, res) => {
    const { uid, cid } = req.params;
    console.log(uid, cid);

    
    try {
        const enrollment = await Enrollment.findOne({ uid, cid });

        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.status(200).json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// create new enrollment
const createUserEnroll = async (req, res) => {

    const courseDetails = req.body;
    const { cid, uid } = req.body;
    console.log(courseDetails);

    const customer = await stripe.customers.create({
        metadata: {
            uid: uid,
            cid: cid
        }
    });
    try {
        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: courseDetails.title,
                            metadata: {
                                uid: uid,
                                cid: cid
                            }
                        },
                        unit_amount: courseDetails.amount * 100,
                    },
                    quantity: 1,
                },
            ],
            customer: customer.id,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        });

        // Return the session ID to the client
        res.json({ id: session.id });
        

        // Note: We don't create the enrollment document here; it will be created in the success handler below
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}






// delete a enrollment
const deleteEnroll = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such enrollment'})
    }

    const enroll = await UserEnroll.findOneAndDelete({_id: id})

    if (!enroll) {
        return res.status(404).json({error: 'No such enrollment'})
    }

    res.status(200).json(enroll)
}






module.exports = {
    getEnrollments,
    getMyEnrollments,
    getEnrollment,
    createUserEnroll,
    deleteEnroll,
    // handleCheckoutSuccess
}