using BallistJr.ViewModels;
using Microsoft.Maui.Controls.PlatformConfiguration.AndroidSpecific;

namespace BallistJr.Views;

public partial class BallistMain : ContentPage
{
	public BallistMain(BallistMainViewModel viewModel)
	{
		InitializeComponent();
        App.Current.On<Microsoft.Maui.Controls.PlatformConfiguration.Android>().UseWindowSoftInputModeAdjust(WindowSoftInputModeAdjust.Pan);

        BindingContext = viewModel;
    }
}