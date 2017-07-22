using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TrainingMonitor.Startup))]
namespace TrainingMonitor
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
