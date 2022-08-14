var load = new BallistNew.Load
{
    MuzzleVelocity = 3200,
    BallisticCoefficient = .431,
    SightInHeight = 2.5,
    SightInRange = 100,
    SightHeight = 1.5,
    BulletWeight = 180
};

var BC = new BallistNew.BallistCalc(load);

var Eo = BC.CalcMuzzleEnergy();
Console.WriteLine("Energy at muzzle = " + Eo.ToString() + " lb*ft");

Console.WriteLine();
Console.WriteLine("Range    Velocity   Energy   Impact  Adjust");
Console.WriteLine("yards        ft/s    ft*lb   inches    MOA");
for (int range=0; range <= 1000; range+=50)
{
    var res = BC.GetBallisticsAtRange(range);
    var output = String.Format("{0}         {1}    {2}   {3} {4}", res.Distance.ToString().PadLeft(4), ((int)res.Velocity).ToString().PadLeft(4), res.Energy.ToString().PadLeft(5), res.PointOfImact.ToString("####.#").PadLeft(6), res.AdjustMOA.ToString("###.##").PadLeft(7));
    Console.WriteLine(output);
}


