const express = require("express");
const stripe = require("stripe")(
    "sk_test_51IAt6pAAyZfOP4WHS8kOaAsqKJ96HmsqQcuKgIjN0zmgjvRxEqqogvWLfO4F8Pkl8mYFzA56VjPqQPes9NArbZx900jcB4jK4F"
);
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

//Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(`${__dirname}/public`));
// app.use('/public', express.static(path.join(__dirname, 'public')));

//SuccesRoute
app.get("/success", (req, res) => {
    res.render("success");
});

//IndexRoute
app.get("/", (req, res) => {
    res.render("index");
});

//Charge Route
app.post("/charge", (req, res) => {
    // const amount = 1280;
    console.log(req.body);
    res.render("success");
});

app.get("/contact", (req, res) => {
    // const amount = 1280;
    // console.log(req.body);
    res.render("contact");
});
app.get("/product", (req, res) => {
    // const amount = 1280;
    // console.log(req.body);
    res.render("product");
});
app.get("/read", (req, res) => {
    // const amount = 1280;
    // console.log(req.body);
    res.render("read");
});
//Nodemailer
// app.get('/', (req, res) => {
//     res.send('Hello');
// });

app.post("/ajax/email", function(request, response) {
    // response.json({ message: "email function not implemented!!!" });
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "modijihrohan@gmail.com", // this should be YOUR GMAIL account
            pass: "arremodiji", // this should be your password
        },
    });
    var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} SUBJECT: ${request.body.subject} MESSAGE: ${request.body.message}`;
    // var htmlBody = `<h2>Message Request From Decorum Interior</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
    var htmlBody = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${request.body.name}</li>
      <li>Email: ${request.body.email}</li>
      <li>Subject: ${request.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${request.body.message}</p>
  `;

    var mail = {
        // from: "rohancfsf@gmail.com", // sender address
        from: '"Customer Contact" <modijihrohan@gmail.com>', // sender address
        to: "rohancfsf@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
        subject: "Mail From L.K. Enterprises", // Subject line
        text: textBody,
        html: htmlBody,
    };
    transporter.sendMail(mail, function(err, info) {
        if (err) {
            console.log(err);
            response.json({
                message: "message not sent: an error occured; check the server's console log",
            });
        } else {
            response.json({ message: `message sent: ${info.messageId}` });
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});