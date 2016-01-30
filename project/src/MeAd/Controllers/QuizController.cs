// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MeAd.Models;
using MySql.Data.MySqlClient;
using VDS.RDF.Query;
using System.Text;
using System.Linq;

namespace MeAd.Raml
{
    public partial class QuizController : IQuizController
    {
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
        /// <summary>
        /// Get top users from quiz - Top
        /// </summary>
        public IActionResult Get()
        {

            // TODO: implement Get - route: quiz/top
            return new ObjectResult("");
        }
        public IActionResult GetHard()
        {
            Random rand = new Random();
            string code = "";
            Dictionary<string, string> answers = new Dictionary<string, string>();
  
            Countries.Question question;
            string description = "";
            string name = "";
            int error = 0;
            string random_id = "";
            try
            {

                database db = new database(database.maindb);
            Begin:
                error = 0;
                int id1 = rand.Next(1, 213771);
                int id2 = rand.Next(1, 213771);
                int id3 = rand.Next(1, 213771);
                int id4 = rand.Next(1, 213771);
                answers = new Dictionary<string, string>();
                string answer_code = "";
                MySqlDataReader rd = db.ExecuteReader("select code from diseasestatistics where id=" + id1 + " or id=" + id2 + " or id=" + id3 + " or id=" + id4);
                int count = 0;
                while (rd.Read())
                {
                    count++;
                    code = rd.GetString("code");
                    if (count == 1)
                        answer_code = code;

                    answers.Add(code, "");
                }
                ViewBag.answers = answers;
                SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");

                foreach (KeyValuePair<string, string> answer in answers.ToList())
                {
                    code = answer.Key;
                    string query = @"SELECT * WHERE {
                            ?url <http://dbpedia.org/ontology/icd10> ?ID.
                            ?url rdfs:label ?name.
                            ?url <http://dbpedia.org/ontology/abstract> ?description.
                            filter regex(str(lcase(?ID)), concat(lcase('" + code[0] + "'), '[" + code[1] + "][" + code[2] + "][.]?[0-9]?') )" +
                                "filter(langMatches(lang(?name), 'EN'))" +
                                "filter(langMatches(lang(?description), 'EN'))" +
                                "} limit 1";
                    SparqlResultSet results = endpoint.QueryWithResultSet(query);
                    if (results.Count > 0 && answer_code == answer.Key)
                    {


                        random_id = RandomString(15);
                        name = results[0]["name"].ToString().Remove(results[0]["name"].ToString().Length - 3);
                        description = results[0]["description"].ToString();
                        db.ExecuteNonQuery("insert into questions(random_id,answer) values ('" + random_id + "','" + name + "')");

                    }
                    else if (results.Count == 0)
                    {
                        query = @"SELECT * WHERE {
                            ?url <http://dbpedia.org/ontology/icd10> ?ID.
                            ?url rdfs:label ?name.
                            ?url <http://dbpedia.org/ontology/abstract> ?description.
                            filter regex(str(lcase(?ID)), concat(lcase('" + code[0] + "'), '[" + code[1] + "][0-9][.]?[0-9]?') )" +
                           "filter(langMatches(lang(?name), 'EN'))" +
                           "filter(langMatches(lang(?description), 'EN'))" +
                           "} limit 1";
                        results = endpoint.QueryWithResultSet(query);
                        if (results.Count > 0 && answer_code == answer.Key)
                        {


                            random_id = RandomString(15);
                            name= results[0]["name"].ToString().Remove(results[0]["name"].ToString().Length - 3);
                            description = results[0]["description"].ToString();
                            db.ExecuteNonQuery("insert into questions(random_id,answer) values ('" + random_id + "','" + name + "')");

                        }

                    }
                    if (results.Count > 0) answers[answer.Key] = results[0]["name"].ToString().Remove(results[0]["name"].ToString().Length - 3);
                    else error = 1;
                }
                if (error == 1) goto Begin;
                description = description.Replace(name, "***");
                description = description.Replace(name.ToLower(), "***");
                description = description.Remove(description.Length - 3);
                question = new Countries.Question(answers, description, random_id);
               
            }
            catch (Exception e) { return new ObjectResult(e.ToString()); }
            return new ObjectResult(question);
        }
        public IActionResult GetEasy()
        {
            return new ObjectResult("");
        }

        //3 hard, 1 easy, -1 gresit
        public IActionResult GetCheckAnswerByQuestionIDAnswerIdUser(string questionID, string answer,string id_user)
        {
            string response="";
            int score = 0;
            try
            {
                database db = new database(database.maindb);
                db.AddParam("?id", questionID);
                MySqlDataReader rd = db.ExecuteReader("select answer from questions where random_id=?id");
                while(rd.Read())
                {
                    if (rd.GetString("answer") == answer) { response = "1";
                        score = 3;
                    }
                    else { response = "0";
                        score = -1;
                    }
                }
                db.AddParam("?score", score);
                db.AddParam("?id_user", id_user);
                db.ExecuteReader("update questions set answered=1 where random_id=?id");
                db.ExecuteReader("update users set score=score+?score where id=?id_user");
            }
            catch
            {

            }
            return new ObjectResult(response);
        }
        /// <summary>
        /// Get a quiz with specific ID - QuizId
        /// </summary>
        /// <param name="quizID"></param>
        public IActionResult GetTop()
        {
            // TODO: implement GetByQuizID - route: quiz/{ID}
            return new ObjectResult("");
        }

    }
}
