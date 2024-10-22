const nodemailer = require('nodemailer');
const gmailid = process.env.sample.GMAIL_ID;
const gmailpassword = process.env.sample.GMAIL_PASSWORD;

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: gmailid,  // Replace with your email
    pass: gmailpassword,  // Replace with your email password
  },
});

/**
 * Send email reminder to the patient
 * @param {Object} appointmentDetails - Appointment information including doctor, patient, and time
 */
const sendReminder = (appointmentDetails) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: appointmentDetails.patientEmail,
    subject: 'Appointment Reminder',
    text: `Dear ${appointmentDetails.patientName},\n\nThis is a reminder for your appointment with Dr. ${appointmentDetails.doctorName} on ${appointmentDetails.date} at ${appointmentDetails.time}.\n\nLocation: ${appointmentDetails.location}.\n\nThank you!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reminder:', error);
    } else {
      console.log('Reminder sent: ' + info.response);
    }
  });
};

module.exports = sendReminder;
