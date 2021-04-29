import Login from './Login.js';
import {useState} from 'react';
import './App.css';

//import { BrowserRouter as Router,Switch,Route, Link} from "react-router-dom";

function Activity(){
  
    const [inputList, setInputList] = useState([{ activityName: "", amount: "", participants: ""  }]);
    const [showbtn, setShowBtn] = useState(true);
    
          // get all the users in the trip from the database
  function splitMoney(){
    console.log('heres the inputlist passed',inputList)
    // var mtLst;
    // for (const [index, value] of inputList[index].participants.entries()) {
    //   console.log('trying for loop ',value);
    // }
    // console.log('mtlst here ',mtLst)
    if (inputList[0].participants !== ""){
      var lst = (inputList[0].participants.split(/[ ,]+/));
      console.log(lst)
      if(inputList[0].amount !== ""){
        var splitAmount = (inputList[0].amount)/lst.length;
        console.log("split amount is ",splitAmount);
        return(
          <div>Money split per person is {splitAmount}</div>
          );
      }
    }
  }
    
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
      console.log(list)
      console.log(list[index])
    
      if (list[index].activityName !== "" && list[index].amount !== "" && list[index].participants !== "")
        {setShowBtn(false);}
        
      splitMoney();
      // list.map((list,index)=>{ 
      //   if (list[index].activityName !== "" && list[index].amount !== "" && list[index].participants !== "")
      //   {setShowBtn(false);}
      // });
      
    };
     
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
     
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { activityName: "", amount: "", participants: "" }]);
    };
    
    return (
      <div className="Activity">
      <h3>Your Activities for the trip:</h3>
        {inputList.map((x, i) => {
          return (
            <div className="box">
              <input
                required
                type="text"
                
                name="activityName"
                className="ml10"
                placeholder="Enter Activity Name"
                value={x.activityName}
                onChange={e => handleInputChange(e, i)}
              />
              <input
                required
                type="text"
                name="amount"
                className="ml10"
                placeholder="Enter Amount"
                value={x.amount}
                onChange={e => handleInputChange(e, i)}
              />
              <input
                required
                type="text"
                className="ml101"
                name="participants"
                placeholder="Participant Email#1, Email#2,.."
                value={x.participants}
                onChange={e => handleInputChange(e, i)}
              />
              <div className="btn-box">
                {inputList.length !== 1 && <button
                  className="mr10"
                  
                  onClick={() => handleRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button onClick={handleAddClick} disabled={showbtn} >Add</button>}
                
              </div>
             
            </div>
            
          );
        })}
        
        {console.log(inputList)}
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        
      </div>
    );
}

export default Activity;
