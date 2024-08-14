import { Category } from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


const createCategory = asyncHandler(async(req, res) =>{

    try {

        const {name} = req.body
        // console.log(name);
        
        if (!name) {
            return res.json({error: "Name is required"})

        }

        const existingCategory = await Category.findOne({name})

        if (existingCategory) {
            return res.json({error: "This Category is already exists "})
        }
        
        const category = await Category.create({
            name
        })

        await  category.save()

        res.json(category)

        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
        
    }
}) 

const updateCategory = asyncHandler(async(req, res) => {
      try {

        const {name} = req.body
        const {categoryId} = req.params

        if (!name || !categoryId) {
            return res.json("Name and Id is required")
            
        }

        const existingCategory = await Category.findOne({name})

        if (existingCategory) {
            return res.json({error: "This Category is already exists "})
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {name:name},
            { new: true }
        )

        return res.json(updatedCategory);

        
      } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error")
      }
})

const deleteCategory = asyncHandler(async(req,res) => {
    try {
        const {categoryId} = req.params
    
        if (!categoryId) {
            return res.status("CategoryId is not avaialble")
        }
    
        const deleteCategory = await Category.findByIdAndDelete(
            categoryId
        )
 
        return res.json( "Category deleted successfully..");

    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error while deleteing")
    }


})

const listCategory = asyncHandler(async(req, res) => {
    try {

        const all = await Category.find({})
        res.json(all)
        
    } catch (error) {
        console.log();
        return res.status(500).json("Internal server error while fetching category")
    }
    
})

const getCategoryById = asyncHandler(async(req, res) => {
    try {

        const getcategorybyId  = await Category.findOne({_id: req.params.id})
        res.json(getcategorybyId)
        
    } catch (error) {
        console.log();
        return res.status(500).json("Internal server error ")
        
    }
})

export {createCategory,updateCategory, deleteCategory, listCategory, getCategoryById}