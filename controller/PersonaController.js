import models from '../models';

export default {
add: async(req,res,next)=>{
    try{

    
    	const reg = await models.Persona.create(req.body);
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}

},
query:async(req,res,next)=>{

	  try{

    	 const reg = await models.Persona.findOne({_id:req.query._id});

    	 if(!reg){
    	 	res.status(404).send({ message:'El registro no existe'});
    	 }else{

    	 	res.status(200).json(reg);
    	 }

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}		

},
list:async(req,res,next)=>{
	try{
		let valor=req.query.valor;
		const reg = await models.Persona.find(
		{$or:[{'nombre':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}]},{createAt:0}).sort({'nombre':1});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
listClientes:async(req,res,next)=>{
	try{
		let valor=req.query.valor;
		const reg = await models.Persona.find(
		{$or:[{'nombre':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}],'tipo_persona':'Cliente'},{createAt:0}).sort({'nombre':1});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
listProveedores:async(req,res,next)=>{
	try{
		let valor=req.query.valor;
		const reg = await models.Persona.find(
		{$or:[{'nombre':new RegExp(valor,'i')},{'email':new RegExp(valor,'i')}],'tipo_persona':'Proveedor'},{createAt:0}).sort({'nombre':1});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
update:async(req,res,next)=>{
	  try{

	  	let pass=req.body.password;
    	const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre,tipo_persona:req.body.tipo_persona,tipo_documento:req.body.tipo_documento,
    																		  num_documento:req.body.num_documento,direccion:req.body.direccion,telefono:req.body.telefono,
    																		  email:req.body.email});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
remove:async(req,res,next)=>{
	try{

    	const reg = await models.Persona.findByIdAndDelete({_id:req.body._id});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
activate:async(req,res,next)=>{
	try{


    	const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{estado:1});
    	res.status(200).json(reg);

    		

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
desactivate:async(req,res,next)=>{
	try{

    	const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{estado:0});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

}



}


