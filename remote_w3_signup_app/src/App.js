import React,{useState} from "react";

function App() {
  const [Name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [showInfo,setShowInfo] = useState('');

  const styleForm = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

  const handleSubmit = (event) => {
    event.preventDefault();


    let res = fetch('http://3.218.196.210:3001/users',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": Name, 
        "email": email, 
        "password": password
      })
    }).then(response => {
        const result = response.text();
        //console.log(result);
        result
          .then(body => { 
          //console.log("body",body)
          try{
            const bodyInfo = JSON.parse(body);
            const userInfo = JSON.stringify(bodyInfo.data.user);
            //console.log(userInfo)
            setShowInfo(userInfo);
          } catch (error) {
            console.error("error : ",body);
            setShowInfo(body);
          }
          
          })
          .catch(error => console.error(error));
   
      })
      .catch(error => console.error(error));
  };
  return (

    <form style={styleForm} onSubmit={event=>handleSubmit(event)}>
      <div>
        <label>name:</label>
        <input 
          type = 'text' 
          name = "Name"
          value = {Name}
          onChange = {(event)=>setName(event.target.value)} 
          required/>
      </div>
      <div>
        <label>email:</label>
        <input 
          type = 'text'
          name = "email"
          value = {email}
          onChange = {(event)=>setEmail(event.target.value)} 
          required/>
      </div>
      <div>
        <label>password:</label>
        <input 
          type = 'password'
          name = "password"
          value = {password}
          onChange = {(event)=>setPassword(event.target.value)} 
          required/>
      </div>
      <div>
        <input type = 'submit' />
      </div>
      <div>
        {showInfo}
      </div>
    </form>





  );
}

export default App;

