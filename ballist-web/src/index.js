import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BallistCalc, RangeData} from './Ballist.js'
import {Load} from './Ballist.js'
//import {RangeData} from './Ballist.js'
//import App from './App';
import reportWebVitals from './reportWebVitals';

class Form extends React.Component {
  state = new Load();
  handleSubmit = async (event) => {
    event.preventDefault();  // disable default

    var bData = [];

    console.log('Calculating ballistics');

    var calc = new BallistCalc(this.state);

    for (var range = this.state.RangeIncrement; range <= this.state.MaxRange; range += this.state.RangeIncrement)
    {
      var ballistData = calc.GetBallisticsAtRange(range);
      bData.push(ballistData);

      if (1==0)  //turn on/off debug output
      {
        console.log("Distance: " + ballistData.Distance);
        console.log("Time of Flight: " + ballistData.TimeOfFlight);
        console.log("Velocity: " + ballistData.Velocity);
        console.log("Drop: " + ballistData.PointOfImact);
        console.log("Adjust MOA " + ballistData.AdjustMOA);
      }
    }
    this.props.onSubmit(bData);

    //this.setState( { userName: '' });
  }
  render() {    
    return (
      <center>
      <div class="container">
      <h3>Load Data</h3>
      <form onSubmit={this.handleSubmit} action="">

      <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Muzzle Velocity</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="Velocity" 
               value={this.state.MuzzleVelocity} 
               onChange={ event => this.setState({ MuzzleVelocity: event.target.value })} 
               required />
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label> Feet per Second</label>
      </div>
     </div>

     <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Ballistic Coefficient</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="BC" 
               value={this.state.BallisticCoefficient} 
               onChange={ event => this.setState({ BallisticCoefficient: event.target.value })} 
               required />
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label> G1</label>
      </div>
     </div>     

     <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Bullet Weight</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="BC" 
               value={this.state.BulletWeight} 
               onChange={ event => this.setState({ BulletWeight: event.target.value })} 
               required />
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label> Grains (7000 grains/lb)</label>
      </div>
     </div>     

     <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Sight-In Range</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="Range" 
               value={this.state.SightInRange} 
               onChange={ event => this.setState({ SightInRange: event.target.value })} 
               required />
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label>Yards (ex: 2.5" high at 100 yards)</label>
      </div>
     </div>     

     <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Sight-In Height</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="Hits" 
               value={this.state.SightInHeight} 
               onChange={ event => this.setState({ SightInHeight: event.target.value })} 
               required />
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label>Inches (ex: 2.5" high at 100 yards)</label>
      </div>
     </div>     

     <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Height of Sight Above Bore</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="Height" 
               value={this.state.SightHeight} 
               onChange={ event => this.setState({ SightHeight: event.target.value })} 
               required />
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label>Inches</label>
      </div>
     </div>     

     <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Max Range</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="Max" 
               value={this.state.MaxRange} 
               onChange={ event => this.setState({ MaxRange: event.target.value })} 
               required />
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label>Yards (furthest distance to calculate for)</label>
      </div>
     </div>     

     <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Range Increment</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="Increment" 
               value={this.state.RangeIncrement} 
               onChange={ event => this.setState({ RangeIncrement: event.target.value })} 
               required /> 
      </div>
      <div class="col-5" />
      <div class="col-25l">
        <label>Yards (ex: 50, 100, 150, 200, 250...)</label>
      </div>
     </div>     
<br />
<center>
    <button>Calculate</button>
     </center>

      </form>
      </div>
      </center>
    )
  }
}

const BallistList = (props) =>  (
<div>
    <center>  
    <table className='styled-table' >
      <thead>
        <th>Range<br />Yards</th>
        <th>Velocity<br />ft/s</th>
        <th>Energy<br />ft*lb</th>
        <th>TOF<br />s</th>
        <th>Drop<br />in</th>
        <th>Adjust<br />MOA</th>
        <th>Adjust<br />MRAD</th>
      </thead>
      <tbody>
        { props.ballisticData.map(brow => <BallistRow key = {brow.Distance} {...brow} />)}
      </tbody>        
    </table>  
  </center>      
</div>

)


class BallistRow extends React.Component {
  //{props.ballisticData.map(BallistRow => <BallistRow key = {BallistRow.Distance} {...BallistRow} />)}
  Format(num, digits)
  {
      var fac = (digits == 0 ? 1 : Math.pow(10, digits));
      return (Math.round(num * fac) / fac);
  }     

  render() {
    const brow = this.props; //testData[0];
    return (
      <tr className='tr-hover-class'>
        <td>
          {this.Format(brow.Distance, 0)}          
        </td>
        <td>
          {this.Format(brow.Velocity, 0)}
        </td>
        <td>
          {this.Format(brow.Energy, 0)}
        </td>
        <td>
          {this.Format(brow.TimeOfFlight, 3)}
        </td>
        <td>
          {this.Format(brow.PointOfImact, 1)}
        </td>
        <td>
          {this.Format((brow.AdjustMOA === "Infinity" ? "N/A":brow.AdjustMOA), 2)}        
        </td>
        <td>
          {this.Format((brow.AdjustMil === "Infinity" ? "N/A":brow.AdjustMil), 2)}        
        </td>
      </tr>
     );
   }
}

class App extends React.Component {
  state = {
    ballisticData: [],
  };   

  loadData = (ballistData) => {
    this.setState(this.state.ballisticData = ballistData);
  }
  
  render() {
    var ld = new Load();
    ld.MuzzleVelocity = 3200;
    ld.BallisticCoefficient = 0.431;
    ld.SightHeight = 2.0;
    ld.SightInRange = 100;
    ld.SightHeight = 1.5;
   
    return (
      <div>
        <center><h1><b>Ballistics Calculator</b></h1> </center>
        <table>
          <tr>
            <td width="3%"></td>
            <td width="40%" valign='top'>
              <Form onSubmit={this.loadData} /> 
            </td>  
            <td width="1%"></td>
            <td width="30%" valign='top' style={{ visibility: this.state.ballisticData.length == 0 ? "hidden" : "visible" }}>
            <div className='containerr'>
                <center><h3>Results</h3></center>
                <BallistList ballisticData={this.state.ballisticData}/>
              </div>
            </td>
            <td width="3%"></td>
          </tr>          
        </table>
      </div>

      )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App title = "Ballistics Calculator"/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
