const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync');

const protect = catchAsync(async (req, res, next) => {
    let token;
    // 1) Getting token and check of it's there
 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];}
 
    // if there is no tken kick him out
 if (!token) {
    return res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });}
 
 // 2) Verification
 try{
 //check the secret stamp   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 // check if the user still exists on the db
    const currentUser = await prisma.user.findUnique({
    where:{ id: decoded.id }
 });

 if (!currentUser) {
    return res.status(401).json({ message: 'The user belonging to this token does no longer exist.' });}
 
 // extendin the req to the next level
    req.user = currentUser;
    next();
 }catch (error) {
 // if the token is not valid or fabricated the catch will get it
     return res.status(401).json({message: 'your token is not valid!'});
 }   
})
 
module.exports = {protect};// we exported it so we can call it in routes