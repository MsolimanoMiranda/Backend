import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';
export default {
add: async(req,res,next)=>{
    try{

    	req.body.password = await bcrypt.hash(req.body.password,10);
    	const reg = await models.Usuario.create(req.body);
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}

},
query:async(req,res,next)=>{

	  try{

    	 const reg = await models.Usuario.findOne({_id:req.query._id});

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
		const reg = await models.Usuario.find(
		{$or:[{'nombre':new RegExp(valor,'i')},{'num_documento':new RegExp(valor,'i')}]},{createAt:0}).sort({'nombre':1});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
update:async(req,res,next)=>{
	  try{

	  	let pass=req.body.password;
	  	if(pass.length<64){ req.body.password = await bcrypt.hash(req.body.password,10); } 	
    	const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre,rol:req.body.rol,tipo_documento:req.body.tipo_documento,
    																		  num_documento:req.body.num_documento,direccion:req.body.direccion,telefono:req.body.telefono,
    																		  email:req.body.email,password:req.body.password});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
remove:async(req,res,next)=>{
	try{

    	const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
activate:async(req,res,next)=>{
	try{


    	const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
    	res.status(200).json(reg);

    		

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
desactivate:async(req,res,next)=>{
	try{

    	const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
    	res.status(200).json(reg);

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

},
login:async(req,res,next)=>{
	try{

    	let user= await models.Usuario.findOne({email:req.body.email});
    	if(user){
    		let match= await bcrypt.compare(req.body.password,user.password);
    		if(match){
    			
    			let tokenReturn= await token.encode(user._id);
    			res.status(200).json({user,tokenReturn});
    		}else{
    			res.status(404).send({message:'Password Incorrecto'});
    		}	

    	}else{
    		res.status(404).send({message:'No Existe el usuario'});
    	}
    

	}catch(e){
		res.status(500).send({ message:'Ocurrio un error'});
		next(e);
	}	

}



}


