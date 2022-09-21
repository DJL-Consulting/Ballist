import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '/node_modules/bootstrap/dist/css/bootstrap.css'
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'
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
    //this.state.DisplayLoad = "";
  }

  get_cookies()
  {
    var keyValuePairs = document.cookie.split(';');
    var names = [];
    for(var i = 0; i < keyValuePairs.length; i++) {
        if (keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('=')) != '__test')
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

  doNothing = (e) => {
    //e.preventDefault();
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
    nl.DisplayLoad = name;

    await this.setState(nl);

    await this.setState({Name: name, DisplayLoad: name});

    this.loadBallist();    
  }

  async loadBallist()
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
      this.state.DisplayLoad = this.state.Name;

      await this.setCookie(this.state.Name, JSON.stringify(this.state));

      await this.setState({ Loads: this.get_cookies()});

      //this.NameChanged(this.state.Name);
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

  closeBulletBox()
  {
    this.setState( {ShowBulletPicker:false});
  }

  getDropdowns()
  {
    this.setState( { Calibers: [...new Set(bulletData.map(item => item.Caliber))] } );
    this.setState( { Brands: [...new Set(bulletData.map(item => item.Manufacturer))] } );

    if (window.innerWidth < 1000)
    {
      var bc = document.getElementById("BCbox").getBoundingClientRect();
      const bbb1 = document.getElementById("Bulletbox").getBoundingClientRect();  

      this.setState({l: bc.left + 20, t: 0 });   
      this.setState( { ShowBulletPicker:true }); 
    }
    else
    {
      var bc = document.getElementById("BCbox").getBoundingClientRect();
      const bbb1 = document.getElementById("Bulletbox").getBoundingClientRect();  

      this.setState({l: bc.right + 20, t: bc.top - (bbb1.height/2)});   
      this.setState( { ShowBulletPicker:true }); 
    }


    
    //var options = {};
    //var myModal = new bootstrap.Modal(document.getElementById('BulletPicker'), options);
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
      <div className="container containerLight">
                           
      <form onSubmit={this.handleSubmit} action="">

  
    <div id="Bulletbox" className="bulletPicker " style={{ visibility: (this.state.ShowBulletPicker == true ?  "visible" : "hidden"), left: this.state.l, top: this.state.t }}>
      <div class="modal-body">
       <div className="container containerDark">
        <div className="row mb-2 ">
          <div className="col-sm-3 text-sm-end text-white">
            <label htmlFor="cal" className="form-label">Caliber</label> 
          </div>
          <div className="col-sm-9">
            <select id="cal" className="form-select" onChange={ event => this.setCaliber(event.target.value) }>
            <option selected="selected" disabled="disabled">Choose Caliber...</option>
              {this.state.Calibers.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-sm-3  text-sm-end text-white">
            <label htmlFor="brnd" className="form-label">Brand</label> 
          </div>
          <div className="col-sm-9"> 
            <select id="brnd" className="form-select" onChange={ event => this.setBrand(event.target.value) }>
            <option selected= {this.state.Brand == "" ? "selected":""} disabled="disabled">Choose Brand...</option>
              {this.state.Brands.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>
          </div>

          <div className="row mb-2">
          <div className="col-sm-3 text-sm-end text-white">
            <label htmlFor="blt" className="form-label">Bullet</label> 
          </div>
          <div className="col-sm-9 text-begin"> 
            <select id="blt" className="form-select" onChange={ event => this.setState({ 
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
        </div>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default text-white" onFocus={ event => this.closeBulletBox() }><b>Close</b></button>
      </div>

      </div>    

      <h3>Load Data</h3>
      
      <div className="row mb-2">
        <div className="col-sm-4 text-sm-end">
            <label htmlFor="savedLoads" className="form-label">Saved Loads</label> 
        </div>        
        <div className="col-sm-6">
          <select id="savedLoads" className="form-select" value={this.state.DisplayLoad != '' ? this.state.DisplayLoad : "Choose Saved Load..."} onChange={ event => this.getLoad(event.target.value) }>
              <option>Choose Saved Load...</option>
                {this.state.Loads.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
        </div>
        <div className="col-sm-2 text-start">
          <button onClick={this.deleteCookie} className="btn btn-warning btn-sm">Delete</button>
        </div>
      </div>
                  

      <div className="row mb-2">
        <div className="col-sm-4 text-sm-end">
          <label htmlFor="mv" className="form-label">Muzzle Velocity</label> 
        </div>
        <div className="col-sm-2">
          <input type="text" id="mv" className="form-control" placeholder="Velocity" 
                  value={this.state.MuzzleVelocity} 
                  onChange={ event => this.setState({ MuzzleVelocity: event.target.value })}
                  onFocus={ event => this.closeBulletBox() }
                  required />
        </div>
        <div className="col-sm-5 text-start">
          <span className="align-middle">Feet per Second</span>
        </div>
     </div>

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="BCbox" className="form-label">Ballistic Coefficient</label>
      </div>
      <div className="col-sm-2">
      <input type="text" id="BCbox" className="form-control" 
               value={this.state.BallisticCoefficient} 
               onChange={ event => this.setState({ BallisticCoefficient: event.target.value })} 
               onFocus={ event => this.getDropdowns() }
               required />
      </div>
      <div className="col-sm-5 text-start">
         <span className="align-middle">G1 <i>{this.state.SelectedBullet}</i></span>
      </div>
     </div>     

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="bw" className="form-label">Bullet Weight</label>
      </div>
      <div className="col-sm-2">
      <input type="text" id="bw" className="form-control" placeholder="BW" 
               value={this.state.BulletWeight} 
               onChange={ event => this.setState({ BulletWeight: event.target.value })} 
               onFocus={ event => this.closeBulletBox() }
               required />
      </div>
      <div className="col-sm-5 text-start">
        <span className="align-middle">Grains</span>
      </div>
     </div>     

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="sr" className="form-label">Sight-In Range</label>
      </div>
      <div className="col-sm-2">
      <input type="text" id="sr" className="form-control" placeholder="Range" 
               value={this.state.SightInRange} 
               onChange={ event => this.setState({ SightInRange: event.target.value })} 
               onFocus={ event => this.closeBulletBox() }
               required />
      </div>
      <div className="col-sm-5 text-start">
        <span className="align-middle">Yards (ex: 2.5" high at 100 yards)</span>
      </div>
     </div>     

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="sh" className="form-label">Sight-In Height</label>
      </div>
      <div className="col-sm-2">
      <input type="text" id="sh" className="form-control" placeholder="Hits" 
               value={this.state.SightInHeight} 
               onChange={ event => this.setState({ SightInHeight: event.target.value })} 
               onFocus={ event => this.closeBulletBox() }
               required />
      </div>
      <div className="col-sm-5 text-start">
        <span className="align-middle">Inches (ex: 2.5" high at 100 yards)</span>
      </div>
     </div>     

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="h" className="form-label">Sight Above Bore</label>
      </div>
      <div className="col-sm-2">
      <input type="text" id="h" className="form-control" placeholder="Height" 
               value={this.state.SightHeight} 
               onChange={ event => this.setState({ SightHeight: event.target.value })} 
               onFocus={ event => this.closeBulletBox() }
               required />
      </div> 
      <div className="col-sm-5 text-start">
        <span className="align-middle">Inches</span>
      </div>
     </div>     

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="mr" className="form-label">Max Range</label>
      </div>
      <div className="col-sm-2">
      <input type="text" id="mr" className="form-control" placeholder="Max" 
               value={this.state.MaxRange} 
               onChange={ event => this.setState({ MaxRange: event.target.value })} 
               onFocus={ event => this.closeBulletBox() }
               required />
      </div>
      <div className="col-sm-6 text-start">
        <span className="align-middle">Yards (furthest distance to calculate for)</span>
      </div>
     </div>     

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="ri" className="form-label">Range Increment</label>
      </div>
      <div className="col-sm-2">
      <input type="text" id="ri" className="form-control" placeholder="Increment" 
               value={this.state.RangeIncrement} 
               onChange={ event => this.setState({ RangeIncrement: event.target.value })} 
               onFocus={ event => this.closeBulletBox() }
               required /> 
      </div>
      <div className="col-sm-5 text-start">
        <span className="align-middle">Yards (ex: 50, 100, 150, 200, 250...)</span>
      </div>
     </div> 

     <div className="row mb-2">
      <div className="col-sm-4 text-sm-end">
        <label htmlFor="ln" className="form-label">Load Name</label>
      </div>
      <div className="col-sm-7">
      <input type="text" id="ln" className="form-control" placeholder="Optional name to save load for future use" 
               value={this.state.Name} 
               onChange={ event => this.setState({ Name: event.target.value}) } 
               onFocus={ event => this.closeBulletBox() } /> 
      </div>
     </div>              
    <div class="row mb-2">
      <center>
        <button className='w-100 btn btn-primary btn-lg'>Calculate</button>
      </center>          
    </div>

      </form>
      </div>
      </center>
    )
  }
}

const BallistList = (props) =>  (
<div className='table-responsive-smrrr'>
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
      <div className="container-main">
        <center><h2><font color='#dddddd'>Ballistics Calculator</font></h2> </center>
        <div className="container containerLight">
          <div className="row mb-2">
            <div className="col-xl-6">
              <Form onSubmit={this.loadData} /> 
            </div>

            <div className="col-xl-6" style={{ visibility: this.state.ballisticData.length == 0 ? "hidden" : "visible" }}>
                  <center><h3>Results</h3></center>
                  <BallistList ballisticData={this.state.ballisticData}/>
            </div>
          </div>
        </div>
        <br />
        <br />

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
