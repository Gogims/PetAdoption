import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
//  import keenImage from '../assets/keen.png';

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function toCelsius(fahrenheit){
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius){
  return (celsius * 9 / 5) + 32;
}

class TemperatureInput extends React.Component{
  constructor(props){
    super(props);

    this.onChangeValue = this.onChangeValue.bind(this);
  }

  onChangeValue(e){
    this.props.onTemperatureChange(e.target.value);
  }

  render(){
    return (
      <div>
        <input value={this.props.temperature} onChange={this.onChangeValue}/>
      </div>
    );
  }
}

class Calculator extends React.Component{
  constructor(props){
    super(props);

    this.state={
      temperature: 0,
      scale: 'c'
    }

    this.onFahrenheitChange = this.onFahrenheitChange.bind(this);
    this.onCelsiusChange = this.onCelsiusChange.bind(this);
  }  

  onFahrenheitChange(fahrenheit){
    this.setState({
      temperature: fahrenheit,
      scale: 'f'
    });
  }

  onCelsiusChange(celsius){
    this.setState({
      temperature: celsius,
      scale: 'c'
    });
  }

  render(){
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale == 'c' ? temperature : tryConvert(temperature, toCelsius);
    const fahrenheit = scale == 'f' ? temperature : tryConvert(temperature, toFahrenheit);

    return(
      <div>
        <label>Fahrenheit</label>
        <TemperatureInput temperature={fahrenheit} onTemperatureChange={this.onFahrenheitChange} />
        <label>Celsius</label>
        <TemperatureInput temperature={celsius} onTemperatureChange={this.onCelsiusChange} />
        <BoilingVerdict celsius={celsius}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator/>,
  document.getElementById('root')
);
