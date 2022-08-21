  import {g1} from './g1.js';  

  const g = 32.1740485564;
    
  export class Load {
    MuzzleVelocity = 3200;
    BallisticCoefficient = 0.431;
    SightInHeight = 2.5;
    SightInRange = 100;
    SightHeight = 1.5;
    BulletWeight = 180;
    MaxRange = 1000;
    RangeIncrement = 50;
    ShowBulletPicker = false;
    Caliber = "";
    Brand = "";
    Calibers = [];
    Brands = [];
    Bullets = [];
    l = 200;
    t = 200;
  }
  
  export class RangeData {
    Distance = 200;
    Velocity = 3200;
    TimeOfFlight = 0.032;
    PointOfImact = 1.23;
    AdjustMOA = 1.33;
    AdjustMil = 0.58;
    Energy = 3122;
  
    constructor(distance) {
      this.Distance = distance;
    }
  }
  
  
  export class BallistCalc {
    Vo = 0.0;
    C = 0.0;
    Dy = 0.0;
    Dx = 0.0;
    Hs = 0.0;
    Bw = 0.0;
    p = 0.0;
    Po = 0.0;
    sinthea = 0.0; 
    costheta = 0.0;
    Vx = 0.0;
    Vy = 0.0; 
  
    constructor(myLoad) {
      this.SetVariables(myLoad);
    }
    
    SetVariables(myLoad) {
        this.p = 1;           //  'Temporary settings for atmospheric density
        this.Po = 1;         //   'And sea level density
        this.Vo = myLoad.MuzzleVelocity;
        this.C = myLoad.BallisticCoefficient;
        this.Dy = myLoad.SightInHeight / 12.0;
        this.Dx = myLoad.SightInRange * 3;
        this.Hs = myLoad.SightHeight / 12.0;
        this.Bw = myLoad.BulletWeight / 7000;
  
        this.sintheta = this.FindTheta(this.Dy, this.Dx, this.Hs, this.Vo, this.C, this.p, this.Po);
        this.costheta = Math.sqrt(1 - (this.sintheta * this.sintheta));  // sin^2 + cos^2 = 1
        this.Vy = this.Vo * this.sintheta;
        this.Vx = this.Vo * this.costheta;
    }
 
    GetBallisticsAtRange(distance)
    {
      const wrk = {
        T: 0.0,
        V: 0.0
      }
  
        var ret = new RangeData(distance);
  
        var range = distance * 3;
  
        this.FlightX(this.Vx, range, this.C, this.p, this.Po, wrk); //wrk.T, wrk.V);
  
        ret.TimeOfFlight = wrk.T;
        ret.Velocity = wrk.V;
  
        ret.Energy = this.CalcEnergy(wrk.V);
  
        var S2 = this.FindTheta(0, range, this.Hs, this.Vo, this.C, this.p, this.Po);
  
        var Degree = (S2 - this.sintheta) * 180 / 3.1415927;
        ret.AdjustMOA = Degree * 60;

        ret.AdjustMil = (S2 - this.sintheta) * 1000;


  
        ret.PointOfImact = this.FlightY(wrk.T, this.Vy, this.C, this.p, this.Po, this.Hs) * 12.0;
  
        return ret;
    }  
  
    CalcEnergy(V)
    {
        console.log("Bw = "+this.Bw+" V = "+V);
        return (0.5 * this.Bw / g * V * V);  //// E = .5mV^2 (ft * lb)
    }  
  
    TimeV(Vmin, VMax, C, B, A, P, Po)
    {
        // ----------Equation 3
        return (Math.pow(VMax, B) - Math.pow(Vmin, B)) * C * Po / (A * P * B);  
    }
  
    TimeX(X, VMax, C, B, A, P, Po)
    {
        // ----------Equation 4
        return (Math.pow(((-X * A * P * (B + 1) / C / Po) + Math.pow(VMax, (B + 1))), (1 / ((1 / B) + 1))) - Math.pow(VMax, B)) / (-A * P * B / (C * Po));  
    }
  
    FlewX(Tm, VMax, C, B, A, P, Po)
    {
        // -----------Equation 2
        return (-Math.pow(((-A * P * B * Tm / C / Po) + Math.pow(VMax, B)), ((1 / B) + 1)) + Math.pow(VMax, (B + 1))) / (A * P * (B + 1) / (C * Po));  
    }
  
    Veloc(VMax, Tm, C, B, A, P, Po)
    {
        // ---------Equation 1
        return Math.pow(((-A * P * B * Tm / (C * Po)) + Math.pow(VMax, B)), (1 / B));  
    }
  
    VelocY(VMax, Tm, C, B, A, P, Po)
    {
        // ---------Equation 1
        return Math.pow(((-A * P * B * Tm / (C * Po)) + Math.pow(VMax, B)), (1 / B)) - g * Tm;  
    }
  
    FlightY(T, Vo, C, P, Po, Hs)
    {
        // Returns V (time of flight), and V# (velocity at end range)
  
        var Dist = 0.0;   // Zero distance travelled so far
        var Tm = 0.0;     // no time passed either
        var V = Vo;      // Velocity = starting velocity
                     // Y = 0
  
        V = Vo - g * T;
        return (Vo * T - 0.5 * g * (Math.pow(T, 2)) - Hs);  // 0.125
    }  
  
    FlightX(Vo, Range, C, P, Po, workObj) // T, V)
    {
        var Dist = 0.0;
        var A = 0.0;
        var B = 0.0;
        
        var m = 0.0;
        var VMin = 0.0;
        var VMax = 0.0;
        var ttest = 0.0;
        var dtest = 0.0;
        var Ti = 0.0;
        var Di = 0.0;
        var x = 0;
        // Returns T# (time of flight), and V# (velocity at end range)
  
        Dist = 0;   // Zero distance travelled so far
        workObj.T = 0;      // no time passed either
        workObj.V = Vo;     // Velocity = starting velocity
  
        for (x = 1; x <= 41; x++)   // Find starting place in G table, based off Velocity
        {
            if ((workObj.V > g1[x].V))
            {
                A = g1[x].A;          // Then we found our place,
                m = g1[x].M;          // Load up the constants
                B = 1 - m;
                VMin = g1[x].V;       // Set range of velocities
                VMax = Vo;            // Does not go to table's upper bound, muzzle velocity is less
                break;
            }
        }
  
        do
        {
            // Function TimeV#(Vm As Double, VMax As Double, c As Double, B As Double, A As Double, P As Double, Po As Double)
            ttest = this.TimeV(VMin, VMax, C, B, A, P, Po);
            // Function FlewX#(Tm As Double, VMax As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
            dtest = this.FlewX(ttest, VMax, C, B, A, P, Po);
            if ((Dist + dtest) < Range)
            {
                Dist = Dist + dtest;
                workObj.T = workObj.T + ttest;
                // Function Veloc#(VMax As Double, Tm As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
                workObj.V = this.Veloc(VMax, ttest, C, B, A, P, Po);
                x = x + 1;
                A = g1[x].A;
                m = g1[x].M;
                B = 1 - m;
                VMin = g1[x].V;
                VMax = g1[x - 1].V;
            }
            else
            {
                Di = Range - Dist;
                Dist = Range;
  
                // Function TimeX#(X As Double, VMax As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
                ttest = this.TimeX(Di, VMax, C, B, A, P, Po);
                workObj.T = workObj.T + ttest;
                // Function Veloc#(VMax As Double, Tm As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
                workObj.V = this.Veloc(VMax, ttest, C, B, A, P, Po);
                break;
            }
        }
        while (true)// Find out how long it takes to go through this bracket in the G table// Then find out how far the bullet flies during that time// Then the entire distance (& time) counts towards our totals// ??? V# = VMin ???  Velocity at end of span// Jump to next segment in G table// Load up the constants// Set boundaries for velocities, upper is previous segment,// . lower is current// Otherwise, this will be a partial segment,// And the last segment in the calculation
  ;
    }  
  
    FindTheta(DistY, Distx, HeightSight, Velo, C, P, Po)
    {
        var SinTheta = 0.0;
        var CosTheta = 0.0;
        var OldDy = 0.0;
        var Vox = 0.0;
        var Voy = 0.0;
        const wrk = {
          T: 0.0,
          V: 0.0
        };
        var Y = 0.0;
        var DyTry = 0.0;
        var Dy = 0.0;;
        var Diff = 0.0;
  
        // -------Returns sin of theta
        // --------------Guess at a Theta, see Finding Theta
        SinTheta = (DistY + 0.5 * g * (Math.pow((Distx / Velo), 2)) + HeightSight) / Distx;   // eq. 7
        CosTheta = Math.pow((1 - Math.pow((SinTheta), 2)), 0.5);  // sin^2 + cos^2 = 1
  
        OldDy = DistY;   // Preserve actual height of impact
                         // --------------Iterate for Theta
  //  ThetaAgain:
      while (1==1)
      {
          // flag% = 1
          Vox = Velo * CosTheta;   // Initial velocities
          Voy = Velo * SinTheta;   // X & Y
  
          // Sub FlightX(Vo As Double, Range As Double, C As Double, P As Double, Po As Double, T As Double, V As Double)
          this.FlightX(Vox, Distx, C, P, Po, wrk); //.T, wrk.V);
  
          // Sub FlightY(T As Double, Vo As Double, C As Double, P As Double, Po As Double, V As Double, Y As Double)
          //FlightY(ref T, ref Voy, ref C, ref P, ref Po, ref V, ref Y, ref HeightSight);
          Y = this.FlightY(wrk.T, Voy, C, P, Po, HeightSight);
  
          DyTry = Y;
  
  
          Diff = OldDy - DyTry;   // Difference in heights
          if ((Math.abs(Diff) > 0.0000083))
          {
              Dy = Diff;
              SinTheta = SinTheta + 0.5 * (Dy / Distx);    // .5 is added to avoid overshoot at long ranges
              CosTheta = Math.pow((1 - Math.pow((SinTheta), 2)), 0.5);
              //goto ThetaAgain;
          }
          else
            break;
      }
        // -------------Done Iterating
        return SinTheta;
    }  
  }
  