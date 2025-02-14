using Microsoft.Maui.Controls.PlatformConfiguration.AndroidSpecific;

namespace BallistMobile
{
    public partial class MainPage : ContentPage
    {
        int count = 0;

        public MainPage(MainPageViewModel viewModel)
        {
            InitializeComponent();

            //App.Current.On<Microsoft.Maui.Controls.PlatformConfiguration.Android>().UseWindowSoftInputModeAdjust(WindowSoftInputModeAdjust.Pan);

            BindingContext = viewModel;
        }


    }

}
