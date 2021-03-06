﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authentication.Facebook;
using Microsoft.AspNet.Authentication.Google;
using Microsoft.AspNet.Authentication.MicrosoftAccount;
using Microsoft.AspNet.Authentication.Twitter;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Diagnostics;
using Microsoft.AspNet.Diagnostics.Entity;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Session;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Routing;
using Microsoft.Data.Entity;
using Microsoft.Framework.Configuration;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Logging;
using Microsoft.Framework.Logging.Console;
using Microsoft.Framework.Runtime;
using MeAd.Models;
using MeAd.Services;

namespace MeAd
{
    public class Startup
    {
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            // Setup configuration sources.

            var builder = new ConfigurationBuilder(appEnv.ApplicationBasePath)
                .AddJsonFile("config.json")
                .AddJsonFile($"config.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // This reads the configuration keys from the secret store.
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Entity Framework services to the services container.
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));

            // Add Identity services to the services container.
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Configure the options for the authentication middleware.
            // You can add options for Google, Twitter and other middleware as shown below.
            // For more information see http://go.microsoft.com/fwlink/?LinkID=532715
            services.Configure<FacebookAuthenticationOptions>(options =>
            {
                options.AppId = Configuration["Authentication:Facebook:AppId"];
                options.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
            });

            services.Configure<MicrosoftAccountAuthenticationOptions>(options =>
            {
                options.ClientId = Configuration["Authentication:MicrosoftAccount:ClientId"];
                options.ClientSecret = Configuration["Authentication:MicrosoftAccount:ClientSecret"];
            });

            // Add MVC services to the services container.
            services.AddMvc();

            // Uncomment the following line to add Web API services which makes it easier to port Web API 2 controllers.
            // You will also need to add the Microsoft.AspNet.Mvc.WebApiCompatShim package to the 'dependencies' section of project.json.
            // services.AddWebApiConventions();

            // Register application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddCaching();

          
            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(30);

            });
        }

        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseSession();
            loggerFactory.MinimumLevel = LogLevel.Information;
            loggerFactory.AddConsole();

            // Configure the HTTP request pipeline.

            // Add the following to the request pipeline only in development environment.
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseErrorPage(ErrorPageOptions.ShowAll);
                app.UseDatabaseErrorPage(DatabaseErrorPageOptions.ShowAll);
            }
            else
            {
                // Add Error handling middleware which catches all application specific errors and
                // sends the request to the following path or controller action.
                app.UseErrorHandler("/Home/Error");
            }

            // Add static files to the request pipeline.
            app.UseStaticFiles();

            // Add cookie-based authentication to the request pipeline.
            app.UseIdentity();

            // Add authentication middleware to the request pipeline. You can configure options such as Id and Secret in the ConfigureServices method.
            // For more information see http://go.microsoft.com/fwlink/?LinkID=532715
            // app.UseFacebookAuthentication();
            // app.UseGoogleAuthentication();
            // app.UseMicrosoftAccountAuthentication();
            // app.UseTwitterAuthentication();

            // Add MVC to the request pipeline.
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                // Uncomment the following line to add a route for porting Web API 2 controllers.
                // routes.MapWebApiRoute("DefaultApi", "api/{controller}/{id?}");
                routes.MapRoute("Login", "Login", new { controller = "Home", action = "Login" });
                routes.MapRoute("Register", "Register", new { controller = "Home", action = "Register" });
                routes.MapRoute("RegisterUser", "RegisterUser", new { controller = "Home", action = "RegisterUser" });
                routes.MapRoute("Logout", "Logout", new { controller = "Home", action = "Logout" });
                routes.MapRoute("search/countries", "search/countries/{countryName}", new { controller = "Home", action = "search/countries" });
                routes.MapRoute("viewDisease", "viewDisease/{diseaseName}", new { controller = "Home", action = "viewDisease" });
                routes.MapRoute("country", "country/{countryName}", new { controller = "Home", action = "country" });
                routes.MapRoute("getCountriesDisease", "getCountriesDisease", new { controller = "Home", action = "getCountriesDisease" });
                routes.MapRoute("takequiz", "takequiz/{type}", new { controller = "Home", action = "takequiz" });
                routes.MapRoute("getCountriesDiseaseDensity", "getCountriesDiseaseDensity", new { controller = "Home", action = "getCountriesDiseaseDensity" });
                routes.MapRoute("About", "About", new { controller = "Home", action = "About" });
                routes.MapRoute("getCountriesDiseaseObesity", "getCountriesDiseaseObesity", new { controller = "Home", action = "getCountriesDiseaseObesity" });
                routes.MapRoute("getCountriesDiseaseClimate", "getCountriesDiseaseClimate", new { controller = "Home", action = "getCountriesDiseaseClimate" });
                routes.MapRoute("getMostCommonDiseases", "getMostCommonDiseases", new { controller = "Home", action = "getMostCommonDiseases" });
                routes.MapRoute("getSearch", "getSearch", new { controller = "Home", action = "getSearch" });
                routes.MapRoute("getTopUsers", "getTopUsers", new { controller = "Home", action = "getTopUsers" });
                routes.MapRoute("ViewCountries", "ViewCountries", new { controller = "Home", action = "ViewCountries" });

                routes.MapRoute("FBLogin", "FBLogin", new { controller = "Home", action = "FBLogin" });

            });


        }
    }
}
