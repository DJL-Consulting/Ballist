import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {bulletData} from './Bullets.js';
import {BallistCalc, RangeData} from './Ballist.js'
import {Load} from './Ballist.js'
import reportWebVitals from './reportWebVitals';

class Form extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = new Load();
    var nm = [];
    
    nm = this.get_cookies();

    this.state.Loads = nm;
  }

  get_cookies()
  {
    var keyValuePairs = document.cookie.split(';');
    var names = [];
    for(var i = 0; i < keyValuePairs.length; i++) {
        names.push(keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('=')));
        var value = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
    }
    return names;
  }

  setCookie(cname, cvalue) {
    console.log("Saving "+cname);
    const d = new Date();
    d.setTime(d.getTime() + (10000*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  deleteCookie = (e) => {
    e.preventDefault();
    //e.preventDefault();  // disable default
    console.log("Deleting "+this.state.Name);
    document.cookie = this.state.Name+"=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    this.setState({Loads: this.get_cookies()});
  }

  getCookie(cname) {
    var keyValuePairs = document.cookie.split(';');
    for(var i = 0; i < keyValuePairs.length; i++) {
        if (keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('=')) === cname)
          return keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
    }

    return "";
  }

  async getLoad(name) {
    let ck = this.getCookie(name);
    var nl = JSON.parse(ck);

    nl.Loads = this.get_cookies();

    await this.setState(nl);

    this.NameChanged(name);
  
    this.loadBallist();    
  }

  loadBallist()
  {
    if (!(parseInt(this.state.MaxRange) > parseInt(this.state.RangeIncrement)))
    {
       alert("Max range must be greater than increment!");
       return;
    }
    
    if (typeof this.state.Name !== 'undefined' && this.state.Name != "")
    {
      this.state.Brands = [];
      this.state.Calibers = [];
      this.state.Bullets = [];
      this.state.Loads = [];

      this.setCookie(this.state.Name, JSON.stringify(this.state));

      this.setState({ Loads: this.get_cookies()});
    }

    var bData = [];

    var calc = new BallistCalc(this.state);

    for (var range = parseInt(this.state.RangeIncrement); range <= parseInt(this.state.MaxRange); range += parseInt(this.state.RangeIncrement))
    {
      var ballistData = calc.GetBallisticsAtRange(range);
      bData.push(ballistData);
    }
    this.props.onSubmit(bData);
  }

  handleSubmit = async (event) => {
    event.preventDefault();  // disable default
    this.loadBallist();
  }

  NameChanged(newName){
    var gc = this.getCookie(newName);
    this.setState({ Name: newName, ShowDelete: (this.getCookie(newName) !== "") });
  }

  closeBulletBox()
  {
    this.setState( {ShowBulletPicker:false});
  }

  getDropdowns()
  {
    this.setState( { Calibers: [...new Set(bulletData.map(item => item.Caliber))] } );
    this.setState( { Brands: [...new Set(bulletData.map(item => item.Manufacturer))] } );

    var bc = document.getElementById("BCbox").getBoundingClientRect();
    const bbb1 = document.getElementById("Bulletbox").getBoundingClientRect();  

    this.setState({l: bc.right + 20, t: bc.top - (bbb1.height/2)});   
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
   }

  render() {   
    return (
      <center>
      <div class="container">
                           
      <form onSubmit={this.handleSubmit} action="">
      
      <h3>Load Data</h3>
      
      <div class="row">
      <div class="col-25" />
      <div class="col-25">
          <label><b>Saved Loads</b></label> 
        </div>        
        <div className="col-55">
          <select onChange={ event => this.getLoad(event.target.value) }>
              <option selected= {this.state.Name == "" ? "selected":""} disabled="disabled">Choose Saved Load...</option>
                {this.state.Loads.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
        </div>
      <div class="col-10">
        <button onClick={this.deleteCookie} className="small" style={{ visibility: (this.state.ShowDelete == true ?  "visible" : "hidden") }}>Delete</button>
      </div>

      </div>
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
          <option selected= {this.state.Brand == "" ? "selected":""} disabled="disabled">Choose Brand...</option>
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
          <select onChange={ event => this.setState({ 
                                            BallisticCoefficient: this.state.Bullets[event.target.value].BC, 
                                            BulletWeight: this.state.Bullets[event.target.value].Weight, 
                                            ShowBulletPicker: false,
                                            SelectedBullet: this.state.Bullets[event.target.value].Caliber + " " + this.state.Bullets[event.target.value].Manufacturer + " "+this.state.Bullets[event.target.value].Bullet}) }>
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
        <label> G1 <i>{this.state.SelectedBullet}</i></label>
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

     <div class="row" style={{ visibility: (this.state.Loads.length > 0 ?  "visible" : "hidden") }}>
      <div class="col-25" />
      <div class="col-25">
        <label><b>Load Name</b></label>
      </div>
      <div class="col-55">
      <input type="text" placeholder="Optional name to save load for future use" 
               value={this.state.Name} 
               onChange={ event => this.NameChanged(event.target.value) } 
               onFocus={ event => this.closeBulletBox() } /> 
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
