import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {bulletData} from './Bullets.js';
import {BallistCalc, RangeData} from './Ballist.js'
import {Load} from './Ballist.js'
//import {RangeData} from './Ballist.js'
//import App from './App';
import reportWebVitals from './reportWebVitals';

class Form extends React.Component {
  state =  new Load();
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
  }

  closeBulletBox()
  {
    this.setState( {ShowBulletPicker:false});
  }

  getDropdowns()
  {
    //const unique = [...new Set(bulletData.map(item => item.Caliber))];
    this.setState( { Calibers: [...new Set(bulletData.map(item => item.Caliber))] } );
    this.setState( { Brands: [...new Set(bulletData.map(item => item.Manufacturer))] } );
    var bc = document.getElementById("BCbox").getBoundingClientRect();
    const bbb1 = document.getElementById("Bulletbox").getBoundingClientRect();  
    const bb = document.getElementById("Bulletbox");

    //console.log(bb);

    //console.log("BCR "+ bc.right);
    console.log("BB1 t/b "+bbb1.top+' -- '+bbb1.bottom);
    

    //bb.style.position = "absolute";
    
    this.setState({l: bc.right + 20, t: bc.top - (bbb1.height/2)});

    //bb.style.left = (4 * bc.right.toString) + "px"; // bc.right; // 2000;// bc.style.left + bc.offsetWidth; //+ bc.width;
    //bb.style.top = bc.top.toString + "px"; //(bc.top+bc.bottom); ///2;
    const bbb2 = document.getElementById("Bulletbox").getBoundingClientRect();    
    console.log("BB2 t/b "+bbb2.top+' -- '+bbb2.bottom);    
    this.setState( { ShowBulletPicker:true }); 
   }

   setCaliber(cal)
   {
      this.setState({ Caliber: cal });
      this.getBullets(cal, this.state.Brand);
   }

   setBrand(brand)
   {
    this.setState({ Brand: brand });
    this.getBullets(this.state.Caliber, brand);
   }

   getBullets(cal, brand)
   {
    var brandBullets = (brand == "" ? bulletData : bulletData.filter(({ Manufacturer }) => Manufacturer.includes(brand)));
    this.setState( { Bullets: (cal == "" ? brandBullets : brandBullets.filter(({ Caliber }) => Caliber.includes(cal))) });   
    //console.log(bullets);

   }

  render() {   
    return (
      <center>
      <div class="container">
      <h3>Load Data</h3>
      <form onSubmit={this.handleSubmit} action="">

      <div id="Bulletbox" class="bulletPicker" style={{ visibility: (this.state.ShowBulletPicker == true ?  "visible" : "hidden"), left: this.state.l, top: this.state.t }}>
       <center><h3>Bullet Picker</h3></center>
       <div class="row">
        <div className="col-15">
          <label><b>Caliber</b></label> 
        </div>
        <div className="col-35">
          <select onChange={ event => this.setCaliber(event.target.value) }>
          <option selected="selected" disabled="disabled">Choose Caliber...</option>
            {this.state.Calibers.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
       </div>

       <div class="row">
        <div className="col-15">
          <label><b>Brand</b></label> 
        </div>
        <div className="col-35"> 
          <select onChange={ event => this.setBrand(event.target.value) }>
          <option selected="selected" disabled="disabled">Choose Brand...</option>
            {this.state.Brands.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </div>
        </div>

        <div class="row">
        <div className="col-15">
          <label><b>Bullet</b></label> 
        </div>
        <div className="col-75"> 
          <select onChange={ event => this.setState({ BallisticCoefficient: this.state.Bullets[event.target.value].BC, BulletWeight: this.state.Bullets[event.target.value].Weight, ShowBulletPicker: false }) }>
          <option selected="selected" disabled="disabled">Choose Bullet...</option>
            {this.state.Bullets.map((option, index) => (
              <option value={index}>{(this.state.Caliber == "" ? option.Caliber+ ' cal ': '') + (this.state.Brand == "" ? option.Manufacturer+ ' ': '') + option.Bullet+' '+option.Weight+' Grain ' +option.BC+' BC'}</option>
            ))}
          </select>
        </div>
        </div>
<br />
      </div>      

      <div class="row">
      <div class="col-25" />
      <div class="col-25">
        <label><b>Muzzle Velocity</b></label>
      </div>
      <div class="col-10">
      <input type="text" placeholder="Velocity" 
               value={this.state.MuzzleVelocity} 
               onChange={ event => this.setState({ MuzzleVelocity: event.target.value })}
               onFocus={ event => this.closeBulletBox() }
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
      <input type="text" id="BCbox" 
               value={this.state.BallisticCoefficient} 
               onChange={ event => this.setState({ BallisticCoefficient: event.target.value })} 
               onFocus={ event => this.getDropdowns() }
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
               onFocus={ event => this.closeBulletBox() }
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
               onFocus={ event => this.closeBulletBox() }
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
               onFocus={ event => this.closeBulletBox() }
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
               onFocus={ event => this.closeBulletBox() }
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
               onFocus={ event => this.closeBulletBox() }
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
               onFocus={ event => this.closeBulletBox() }
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
        <center><h1><font color='#dddddd'><b>Ballistics Calculator</b></font></h1> </center>
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
