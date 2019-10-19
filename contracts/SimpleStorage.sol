pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
   

   //Check for data
   //0-->new user
   //1->user already exists  
   //2->for logging out the user
   
   mapping(string=>string) private user_data;
   mapping(string=>string) private logindata;
   mapping(string=>uint) private data_checker;
   mapping (string=>uint) private activeUsers;
   mapping (string=>string[]) private organizaionToUserMap;
   mapping(string=>string[]) private userOrganization;
   
   struct OrganizationStruct {
   string organizationName;
   bool isAllowedCity;
   bool isAllowedAge;
   }
   mapping(string=>OrganizationStruct[]) OrganizationToUserMaps;
   
   OrganizationStruct orgStruct;
 
 function fetch_organizations(string username) view public returns(OrganizationStruct[]){
     
     return OrganizationToUserMaps[username];
     
     
 }
 
 
  function register_organization(string username, string organizationName,bool isAllowedCity,bool isAllowedAge)  public returns(bool)
                                                              
                                                              
       {
           
            OrganizationStruct[] t =OrganizationToUserMaps[username];
      
           for(uint i=0;i<t.length;i++){
          if(compareStrings(t[i].organizationName,organizationName)){
              t[i].isAllowedCity=isAllowedCity;
              t[i].isAllowedAge=isAllowedAge;
              return true;
           }
         }
           
           orgStruct.organizationName=organizationName;
           orgStruct.isAllowedCity=isAllowedCity;
           orgStruct.isAllowedAge=isAllowedAge;
           OrganizationToUserMaps[username].push(orgStruct);
           return true;
       } 
    string[] private organizations;

  function displays() view returns(string[] ){
      return organizations;
  }
  
  
   
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
       
       
       
       function setOrganisation( string data) public returns(bool){
           organizations.push(data);
       }
         
      function fetchOrganization() view public returns(string[])
                                                              
                                                              
       {
          return organizations;
       }         
       
                                                              
}