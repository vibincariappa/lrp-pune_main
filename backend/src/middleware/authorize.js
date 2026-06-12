const authorize = (...roles) => {

    return (req,res,next)=>{

        if(!req.admin){
            return res.status(401).json({ message: "Unauthorized" });
        }

        if(
            !roles.includes(
                req.admin.role
            )
        ){

            return res.status(403).json({
                message:"Forbidden"
            });

        }

        next();

    };

};

module.exports = authorize;