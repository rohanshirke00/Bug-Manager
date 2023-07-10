const router = require("express").Router()

// import bug model
const bugModel = require("../models/bugs")


// create
router.post("/api/bug", async (req, res) => {
    try {
        const newBug = new bugModel({
            bugName:req.body.name,
            bugStatus:req.body.status,
            bugLocation:req.body.location,
            bugDescription:req.body.description,
            bugPriority:req.body.priority
        })
        console.log(newBug)
        const saveBug = await newBug.save()
        res.status(200).json(saveBug)
    } catch (error) {
        console.log(error)
    }
})


// get (Read)
router.get("/api/bug", async (req, res) => {
    try {
        // getting all bugs from databsse
        const allBugs = await bugModel.find({})
        res.status(200).json(allBugs)
    } catch (error) {
        console.log(error)
    }
})


// update (Modify)
router.put("/api/bug/:id", async (req, res) => {
    try {
        // finding the bug with its id to update it
        const updateBug = await bugModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    bugName:req.body.name,
                    bugStatus:req.body.status,
                    bugLocation:req.body.location,
                    bugDescription:req.body.description,
                    bugPriority:req.body.priority
                }
            }
        )
        res.status(200).json("Bug updated successfully")
    } catch (error) {
        console.log(error)
    }
})


// delete (remove)
router.delete("/api/bug/:id", async (req, res) => {
    try {
        // finding the bug with its id to update it
        const updateBug = await bugModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Bug Deleted successfully")
    } catch (error) {
        console.log(error)
    }
})



//export the router
module.exports = router;