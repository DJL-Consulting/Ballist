using BallistJr.Views;

namespace BallistJr;

public partial class AppShell : Shell
{
    public AppShell()
    {
        Routing.RegisterRoute(nameof(BallistMain), typeof(BallistMain));

        InitializeComponent();
    }
}
