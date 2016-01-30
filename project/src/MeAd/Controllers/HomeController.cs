using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MySql.Data.MySqlClient;
using MeAd.Models;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net;
using System.IO;

namespace MeAd.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string getCountriesDisease(string id)
        {
            Dictionary<string, int> diseaseCount = new Dictionary<string, int>();

            diseaseCount.Add(id,10);

            database db = new database(database.maindb);
            MySqlDataReader rd = db.ExecuteReader("select country, SUM(deaths) as deaths from diseasestatistics where code like '" + id + "%' GROUP BY country");

            while (rd.Read())
            {
                //iei valorile rd.GetString("numele coloanei") sau rd.GetInt32("nume coloana");
                string countryName = rd.GetString("country");
                int nr = rd.GetInt32("deaths");
                diseaseCount.Add(countryName, nr);
            }
            db.Close();

            return JsonConvert.SerializeObject(diseaseCount);
        }

        
        [HttpPost]
        public string getCountriesDiseaseObesity(string id, int min, int max)
        {

            string js = getCountriesDisease(id);

            Dictionary<string, int> diseases = JsonConvert.DeserializeObject<Dictionary<string, int>>(js);

            Dictionary<string, Country> cslist = new Countries().getDictionar();

            foreach (KeyValuePair<string, Country> it in cslist.ToList())
            {
                if ((it.Value.Density < min || it.Value.Density > max) && diseases.ContainsKey(it.Value.Name))
                {
                    if (diseases.ContainsKey(it.Key))
                    {
                        diseases.Remove(it.Key);
                    }
                }
            }

            return JsonConvert.SerializeObject(diseases);
        }
        [HttpPost]
        public string getCountriesDiseaseDensity(string id, int min, int max)
        {
           
            string js = getCountriesDisease(id);

            Dictionary<string, int> diseases = JsonConvert.DeserializeObject<Dictionary<string, int>>(js);
           
            Dictionary<string, Country> cslist = new Countries().getDictionar();

            foreach(KeyValuePair<string,Country> it in cslist.ToList())
            {
                if ((it.Value.Density < min || it.Value.Density > max) && diseases.ContainsKey(it.Value.Name) )
                {
                    if (diseases.ContainsKey(it.Key))
                    {
                        diseases.Remove(it.Key);
                    }
                }
            }

            return JsonConvert.SerializeObject(diseases);
        }

        public IActionResult viewDisease(string diseaseName)
        {
            ViewBag.error = "false";
            ViewBag.diseaseExists = "false";
            try
            {
                ObjectResult obj = (ObjectResult)new MeAd.Raml.DiseaseDiseaseNameController().Get(diseaseName);
                Dictionary<string, string> apil = (Dictionary<string, string>)obj.Value;

                
                if (apil.Count != 0)
                {
                    ViewBag.diseaseExists = "true";
                    apil["name"] = apil["name"].Replace("%20", " ");
                    ViewBag.api = apil;

                    

               


                    string url = "http://www.wikidoc.org/api.php?action=query&titles=" + diseaseName + "_(patient_information)&export&contentformat=text/plaino";



                    try
                    {
                        WebRequest wrGETURL;
                        wrGETURL = WebRequest.Create(url);
                        Stream objStream;
                        objStream = wrGETURL.GetResponse().GetResponseStream();

                        StreamReader objReader = new StreamReader(objStream);
                        string content = objReader.ReadToEnd();
                        string[] split = content.Split(new string[] { "==" }, StringSplitOptions.None);
                        string symptoms = split[4].Replace("\\n", "<br/>").Replace(":*", "").Replace("*","").Replace("[[", "").Replace("]]", "");
                        ViewBag.symptoms = symptoms;
                    }
                    catch
                    { ViewBag.symptoms = "N.A."; }
                }
            }
            catch { ViewBag.error = "true"; }
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }

        bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        [HttpPost]
        public string Login(string username, string password)
        {

            //-1 username or email doesnt exist
            try
            {
                //if (!IsValidEmail(email)) return "-1";

                database db = new database(database.maindb);
                db.AddParam("?username", username);
                db.AddParam("?password", password);
                MySqlDataReader rd = db.ExecuteReader("select * from users where lower(username)=lower(?username) and password=?password");
                if (!rd.HasRows)
                {
                    Context.Session.SetInt32("on", 0);
                    // invalid user / pass
                    db.Close();
                    return "-1";
                }
                while (rd.Read())
                {
                    Context.Session.SetInt32("on", 1);
                    Context.Session.SetInt32("id", rd.GetInt32("id"));
                    Context.Session.SetString("email", rd.GetString("email"));
                    Context.Session.SetString("username", rd.GetString("username"));
                    Context.Session.SetInt32("score", rd.GetInt32("score"));
                    Context.Session.SetString("country", rd.GetString("country"));
                    Context.Session.SetInt32("gender", rd.GetInt32("gender"));
                    Context.Session.SetString("birthday", rd.GetString("birthday"));
                    break;
                }
                db.Close();
            }
            catch (Exception e)
            {
                //  HttpContext.Current.Session["on"] = 0;
                return e.ToString();
            }
            return "1";
        }

        public IActionResult Register()
        {

            return View();
        }
        [HttpPost]
        public string RegisterUser(string email,string password,string username,string birthday,string gender,string country)
        {
            //-1 username or email already exists, -2 invalid birthday
            try

            {
                database db = new database(database.maindb);
                if (String.IsNullOrEmpty(birthday)) birthday = "";
                if (String.IsNullOrEmpty(country)) country = "";

                db.AddParam("?username", username);
                db.AddParam("?email", email);

                MySqlDataReader rd = db.ExecuteReader("select * from users where lower(email)=lower(?email) or lower(username)=lower(?username)");
                if (rd.HasRows) return "-1";

                DateTime dateValue;
                if (!DateTime.TryParse(birthday, out dateValue)&&birthday!="") return "-2";

                int sex = 0;
                switch(gender)
                {
                    case "Gender": sex = 0;
                        break;
                    case "Male": sex = 1;
                        break;
                    case "Female": sex = 2;
                        break;
                }
                db.AddParam("?password", password);
                db.AddParam("?birthday", birthday);
                db.AddParam("?country", country);
                db.AddParam("?gender", sex);

                db.ExecuteNonQuery("insert into users(email,username,password,gender,country,birthday) values (?email,?username,?password,?gender,?country,?birthday)");
                    return "1";
            }
            catch(Exception e)
            { return e.ToString(); }
           
        }

        [HttpPost]
        public string Logout()
        {
            Context.Session.SetInt32("on", 0);
          

            return "1";
        }


    }
}
