const g1 = [
    {
      "A": 0,
      "M": 0,
      "V": 0
    },
    {
      "A": 0.0001477404177730177,
      "M": 1.9565,
      "V": 4230
    },
    {
      "A": 0.0001920339268755614,
      "M": 1.925,
      "V": 3680
    },
    {
      "A": 0.0002894751026819746,
      "M": 1.875,
      "V": 3450
    },
    {
      "A": 0.0004349905111115636,
      "M": 1.825,
      "V": 3295
    },
    {
      "A": 0.0006520421871892662,
      "M": 1.775,
      "V": 3130
    },
    {
      "A": 0.0009748073694078696,
      "M": 1.725,
      "V": 2960
    },
    {
      "A": 0.001453721560187286,
      "M": 1.675,
      "V": 2830
    },
    {
      "A": 0.002162887202930376,
      "M": 1.625,
      "V": 2680
    },
    {
      "A": 0.003209559783129881,
      "M": 1.575,
      "V": 2460
    },
    {
      "A": 0.003904368218691249,
      "M": 1.55,
      "V": 2225
    },
    {
      "A": 0.003222942271262336,
      "M": 1.575,
      "V": 2015
    },
    {
      "A": 0.002203329542297809,
      "M": 1.625,
      "V": 1890
    },
    {
      "A": 0.001511001028891904,
      "M": 1.675,
      "V": 1810
    },
    {
      "A": 0.0008609957592468259,
      "M": 1.75,
      "V": 1730
    },
    {
      "A": 0.0004086146797305117,
      "M": 1.85,
      "V": 1595
    },
    {
      "A": 0.0001954473210037398,
      "M": 1.95,
      "V": 1520
    },
    {
      "A": 0.00005431896266462351,
      "M": 2.125,
      "V": 1420
    },
    {
      "A": 0.000008847742581674416,
      "M": 2.375,
      "V": 1360
    },
    {
      "A": 0.000001456922328720298,
      "M": 2.625,
      "V": 1315
    },
    {
      "A": 2.419485191895565e-7,
      "M": 2.875,
      "V": 1280
    },
    {
      "A": 1.657956321067612e-8,
      "M": 3.25,
      "V": 1220
    },
    {
      "A": 4.745469537157371e-10,
      "M": 3.75,
      "V": 1185
    },
    {
      "A": 1.379746590025088e-11,
      "M": 4.25,
      "V": 1150
    },
    {
      "A": 4.070157961147882e-13,
      "M": 4.75,
      "V": 1100
    },
    {
      "A": 2.938236954847331e-14,
      "M": 5.125,
      "V": 1060
    },
    {
      "A": 1.228597370774746e-14,
      "M": 5.25,
      "V": 1025
    },
    {
      "A": 2.916938264100495e-14,
      "M": 5.125,
      "V": 980
    },
    {
      "A": 3.855099424807451e-13,
      "M": 4.75,
      "V": 945
    },
    {
      "A": 1.185097045689854e-11,
      "M": 4.25,
      "V": 905
    },
    {
      "A": 3.566129470974951e-10,
      "M": 3.75,
      "V": 860
    },
    {
      "A": 1.045513263966272e-8,
      "M": 3.25,
      "V": 810
    },
    {
      "A": 1.291159200846216e-7,
      "M": 2.875,
      "V": 780
    },
    {
      "A": 6.824429329105383e-7,
      "M": 2.625,
      "V": 750
    },
    {
      "A": 0.000003569169672385163,
      "M": 2.375,
      "V": 700
    },
    {
      "A": 0.00001839015095899579,
      "M": 2.125,
      "V": 640
    },
    {
      "A": 0.0000571117468873424,
      "M": 1.95,
      "V": 600
    },
    {
      "A": 0.00009226557091973427,
      "M": 1.875,
      "V": 550
    },
    {
      "A": 0.00009337991957131389,
      "M": 1.875,
      "V": 250
    },
    {
      "A": 0.00007225247327590413,
      "M": 1.925,
      "V": 100
    },
    {
      "A": 0.00005792684957074546,
      "M": 1.975,
      "V": 60
    },
    {
      "A": 0.0000520614107320588,
      "M": 1.999,
      "V": 0
    },
    {
      "A": 0,
      "M": 0,
      "V": 0
    }
  ];
  
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
  