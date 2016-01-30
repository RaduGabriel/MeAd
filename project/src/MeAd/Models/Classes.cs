using System;
using System.Collections.Generic;
using System.Xml;



namespace MeAd.Models
{
    public class Country
    {
        double density;
        double area;
        string continent;
        double population;
        string name;
        string code;

        public double Density
        {
            get
            {
                return density;
            }

            set
            {
                density = value;
            }
        }

        public double Area
        {
            get
            {
                return area;
            }

            set
            {
                area = value;
            }
        }

        public double Population
        {
            get
            {
                return population;
            }

            set
            {
                population = value;
            }
        }

        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = value;
            }
        }

        public string Code
        {
            get
            {
                return code;
            }

            set
            {
                code = value;
            }
        }

        public string Continent
        {
            get
            {
                return continent;
            }

            set
            {
                continent = value;
            }
        }

        public Country(double area, double population, string name, string code, string continent)
        {
            this.Area = area;
            this.continent = continent;
            this.Population = population;
            this.Density = population / area;
            this.Name = name;
            this.Code = code;
        }
    }


    public class Countries
    {

        string url = "http://api.geonames.org/countryInfo?&username=mead&lang=en";

        static Dictionary<string, Country> dictionar;


        public Dictionary<string, Country> getDictionar()
        {
            if (dictionar == null)
            {
                initDictionar();
            }
            return dictionar;
        }

        private void initDictionar()
        {
            dictionar = new Dictionary<string, Country>();
            string xmlStr;
            using (var wc = new System.Net.WebClient())
            {
                xmlStr = wc.DownloadString(url);
            }
            var xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(xmlStr);

            XmlNodeList countries = xmlDoc.GetElementsByTagName("country");

            foreach (XmlNode country in countries)
            {
                if (country.HasChildNodes)
                {

                    string name = country["countryName"].InnerText;
                    string code = country["countryCode"].InnerText;
                    string continent = country["continent"].InnerText;
                    double population = Convert.ToDouble(country["population"].InnerText);
                    double area = Convert.ToDouble(country["areaInSqKm"].InnerText);

                    Country ct = new Country(area, population, name, code, continent);

                    dictionar.Add(name, ct);

                }
            }
        }

        public class CountryDiseases
        {

            int deaths;
            string disease;
            string description;
            string url;

            public CountryDiseases(int deaths, string disease, string description, string url)
            {

                this.deaths = deaths;
                this.disease = disease;
                this.description = description;
                this.url = url;
            }

            public int Deaths
            {
                get { return deaths; }
                set { deaths = value; }
            }
            public string Url
            {
                get { return url; }
                set { url = value; }
            }
            public string Disease
            {
                get { return disease; }
                set { disease = value; }
            }
            public string Description
            {
                get { return description; }
                set { description = value; }
            }




        }
        public class Question
        {
            Dictionary<string,string> answers;
            string description;
            string id;

            public Question(Dictionary<string, string> answers, string description, string id)
            {
                this.answers = answers;
                this.description = description;
                this.id = id;
            }
            public string Description
            {
                get { return description; }
                set { description = value; }
            }
            public string Id
            {
                get { return id; }
                set { id = value; }
            }
            public Dictionary<string, string> Answers
            {
                get { return answers; }
                set { answers = value; }
            }
        }

    }

}
