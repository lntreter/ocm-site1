import db from '../config/db.config.js';
const userSchema = db.userSchema;
 
// Post a userSchema
(req, res) => {  
  // Save to MySQL database
  userSchema.create({  
    fullname: req.body.fullname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    correctionPassword: req.body.correctionPassword
  }).then(userSchema => {    
    // Send created userSchema to client
    res.send(userSchema);
  });
};
 
// FETCH all userSchemas
export function findAll(req, res){
  userSchema.findAll().then(userSchemas => {
    // Send all userSchemas to Client
    res.send(userSchemas);
  });
};
 
// Find a userSchema by Id
export function findById(req, res){  
  userSchema.findById(req.params.id).then(userSchema => {
    res.send(userSchema);
  })
};
 
// Update a userSchema
export function update(req, res){
  const id = req.params.userSchemaId;
  userSchema.update( { fullname: req.body.fullname, email: req.body.email, phoneNumber: req.body.phoneNumber, password: req.body.password, correctionPassword: req.body.correctionPassword },
           { where: {id: req.params.id} }
           ).then(() => {
           res.status(200).send("updated successfully a userSchema with id = " + id);
           });
};
 
// Delete a userSchema by Id
export function dlt(req, res){
  const id = req.params.id;
  userSchema.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).send('deleted successfully a userSchema with id = ' + id);
  });
};

export default db;