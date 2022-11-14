const crypto= require(`crypto`);

const generatePassword=(password)=>{
    let salt= crypto.randomBytes(32).toString(`hex`);
    let hash= crypto.pbkdf2Sync(password,salt,10000,64,`sha512`).toString(`hex`);
    return{
        hash:hash,
        salt:salt
    }
}
const validPassword=(password,salt,hash)=>{
    let genhash=crypto.pbkdf2Sync(password,salt,10000,64,`sha512`).toString(`hex`);
    if(genhash===hash){
        return true;
    }else{
        return false;
    }

}
module.exports={generatePassword,validPassword};
