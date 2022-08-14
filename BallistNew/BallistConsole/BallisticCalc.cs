using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BallistNew
{
    using System;
    using System.IO;

    public class Load
    {

        /// <summary>
        /// Muzzle Velocity (ft/s)
        /// </summary>
        public Double MuzzleVelocity { get; set; }

        /// <summary>
        /// Ballistic Coefficient (0 <= C <= 1)
        /// </summary>
        public Double BallisticCoefficient { get; set; }

        /// <summary>
        /// Sight-in height i.e. 2" high at 100 yards (in)
        /// </summary>
        public Double SightInHeight { get; set; }

        /// <summary>
        /// Sight-in range (yards) 
        /// </summary>
        public Double SightInRange { get; set; }
        
        ///<summary>
        ///Height of sight above bore (in)
        /// </summary>
        public Double SightHeight { get; set; }

        ///<summary>
        ///Bullet Weight (grains)
        /// </summary>
        public Double BulletWeight { get; set; }   
    }

    public class RangeData
    {
        /// <summary>
        ///Range distance (yards)
        /// </summary>
        public Double Distance { get; set; }

        /// <summary>
        ///Velocity (ft/s)
        /// </summary>
        public Double Velocity { get; set; }

        /// <summary>
        ///Time of Flight (s)
        /// </summary>
        public Double TimeOfFlight { get; set; }

        /// <summary>
        /// Point of Imact + above line of sight, - below (in)
        /// </summary>
        public Double PointOfImact { get; set; }

        /// <summary>
        /// Adustment to hti dead-on at this range (minute of angle/MOA)
        /// </summary>
       public Double AdjustMOA { get; set; }

        /// <summary>
        /// Energy of bullet at this ragne (ft x lb)
        /// </summary>
        public int Energy { get; set; }

        /// <summary>
        /// Creates a new RangeData object for the defined range (in yards)
        /// </summary>
        /// <param name="distance">Range distance (yards)</param>
        public RangeData(Double distance)
        {
            this.Distance = distance;
        }
    }

    public class BallistCalc
    {
        private Double Vo;  //Muzzle Velocity in ft/s
        private Double C;   //Ballistic Coefficient (0 <= C <= 1)
        private Double MaxRange;// Max Range for Calculation (ft)
        private Double RangeInc;// Range Increments (ft)
        private Double Dy; //Sight-in height (ft)
        private Double Dx; //Sight-in distance (ft) 
        private Double Hs; //Height of sight above bore (ft)
        private Double Bw; //Bullet Weight
        private Double p, Po;
        private Double sintheta, costheta;
        private Double Vx, Vy;
        class g1Data
        {
            public double A { get; set; }
            public double M { get; set; }
            public double V { get; set; }
        }

        public BallistCalc()
        {
            LoadG("D:\\G1.dat");
        }

        public BallistCalc(Load myLoad)
        {
            LoadG("D:\\G1.dat");
            this.SetVariables(myLoad);
        }

        private void SetVariables(Load myLoad)
        {
            p = 1;           //  'Temporary settings for atmospheric density
            Po = 1;         //   'And sea level density
            Vo = myLoad.MuzzleVelocity;
            C = myLoad.BallisticCoefficient;
            Dy = myLoad.SightInHeight / 12.0;
            Dx = myLoad.SightInRange * 3;
            Hs = myLoad.SightHeight / 12.0;
            Bw = myLoad.BulletWeight / 7000;

            sintheta = this.FindTheta(Dy, Dx, Hs, Vo, C, p, Po);
            costheta = Math.Sqrt(1 - (sintheta * sintheta));  // sin^2 + cos^2 = 1
            Vy = Vo * sintheta;
            Vx = Vo * costheta;
        }

        private List<g1Data> g1;

        //private dat[] g1 = new dat[43];

        public const double g = 32.1740485564;

        public RangeData GetBallisticsAtRange(Double distance)
        {
            Double T = 0.0, V = 0.0;
            var ret = new RangeData(distance);

            var range = distance * 3;

            FlightX(Vx, range, C, p, Po, ref T, ref V);

            ret.TimeOfFlight = T;
            ret.Velocity = V;

            ret.Energy = this.CalcEnergy(V);

            var S2 = this.FindTheta(0, range, Hs, Vo, C, p, Po);

            var Degree = (S2 - sintheta) * 180 / 3.1415927;
            ret.AdjustMOA = Degree * 60;

            ret.PointOfImact = FlightY(T, Vy, C, p, Po, Hs) * 12.0;

            return ret;
        }

        /// <summary>
        /// Calculates bullet energy at muzzle, in ft*lb
        /// </summary>
        /// <returns>Muzzle Energy (ft * lb)</returns>
        public int CalcMuzzleEnergy() 
        {
            return this.CalcEnergy(Vo);
        }

        private int CalcEnergy(Double V)
        {
            return (int)(0.5 * Bw / g * V * V);  //// E = .5mV^2 (ft * lb)
        }

        private void LoadG(string inFile)
        {
            var g = File.ReadAllText("D:\\G1.json");

            g1 = JsonConvert.DeserializeObject<List<g1Data>>(g);            
        }


        private Double TimeV(ref double Vmin, ref double VMax, ref double C, ref double B, ref double A, ref double P, ref double Po)
        {
            Double Tm;
            // ----------Equation 3
            return (Math.Pow(VMax, B) - Math.Pow(Vmin, B)) * C * Po / (A * P * B);
            //TimeV = Tm;
        }

        private Double TimeVY(ref double Vmin, ref double VMax, ref double C, ref double B, ref double A, ref double P, ref double Po)
        {
            Double TGuess, TGuess2;
            Double VR, VR2;

            TGuess = (VMax - Vmin) / g;  // Wild Guess

        TryAgain:
            ;

            // Function VelocY#(VMax As Double, Tm As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
            VR = VelocY(ref VMax, ref TGuess, ref C, ref B, ref A, ref P, ref Po);

            if (Math.Abs(VR - Vmin) < 0.001)
            {
                //TimeVY = TGuess;
                return TGuess;
            }
            TGuess2 = TGuess + 0.0001;
            VR2 = VelocY(ref VMax, ref TGuess2, ref C, ref B, ref A, ref P, ref Po);
            if (Math.Abs(VR2 - Vmin) < Math.Abs(VR - Vmin))
                TGuess = (Math.Pow(TGuess, 0.999));
            else
                TGuess = Math.Pow(TGuess, 1.001);// Increase time gets comlser
            goto TryAgain;
        }


        private Double TimeX(ref double X, ref double VMax, ref double C, ref double B, ref double A, ref double P, ref double Po)
        {
            //Double Tm2;
            // ----------Equation 4
            return (Math.Pow(((-X * A * P * (B + 1) / C / Po) + Math.Pow(VMax, (B + 1))), (1 / ((1 / B) + 1))) - Math.Pow(VMax, B)) / (-A * P * B / (C * Po));
            //TimeX = Tm2;
        }


        private Double FlewX(ref double Tm, ref double VMax, ref double C, ref double B, ref double A, ref double P, ref double Po)
        {
            //Double Fl;
            // -----------Equation 2
            return (-Math.Pow(((-A * P * B * Tm / C / Po) + Math.Pow(VMax, B)), ((1 / B) + 1)) + Math.Pow(VMax, (B + 1))) / (A * P * (B + 1) / (C * Po));
            //FlewX = Fl;
        }

        private Double FlewY(ref double Tm, ref double VMax, ref double C, ref double B, ref double A, ref double P, ref double Po)
        {
            Double Fl;
            // -----------Equation 2
            Fl = (-Math.Pow(((-A * P * B * Tm / C / Po) + Math.Pow(VMax, B)), ((1 / B) + 1)) + Math.Pow(VMax, (B + 1))) / (A * P * (B + 1) / (C * Po)) - 0.5 * g * (Math.Pow(Tm, 2));
            return Fl;
            //FlewY = Fl;
        }

        private Double Veloc(ref double VMax, ref double Tm, ref double C, ref double B, ref double A, ref double P, ref double Po)
        {
            Double Vl;
            // ---------Equation 1
            return Math.Pow(((-A * P * B * Tm / (C * Po)) + Math.Pow(VMax, B)), (1 / B));
            //Veloc = Vl;
        }

        private Double VelocY(ref double VMax, ref double Tm, ref double C, ref double B, ref double A, ref double P, ref double Po)
        {
            Double Vl;
            // ---------Equation 1
            return Vl = Math.Pow(((-A * P * B * Tm / (C * Po)) + Math.Pow(VMax, B)), (1 / B)) - g * Tm;
            //VelocY = Vl;
        }



        //public void FlightY(double T, double Vo, double C, double P, double Po, ref double V, ref double Y, double Hs)
        private Double FlightY(double T, double Vo, double C, double P, double Po, double Hs)
        {
            Double Dist, Tm;
            int x;
            Double A, B, M;
            Double Vmin, Vmax;
            Double DTest, TTest, VTest;
            Double TI, V, Y;

            // Returns V (time of flight), and V# (velocity at end range)

            Dist = 0;   // Zero distance travelled so far
            Tm = 0;     // no time passed either
            V = Vo;      // Velocity = starting velocity
                         // Y = 0

            V = Vo - g * T;
            return (Vo * T - 0.5 * g * (Math.Pow(T, 2)) - Hs);  // 0.125
        }



        private void FlightX(double Vo, double Range, double C, double P, double Po, ref double T, ref double V)
        {
            Double Dist;
            Double A = 0.0, B = 0.0, m;
            Double VMin = 0.0, VMax = 0.0;
            Double ttest, dtest;
            Double Ti, Di;
            int x;
            // Returns T# (time of flight), and V# (velocity at end range)

            Dist = 0;   // Zero distance travelled so far
            T = 0;      // no time passed either
            V = Vo;     // Velocity = starting velocity

            for (x = 1; x <= 41; x++)   // Find starting place in G table, based off Velocity
            {
                if ((V > g1[x].V))
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
                ttest = TimeV(ref VMin, ref VMax, ref C, ref B, ref A, ref P, ref Po);
                // Function FlewX#(Tm As Double, VMax As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
                dtest = FlewX(ref ttest, ref VMax, ref C, ref B, ref A, ref P, ref Po);
                if ((Dist + dtest) < Range)
                {
                    Dist = Dist + dtest;
                    T = T + ttest;
                    // Function Veloc#(VMax As Double, Tm As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
                    V = Veloc(ref VMax, ref ttest, ref C, ref B, ref A, ref P, ref Po);
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
                    ttest = TimeX(ref Di, ref VMax, ref C, ref B, ref A, ref P, ref Po);
                    T = T + ttest;
                    // Function Veloc#(VMax As Double, Tm As Double, C As Double, B As Double, A As Double, P As Double, Po As Double)
                    V = Veloc(ref VMax, ref ttest, ref C, ref B, ref A, ref P, ref Po);
                    break;
                }
            }
            while (true)// Find out how long it takes to go through this bracket in the G table// Then find out how far the bullet flies during that time// Then the entire distance (& time) counts towards our totals// ??? V# = VMin ???  Velocity at end of span// Jump to next segment in G table// Load up the constants// Set boundaries for velocities, upper is previous segment,// . lower is current// Otherwise, this will be a partial segment,// And the last segment in the calculation
    ;
        }


        private Double FindTheta(double DistY, double Distx, double HeightSight, double Velo, double C, double P, double Po)
        {
            Double SinTheta, CosTheta;
            Double OldDy;
            Double Vox, Voy;
            Double T = 0.0, V = 0.0, Y=0.0;
            Double DyTry, Dy;
            Double Diff;

            // -------Returns sin of theta
            // --------------Guess at a Theta, see Finding Theta
            SinTheta = (DistY + 0.5 * g * (Math.Pow((Distx / Velo), 2)) + HeightSight) / Distx;   // eq. 7
            CosTheta = Math.Pow((1 - Math.Pow((SinTheta), 2)), 0.5);  // sin^2 + cos^2 = 1

            OldDy = DistY;   // Preserve actual height of impact
                             // --------------Iterate for Theta
        ThetaAgain:
            // flag% = 1
            Vox = Velo * CosTheta;   // Initial velocities
            Voy = Velo * SinTheta;   // X & Y

            // Sub FlightX(Vo As Double, Range As Double, C As Double, P As Double, Po As Double, T As Double, V As Double)
            FlightX(Vox, Distx, C, P, Po, ref T, ref V);

            // Sub FlightY(T As Double, Vo As Double, C As Double, P As Double, Po As Double, V As Double, Y As Double)
            //FlightY(ref T, ref Voy, ref C, ref P, ref Po, ref V, ref Y, ref HeightSight);
            Y = FlightY(T, Voy, C, P, Po, HeightSight);

            DyTry = Y;


            Diff = OldDy - DyTry;   // Difference in heights
            if ((Math.Abs(Diff) > 0.0000083))
            {
                Dy = Diff;
                SinTheta = SinTheta + 0.5 * (Dy / Distx);    // .5 is added to avoid overshoot at long ranges
                CosTheta = Math.Pow((1 - Math.Pow((SinTheta), 2)), 0.5);
                goto ThetaAgain;
            }
            // -------------Done Iterating
            return SinTheta;
        }
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            