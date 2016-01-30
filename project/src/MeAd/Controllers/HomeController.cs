using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using MySql.Data.MySqlClient;
using MeAd.Models;
using Microsoft.AspNet.Http;
using Newtonsoft.Json;
using System.Net;
using System.IO;
using VDS.RDF.Query;
using System.Linq;
using System.Text;

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

            diseaseCount.Add(id, 10);

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


        private string getDiseaseNameFromCode(string diseaseCode)
        {
            string diseaseName = "";

            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");
            
            {
               string  query = @"SELECT * WHERE {
                            ?url <http://dbpedia.org/ontology/icd10> ?ID.
                            ?url rdfs:label ?name.
                            ?url <http://dbpedia.org/ontology/abstract> ?description.
                            filter regex(str(lcase(?ID)), concat(lcase('" + diseaseCode[0] + "'), '[" + diseaseCode[1] + "][" + diseaseCode[2] + "][.]?[0-9]?') )" +
                        "filter(langMatches(lang(?name), 'EN'))" +
                        "filter(langMatches(lang(?description), 'EN'))" +
                        "} limit 1";
                SparqlResultSet results = endpoint.QueryWithResultSet(query);
                if (results.Count > 0)
                {
                    
                    diseaseName = results[0]["name"].ToString().Remove(results[0]["name"].ToString().Length - 3);
                }
                else
                {
                    query = @"SELECT * WHERE {
                            ?url <http://dbpedia.org/ontology/icd10> ?ID.
                            ?url rdfs:label ?name.
                            ?url <http://dbpedia.org/ontology/abstract> ?description.
                            filter regex(str(lcase(?ID)), concat(lcase('" + diseaseCode[0] + "'), '[" + diseaseCode[1] + "][0-9][.]?[0-9]?') )" +
                       "filter(langMatches(lang(?name), 'EN'))" +
                       "filter(langMatches(lang(?description), 'EN'))" +
                       "} limit 1";
                    results = endpoint.QueryWithResultSet(query);
                    if (results.Count > 0)
                    {
                        diseaseCode = results[0]["name"].ToString().Remove(results[0]["name"].ToString().Length - 3);
                    }
                }

            }
                return diseaseName;
           }

        [HttpPost]
        public string getMostCommonDiseases(int max)
        {
            Dictionary<int, string> mostSearchDiseases = new Dictionary<int, string>();

            database db = new database(database.maindb);
            int upLim = max * 4;
            MySqlDataReader rd = db.ExecuteReader("select code, SUM(deaths) as deathsno from diseasestatistics GROUP BY code Order by deathsno DESC LIMIT "+upLim.ToString());

            int i = 0;
            while (rd.Read()&& i<max)
            {
                //iei valorile rd.GetString("numele coloanei") sau rd.GetInt32("nume coloana");
                int deaths = rd.GetInt32("deathsno");
                string code = rd.GetString("code");

                string diseaseName = getDiseaseNameFromCode(code);
                if (!mostSearchDiseases.ContainsValue(diseaseName))
                {
                    mostSearchDiseases.Add(deaths, diseaseName);
                    i++;
                }
            }
            db.Close();

            return JsonConvert.SerializeObject(mostSearchDiseases);
        }


        [HttpPost]
        public string getSearch(int max)
        {
            Dictionary<int, string> mostSearchDiseases = new Dictionary<int, string>();

            database db = new database(database.maindb);
            int upLim = max * 4;
            MySqlDataReader rd = db.ExecuteReader("select diseaseName, COUNT(diseaseName) as nr from viewHistory GROUP BY diseaseName Order by  nr DESC LIMIT " + upLim.ToString());

            int i = 0;
            while (rd.Read() && i < max)
            {
                //iei valorile rd.GetString("numele coloanei") sau rd.GetInt32("nume coloana");
                int deaths = rd.GetInt32("nr");
                string code = rd.GetString("diseaseName");

                
                if (mostSearchDiseases.ContainsValue(code)==false && mostSearchDiseases.ContainsKey(deaths)==false)
                {
                    mostSearchDiseases.Add(deaths, code);
                    i++;
                }
            }
            db.Close();

            return JsonConvert.SerializeObject(mostSearchDiseases);
        }


        [HttpPost]
        public string getTopUsers(int max)
        {
            Dictionary<string, int> mostSearchDiseases = new Dictionary<string, int>();

            database db = new database(database.maindb);
            int upLim = max * 4;
            MySqlDataReader rd = db.ExecuteReader("select username, score from users Order by  score DESC LIMIT " + upLim.ToString());

            int i = 0;
            while (rd.Read() && i < max)
            {
                //iei valorile rd.GetString("numele coloanei") sau rd.GetInt32("nume coloana");
                int deaths = rd.GetInt32("score");
                string code = rd.GetString("username");


                if (mostSearchDiseases.ContainsKey(code) == false)
                {
                    mostSearchDiseases.Add(code, deaths);
                    i++;
                }
            }
            db.Close();

            return JsonConvert.SerializeObject(mostSearchDiseases);
        }

        [HttpPost]
        public string getCountriesDiseaseObesity(string id, int min, int max)
        {
            string js = getCountriesDisease(id);

            Dictionary<string, int> diseases = JsonConvert.DeserializeObject<Dictionary<string, int>>(js);
            Dictionary<string, int> countries = new Dictionary<string, int>();

            database db = new database(database.maindb);
            MySqlDataReader rd = db.ExecuteReader("select country, obesity from countries");

            while (rd.Read())
            {
                //iei valorile rd.GetString("numele coloanei") sau rd.GetInt32("nume coloana");
                string countryName = rd.GetString("country");
                int nr = rd.GetInt32("obesity");
                if (diseases.ContainsKey(countryName) && (diseases[countryName] >= min && diseases[countryName] <= max))
                {
                    countries.Add(countryName, diseases[countryName]);
                }
            }
            db.Close();

            return JsonConvert.SerializeObject(countries);
        }

        [HttpPost]
        public string getCountriesDiseaseClimate(string id, string climate)
        {
            string js = getCountriesDisease(id);

            Dictionary<string, int> diseases = JsonConvert.DeserializeObject<Dictionary<string, int>>(js);
            Dictionary<string, int> countries = new Dictionary<string, int>();

            database db = new database(database.maindb);
            MySqlDataReader rd = db.ExecuteReader("select country, climate from countries where climate like '%" + climate + "%'");

            while (rd.Read())
            {
                //iei valorile rd.GetString("numele coloanei") sau rd.GetInt32("nume coloana");
                string countryName = rd.GetString("country");
                string climateDB = rd.GetString("climate");
                if (diseases.ContainsKey(countryName))
                {
                    countries.Add(countryName, diseases[countryName]);
                }
            }
            db.Close();

            return JsonConvert.SerializeObject(countries);
        }

        [HttpPost]
        public string getCountriesDiseaseDensity(string id, int min, int max)
        {

            string js = getCountriesDisease(id);

            Dictionary<string, int> diseases = JsonConvert.DeserializeObject<Dictionary<string, int>>(js);

            Dictionary<string, Country> cslist = new Countries().getDictionar();

            foreach (KeyValuePair<string, Country> it in cslist.ToList())
            {
                if ((it.Value.Density <= min || it.Value.Density >= max))
                {
                    if (diseases.ContainsKey(it.Key))
                    {
                        diseases[it.Key]=0;
                    }
                    else
                    {
                        diseases.Add(it.Key,0);
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
                if ((Context.Session.GetInt32("on") != null && Context.Session.GetInt32("on") == 1))
                {
                    int userid = (int)Context.Session.GetInt32("id");
                    string key = diseaseName + userid.ToString();

                    Models.database db = new database(database.maindb);
                    MySqlDataReader rd = db.ExecuteReader("replace into viewHistory (id,diseaseName,ky) values(" + userid.ToString() + ", '" + diseaseName + "', '" + key + "');");
                    db.Close();
                }
            }
            catch { }
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
                        string symptoms = split[4].Replace("\\n", "<br/>").Replace(":*", "").Replace("*", "").Replace("[[", "").Replace("]]", "");
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
        public string RegisterUser(string email, string password, string username, string birthday, string gender, string country)
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
                if (!DateTime.TryParse(birthday, out dateValue) && birthday != "") return "-2";

                int sex = 0;
                switch (gender)
                {
                    case "Gender":
                        sex = 0;
                        break;
                    case "Male":
                        sex = 1;
                        break;
                    case "Female":
                        sex = 2;
                        break;
                }
                db.AddParam("?password", password);
                db.AddParam("?birthday", birthday);
                db.AddParam("?country", country);
                db.AddParam("?gender", sex);

                db.ExecuteNonQuery("insert into users(email,username,password,gender,country,birthday) values (?email,?username,?password,?gender,?country,?birthday)");
                return "1";
            }
            catch (Exception e)
            { return e.ToString(); }

        }

        [HttpPost]
        public string Logout()
        {
            Context.Session.SetInt32("on", 0);


            return "1";
        }


        public IActionResult country(string countryName)
        {
            ViewBag.country = countryName;
            try
            {
                ViewBag.countryExists = "true";
                database db = new database(database.maindb);
                db.AddParam("?country", countryName);
                MySqlDataReader rd = db.ExecuteReader("select * from countries where lower(country)=lower(?country)");
                if (!rd.HasRows)
                {
                    ViewBag.climate = "N.A.";
                    ViewBag.death_rate = "N.A.";
                    ViewBag.obesity = "N.A.";
                }

                while (rd.Read())
                {
                    ViewBag.climate = rd.GetString("climate");
                    double death_rate = rd.GetDouble("death_rate");
                    if (death_rate == 0) ViewBag.death_rate = "N.A.";
                    else ViewBag.death_rate = death_rate;
                    double obesity = rd.GetDouble("obesity");
                    if (obesity == 0) ViewBag.obesity = "N.A.";
                    else ViewBag.obesity = obesity;
                }
                Dictionary<string, Country> cslist = new Countries().getDictionar();
                ViewBag.code = "";
                try
                {
                    ViewBag.code = cslist[countryName].Code;
                }
                catch { }


            }
            catch { }
            ViewBag.nr = 0;
            try
            {
                ObjectResult obj = (ObjectResult)new MeAd.Raml.SearchController().Get(countryName);
                Dictionary<string, Countries.CountryDiseases> countryDiseases = (Dictionary<string, Countries.CountryDiseases>)obj.Value;
                ViewBag.countryDiseases = countryDiseases;
            }
            catch { }
            return View();
        }
        private static Random random = new Random((int)DateTime.Now.Ticks);
        public static string RandomString(int size)
        {
            StringBuilder builder = new StringBuilder();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            return builder.ToString();
        }
        public IActionResult takequiz(string type)
        {
            if (Context.Session.GetInt32("on") == 1)
                try
                {
                    ViewBag.loggedon = 1;
                    ViewBag.id = Context.Session.GetInt32("id");
                    if (type == "hard")
                    {
                        ObjectResult obj = (ObjectResult)new MeAd.Raml.QuizController().GetHard();
                        Countries.Question question = (Countries.Question)obj.Value;
                        ViewBag.question = question;
                        ViewBag.desc = question.Description;
                        ViewBag.id_question = question.Id;


                    }

                }
                catch (Exception e) { ViewBag.error = e.ToString(); }
            else
                ViewBag.loggedon = 0;
            return View();
        }

        [HttpPost]
        public string FBLogin(string token)
        {
            try
            {
                WebClient wc = new WebClient();
                wc.Proxy = null;


                string res = wc.DownloadString("https://graph.facebook.com/me?fields=email,name,first_name,last_name,gender&access_token=" + token);
                Dictionary<string, string> response = JsonConvert.DeserializeObject<Dictionary<string, string>>(res);
                if (response.ContainsKey("name"))
                {
                    string id = response["id"];
                    string email = response["email"];
                    database db = new database(database.maindb);
                    db.AddParam("?fbid", id);
                    db.AddParam("?email", email);
                    db.AddParam("?username", response["first_name"]+response["last_name"]);
                  
                    switch (response["gender"])
                    {
                        case "male":
                            db.AddParam("?gender", 1);
                            break;
                        case "female":
                            db.AddParam("?gender", 2);
                            break;
                        default:
                            db.AddParam("?gender", 0);
                            break;
                    }

                    MySqlDataReader rd;

                    rd = db.ExecuteReader("select * from users where facebookid = ?fbid or email = ?email");

                    if (rd.HasRows)
                        while (rd.Read())
                        {
                            Context.Session.SetInt32("on", 1);
                            Context.Session.SetString("email", rd.GetString("email"));
                            Context.Session.SetString("username", rd.GetString("username"));
                            Context.Session.SetInt32("id", rd.GetInt32("id"));
                            Context.Session.SetString("myname", rd.GetString("lastname") + " " + rd.GetString("firstname"));
                            break;
                            // return "2";
                        }
                    else
                    {
                        db.ExecuteNonQuery("insert into users (email,username,gender,facebookid) values (?email,?username,?gender,?fbid)");
                        rd = db.ExecuteReader("select * from users where facebookid = ?fbid or email = ?email");
                        while (rd.Read())
                        {
                            Context.Session.SetInt32("on", 1);
                            Context.Session.SetString("email", rd.GetString("email"));
                            Context.Session.SetInt32("id", rd.GetInt32("id"));
                            Context.Session.SetString("username", rd.GetString("username"));
                            Context.Session.SetInt32("gender", rd.GetInt32("gender"));
                        }
                        //return "3";
                    }

                    db.Close();

                    return "1";
                }
                else
                    return "0";
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }


    }
}
