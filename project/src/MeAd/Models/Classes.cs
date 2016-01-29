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
    }

}
