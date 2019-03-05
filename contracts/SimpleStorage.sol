pragma solidity ^0.4.0;

contract SimpleStorage {
   

   //Check for data
   //0-->new user
   //1->user already exists  
   //2->for logging out the user
   
   mapping(string=>string) private user_data;
   mapping(string=>string) private logindata;
   mapping(string=>uint) private data_checker;
   mapping (string=>uint) private activeUsers;
   
   
   function compareStrings (string a, string b) view returns (bool){
       return keccak256(a) == keccak256(b);
   }

   function check_user(string username) public returns (bool){

      if(data_checker[username]!=0)
      return true;
      else
      return false;

   }
    
   function signup(string username,string password,string data)
       public returns(bool){
       
       if(data_checker[username]!=0) return false;
       
       user_data[username] = data;
       
       data_checker[username]=1;
       logindata[username]=password;
       
       return true;
   }
   
   function login(string username,string password) public returns(bool){
       if(data_checker[username]==0){
           return false;
       }
       else if(compareStrings(logindata[username],password)){
           activeUsers[username]=1;//Here the user is logged in and 
                                   //we are saving it as 1    
           return true;            
       }
       else{
           return false;
       }
   }
   
   function logout(string username) public returns(bool){
       if(activeUsers[username]==1){//Check If the user is already loogged in
           activeUsers[username]=2;//assign another variable for logging out
           return true;            
       }
       else{
           return false;
       }

       
   }
   
   function display_data(string username) view public returns(string)
                                                              
                                                              
       {
           return (user_data[username]);
       }                                                       
                                                                  
                                                              
   
}