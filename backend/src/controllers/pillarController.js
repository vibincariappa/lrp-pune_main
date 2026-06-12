const pillarService =
require("../services/pillarService");

const getAllPillars =
async (req,res,next)=>{
    try{
        const pillars =
            await pillarService.getAllPillars();
        
        res.status(200).json({
            success: true,
            data: pillars
        });
    }catch(error){
        next(error);
    }
};

const updatePillar =
async (req,res,next)=>{

    try{

        const pillar =
            Number(req.params.id);

        if (isNaN(pillar)) {
            return res.status(400).json({
                success: false,
                message: "Pillar ID must be a valid number"
            });
        }

        const { key, value } =
            req.body;

        const updated = await pillarService.updatePillar(
            pillar,
            key,
            value
        );

        res.status(200).json({
            success: true,
            message: "Pillar updated successfully",
            data: updated
        });

    }catch(error){

        next(error);

    }

};

module.exports = {
    getAllPillars,
    updatePillar
};