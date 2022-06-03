const nodemailer = require("nodemailer");
const Mailgen=require("mailgen")

require("dotenv").config()

let transporter=nodemailer.createTransport({
    service:"gmail",
    secure:true,
   
    auth:{

        user: process.env.EMAIL,
        pass:process.env.E_PASS
     
    } 
 
});

//////////////////////  /account verification

const Registermail=async(email_user,token)=>{
    try {
        let mailG=new Mailgen({
            theme:"default",
            product:{
                name:"luxurytransport",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

const email={
    body:{
    name:email_user,
    intro: "Welcome to luxurytransport! we\'re very excited to has you on board",
    action:{
        instructions:"Please click below to verify your account",
        button:{
            color:"#1a73e8",
            text:"account activation link",
            link:`${process.env.SITE_DOMAIN}verification?t=${token}`
        }
    }
    ,outra:"your need any help?"
    }

};
let emailbody=mailG.generate(email) ;
  let message={
      from:process.env.EMAIL,
      to:email_user,
      subject:"Welcome to luxurytransport",
      html:emailbody

  }  

  await transporter.sendMail(message) ;
  return true 

        
    } catch (error) {
        
    }
}
/////////////////////
const RegisterDriver=async(email_user,token)=>{
    try {
        let mailG=new Mailgen({
            theme:"default",
            product:{
                name:"luxurytransport",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

const email={
    body:{
    name:email_user,
    intro: "Welcome to luxurytransport! we\'re very excited to has you on board",
    action:{
        instructions:"Please click below to verify your account",
        button:{
            color:"#1a73e8",
            text:"account activation link",
            link:`${process.env.SITE_DOMAIN}verifydriver?t=${token}`
        }
    }
    ,outra:"your need any help?"
    }

};
let emailbody=mailG.generate(email) ;
  let message={
      from:process.env.EMAIL,
      to:email_user,
      subject:"Welcome to luxurytransport",
      html:emailbody

  }  

  await transporter.sendMail(message) ;
  return true 

        
    } catch (error) {
        
    }
}

const Resetpass=async(email_user,token)=>{
    try {
        let mailG=new Mailgen({
            theme:"default",
            product:{
                name:"luxurytransport service",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

const email={
    body:{
    name:email_user,
    intro: "we  are sorry for the stress",
    action:{
        instructions:"Please click below to reset your password",
        button:{
            color:"#1a73e8",
            text:"password reset link",
            link:`${process.env.SITE_DOMAIN}passwordresetpage?t=${token}`
        }
    }
    ,outra:"you need any help?"
    }

};
let emailbody=mailG.generate(email) ;
  let message={
      from:process.env.EMAIL,
      to:email_user,
      subject:"Password Reset",
      html:emailbody

  }  

  await transporter.sendMail(message) ;
  return true 

        
    } catch (error) {
        
    }
}
/////////////////////////////////////////////
const Contactmail=async (emails,msg)=>{
    try {
        let mailG=new Mailgen({
            theme:"default",
            product:{
                name:"luxurytransport",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

const email={
    body:{
     intro:[
         "someone went a msg",
         `Email:${emails}`,
        
     ],
     outro:[`${msg}`]
    }
} 
  let emailbody=mailG.generate(email) ;
  let message={
      from:process.env.EMAIL,
      to:`${emails}`,
      subject:"Contact message",
      html:emailbody

  }  
  await transporter.sendMail(message) ;
  return true 

    } catch (error) {
        if(error){
           
        }
        
    }
}


/////////send email
const sendmail=async (contact)=>{
    try {
        let mailG=new Mailgen({
            theme:"default",
            product:{
                name:"luxurytransport",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

const email={
    body:{
     intro:[
        
         `Email:${contact.email}`,
         `firstname:${contact.firstname}`,
         `lastname:${contact.lastname}`
     ],
     outro:[`${contact.message}`]
    }
} 
  let emailbody=mailG.generate(email) ;
  let message={
      from:`${process.env.EMAIL}`,
      to:`${contact.email}`,
      subject:"Contact message",
      html:emailbody

  }  
  await transporter.sendMail(message) ;
  return true 

    } catch (error) {
        if(error){
            console.log(error)
        }
        
    }
}
const Refundticket=async (contact,detail)=>{
    try {
        let mailG=new Mailgen({
            theme:"default",
            product:{
                name:"luxurytransport",
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });

const email={
    body:{
     intro:[
        
         `Email:${contact.email}`,
         `Username:${contact.username}`,
         `Fullname:${contact.firstname +"  " +contact.lastname}`,
         `Ticket number:${detail.busNumber}`,
         `Ticket id:${detail._id}`
         

     ],
     outro:[`${detail.message}`]
    }
} 
  let emailbody=mailG.generate(email) ;
  let message={
    from:`${contact.email}`,
      to:`${process.env.EMAIL}`,
    
      subject:`TICKET CANCELLATION`,
      html:emailbody

  }  
  await transporter.sendMail(message) ;
  return true 

    } catch (error) {
        if(error){
          
        }
        
    }
}
module.exports={Contactmail,RegisterDriver, Registermail,Resetpass,Refundticket}