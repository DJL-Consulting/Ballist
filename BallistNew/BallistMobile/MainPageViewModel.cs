using CommunityToolkit.Mvvm.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BallistMobile;
public partial class MainPageViewModel : ObservableObject
{
    [ObservableProperty]
    string bC;

    [ObservableProperty]
    string bulletWeight;

    [ObservableProperty]
    string muzzleVelocity;

    [ObservableProperty]
    string sightInHeight;

    [ObservableProperty]
    string sightInRange;

    [ObservableProperty]
    string heightOfSight;

    [ObservableProperty]
    string clicksPerInch;

    [ObservableProperty]
    bool isEditing;

    public MainPageViewModel()
    {
        BC = "0.431";
        BulletWeight = "180";
        MuzzleVelocity = "3100";
        SightInHeight = "2";
        SightInRange = "100";
        HeightOfSight = "1.5";
        ClicksPerInch = "4";

        IsEditing = true;
    }
}
