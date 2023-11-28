<<<<<<< Updated upstream
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import CourseRoute from "./routes/CourseRoute.js";
import UserRouter from "./routes/UserRouter.js";
import QuestionRouter from "./routes/QuestionRoute.js";

import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));

=======
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import CourseRoute from './routes/CourseRoute.js';
import UserRouter from './routes/UserRouter.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import { UserModel } from './models/UserModel.js';
import bcrypt, { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';


const app = express();
  
>>>>>>> Stashed changes
app.use(bodyParser.json());

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Nhom5");
});

<<<<<<< Updated upstream
app.use("/course", CourseRoute);
app.use("/user", UserRouter);
app.use("/api", QuestionRouter);
=======
app.use('/course', CourseRoute);
app.use('/user', UserRouter);

>>>>>>> Stashed changes

// Connect to database
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


// new 

var salt = bcrypt.genSaltSync(10);

app.post('/register', async (req,res)=>{
      console.log(req.body)
      try {
        await UserModel.create({
          name: req.body.name,
          email:req.body.email,
          password: bcrypt.hashSync(req.body.password, salt)
        })
        res.json({status: 'ok'})
      } catch (error) {
        res.json({status: 'error',error})
      }
})

app.post('/login', async (req, res) => {
  try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (user) {
          // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
          const isMatch = await bcrypt.compare(req.body.password, user.password);
          if (isMatch) {
              const token = jwt.sign({
                  name: user.name,
                  email: user.email,
              }, 'secret123');

              return res.json({ status: 'ok', user: token });
          } else {
              return res.json({ status: 'error', user: false, message: 'Mật khẩu không đúng' });
          }
      } else {
          return res.json({ status: 'error', user: false, message: 'Không tìm thấy người dùng' });
      }
  } catch (error) {
      return res.json({ status: 'error', user: false, message: 'Đã xảy ra lỗi' });
  }
});


app.get('/user', async (req, res) => {
  try {
    // Lấy dữ liệu từ MongoDB
    const userData = await UserModel.findOne({email});
    if (!userData) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    // Trả về dữ liệu người dùng (bao gồm name, email, và password)
    const { name, email, password } = userData;
    res.json({ name, email, password });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi trong quá trình lấy dữ liệu' });
  }
});





// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }
//     const userDoc = await UserModel.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: bcrypt.hashSync(password, salt) 
//     });

//     res.json(userDoc);  
//   } catch (e) {
//     console.log(e);
//     res.status(500).json(e); // Sử dụng status 500 cho các lỗi server không xác định
//   }
// });

  
//   const secret = 'adsasASOJ123Alakjsd1321'

//   app.post('/login', async (req,res)=> {
//     const {name, email, password} =  req.body
//     const userDoc = await UserModel.findOne({email})
//     const passOk = bcrypt.compareSync(password, userDoc.password)
//     if(passOk){
//         jwt.sign({name, id:userDoc._id}, secret, {}, (err, token) => {
//             if (err){
//               throw err;
//             } else {
//               res.cookie('token', token).json('ok')
//             }
//         })
//     }else{
//       res.status(400)
//     }
//   })

//   app.get('/user', (req,res)=>{
//     const {token} = req.cookies;
//     jwt.verify(token, secret, {}, (err,info) => {
//       if (err) throw err;
//       res.json(info);
//     });
//   })