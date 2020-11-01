
import React from 'react'
import './style.scss';
var $ = require( "jquery" )


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: "0",
      formula: "",      
      result: '',
    }
   this.handleNumberInput = this.handleNumberInput.bind(this);
   this.initialize = this.initialize.bind(this);
   this.handleOperatorInput = this.handleOperatorInput.bind(this);
   this.calc = this.calc.bind(this);
   this.handleDecimal = this.handleDecimal.bind(this); 
 
  }
  componentDidMount(){
    $('button').on("click", function(){
      $(this).animate({opacity: 0.5}, 60 );
      $(this).animate({opacity: 1}, 60);
      
      
    })
    
  }
  
  calc(e){
    let formula = this.state.formula;
    var oper, val, res = 0;
    
    oper = formula.match(/^[^0-9.]+/);
    
    if(oper === null){
      formula = '+'.concat(formula);
    }
    
    var operationList = formula.match(/[^0-9.]+([0-9.]+)/g);
      
    for ( let i = 0 ; i < operationList.length ; i++ ){
      oper = operationList[i].match(/[^0-9.]+/);
      oper = oper[0]
      val = operationList[i].match(/[0-9.]+/);
      val = val[0]
      
       /*parse value*/
      if (/\./g.test(val)){
       val = parseFloat(val)
      } else {
        val = parseInt(val)
      }
      
       /* prepare operator in case there are several of them and the last one is minus (-) */
      if (oper.length > 1 && oper.charAt(oper.length - 1) === '-'){
        val = -val;  
        oper = oper.charAt(oper.length - 2);
      } else {
        oper = oper.charAt(oper.length - 1)
      }
      
       switch ( oper ){
          case 'x':
            res = res * val;
            break;
          case '/':
            res = res / val;
            break;
          case '+':                   
           res += val;         
            break;
          case '-':
            res -= val;
            break;
          default: 
            res = "Nan";
            break;
        }
    }
    
   
      this.setState({
        formula: this.state.formula.concat('='),
        input: res
      })
    
}
  
  handleOperatorInput(e){
    if ( /\d/g.test(this.state.input) ){
      this.setState({
        input: e.target.innerText,
        formula: this.state.formula.concat(e.target.innerText)
      });
    } else {
      this.setState({
        input: this.state.input.concat(e.target.innerText),
        formula: this.state.formula.concat(e.target.innerText)
      })
    }
  }
  
  /*prevent input two dots*/
  handleDecimal(e){    
    
    var input = this.state.input;
    var dots = input.match(/\./g)
    
    if (dots === null ){
      this.setState({
        input: this.state.input.concat(e.target.innerText),
        formula: this.state.formula.concat(e.target.innerText)
      });      
    }     
  }
  
  /*when number is input*/
  handleNumberInput(e){
    
    /*this is first input or if result is displayed on the screen*/
    if( this.state.input === '0' || this.state.input === this.state.result ){
       this.setState({
          input: e.target.innerText,
          formula: (e.target.innerText)
         });
    } else if (/[x/+-]/g.test(this.state.input)){
      /* if input was operator change it to value*/
      this.setState({
        input: e.target.innerText,
        formula: this.state.formula.concat(e.target.innerText)
      })
    } else {
      /* if input was number append next input to input */
      this.setState({
        input: this.state.input.concat(e.target.innerText),
        formula: this.state.formula.concat(e.target.innerText)
      });
    } 
  }
  
  /* set all values to the initial mode*/
  initialize(){
    this.setState({
      input: "0",
      formula: "",
      result: 0,
    });
  }
  render(){
    return (
      <div id="calculator">
        <div id="calcScreen">
          <div id="formula">{this.state.formula}</div>
          <div id="display">{this.state.input}</div>          
        </div>    
        <Keyboard 
          handleNumberInput={this.handleNumberInput}
          initialize={this.initialize}
          handleOperatorInput={this.handleOperatorInput}
          calc={this.calc}
          handleDecimal={this.handleDecimal}
          />
      </div>
    )
  }
}

/* render buttoms*/
class Keyboard extends React.Component {
  render(){
    return (
      <div id="keyboard">
        <button id="clear" onClick={this.props.initialize}>c</button>
        <button id="multiply" onClick={this.props.handleOperatorInput}>x</button>
        <button id="divide" onClick={this.props.handleOperatorInput}>/</button>
        <button id="subtract" onClick={this.props.handleOperatorInput}>-</button>
        <button id="add" onClick={this.props.handleOperatorInput}>+</button>
        <button id="one" onClick={this.props.handleNumberInput}>1</button>
        <button id="two" onClick={this.props.handleNumberInput}>2</button>
        <button id="three" onClick={this.props.handleNumberInput}>3</button>
        <button id="four" onClick={this.props.handleNumberInput}>4</button>
        <button id="five" onClick={this.props.handleNumberInput}>5</button>
        <button id="six" onClick={this.props.handleNumberInput}>6</button>
        <button id="seven" onClick={this.props.handleNumberInput}>7</button>
        <button id="eight" onClick={this.props.handleNumberInput}>8</button>
        <button id="nine" onClick={this.props.handleNumberInput}>9</button>
        <button id="zero" onClick={this.props.handleNumberInput}>0</button>
        <button id="decimal" onClick={this.props.handleDecimal}>.</button>
        <button id="equals" onClick={this.props.calc}>=</button>        
      </div>
    )    
  }
}


export default App;