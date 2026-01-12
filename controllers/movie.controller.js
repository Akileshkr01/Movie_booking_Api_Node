   const Movie = require('../models/movie.model');
/**
 * controller function to create a new movie
 * @param {*} req 
 * @param {*} res 
 * @returns movie created 
 */

     
   const createMovie = async(req,res)=>{
    try{
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success: true,
            error:{},
            data: movie,
            message:'Successfully created a new movie',
        });
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error: err.message,
            data: {},
            message: 'Something went wrong',
        });


    }

   };
   module.exports = {
     createMovie 
   };