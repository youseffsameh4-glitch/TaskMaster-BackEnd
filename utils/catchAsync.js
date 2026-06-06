/////btw this is a free server and i made a tunnel from my labtop so the only way to see the website i have to open the labtob and server if u want to inform me other than that u can check the physical code on github.

module.exports = (fn) => {return (req, res, next)=>{

     fn (req, res, next).catch(next);
    };
};