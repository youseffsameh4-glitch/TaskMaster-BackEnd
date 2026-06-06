const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync');

// create todo
const createTodo = catchAsync(async (req, res, next) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
        return res.status(400).json({ message: 'برجاء كتابة العنوان' });
    }        

    const newTodo = await prisma.todo.create({
        data: {
            title,
            description,
            userId: userId  
        }
    });

    res.status(201).json({
        status: 'success',
        data: newTodo // 👈 تعديل: بعتنا الـ todo مباشرة جوه data عشان الفرونت إند يلقطها فوراً
    });
});

// get todos
const getAllTodos = catchAsync(async(req, res, next) => {
    const userId = req.user.id;
    
    const todos = await prisma.todo.findMany({
        where: { userId } 
    });

    res.status(200).json({
        status: 'success',
        results: todos.length,
        data: todos // 👈 التعديل السحري: بعتنا المصفوفة مباشرة جوه الـ data عشان الـ forEach تشتغل فوراً!
    });    
});

// update todo
const updateTodo = catchAsync(async(req, res, next) => {
    const {id} = req.params;
    const {isCompleted, title, description} = req.body;

    const updatedTodo = await prisma.todo.update({
        where: {id: parseInt(id) ,
        userId : userId
    },
        data: {isCompleted, title, description}
    });
    res.status(200).json({
        status: 'success', data: updatedTodo 
    });
});

// delete todo
const deleteTodo = catchAsync(async(req, res, next) =>{
    const {id} = req.params;
    // to make sure we are using the id that comes from the auuth middleware(token)
    const userId = req.user.id;

    const deletedTodo = await prisma.todo.deleteMany({
        where:{id: parseInt(id),
        userId : userId
        }
    });

    // لو مفيش حاجة اتمسحت، ممكن نبعت خطأ 404
    if (deletedTodo.count === 0) {
        return next(new Error('No todo found with that ID or not authorized'));
    }

    res.status(204).json({
        status: 'success', data: null});
    });
 
// mark a todo as comleted
const markCompleted = catchAsync(async(req, res, next) => {
    const {id} = req.params;

    const completedTodo = await prisma.todo.update({
        where: { id: parseInt(id), userId:req.user.id },
        data: {
            status: 'completed',
            isCompleted: true
        }
    });

    res.status(200).json({
        status: 'success', data: completedTodo
    });
})    

//btw this is a free server and i made a tunnel from my labtop so the only way to see the website i have to open the labtob and server if u want to inform me other than that u can check the physical code on github.

module.exports = {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
    markCompleted
};