var router=require('express').Router();
const con=require('../models/dbconnection.js');
var dateFormat = require('dateformat');
router.get('/check/:id',(req,res)=>{

     
    var query="Select * from member where tagID="+'"'+req.params.id+'"'
    con.connection.query(query, function(err, result) {

        if (err) res.status(500).json({'error':err});
       
        else { 
            var authorized=true;
            if(result.length==0) authorized=false;
            var logQuery="insert into log(timestamp,tagID,authorized) values("+'"'+dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")+'"'+",'"+req.params.id+"',"+authorized +");"            
            con.connection.query(logQuery, function(err) {
            
                if (err) res.status(500).json({'error':err});
               
                else {
                    if (result.length==0) res.status(400).json({'access':false})
            
                    else res.status(200).json({'access':true});
                        
                   
                }
                  });
        
        
                 


           
        }
          });


});

router.post('/',(req,res)=>{

member={
    name:req.body.name,
    lastName:req.body.lastName,
    sex:req.body.sex,
    birthday:req.body.birthday
}

var query='SELECT * FROM log    ORDER BY timestamp DESC LIMIT 1';


con.connection.query(query, function(err, result) {

    if (err) res.status(500).json({'error':err});
    
   
    else {
    member.tagID=result[0].tagID;
    var postQuery="insert into member Values("+"'"+member.tagID+"',"+"'"+member.name+"',"+"'"+member.lastName+"',"+"'"+member.sex+"',"+"'"+member.birthday+"')"
    con.connection.query(postQuery, function(err, member) {

        if (err) res.status(500).json({'error':err});
       
        else {
            if (result.length==0) res.status(400).json({'status':'no drugs'})
            
            else res.status(200).json({'member':member});
        }
          });



    }
      });

    });
 router.get('/logs/:timestamp',(req,res)=>{
  var query ="select lastName,name,sex,birthday,timestamp from  log l  inner join  member m on (l.tagID=m.tagID) and  timestamp> '"+req.params.timestamp+"'  ORDER BY timestamp DESC";
  
  con.connection.query(query, function(err, result) {

    if (err) res.status(500).json({'error':err});
   
    else { 
       res.status(200).json({log:result})
    }
      });

})   ;









module.exports=router;