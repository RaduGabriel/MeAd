// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MeAd.Models;
using MySql.Data.MySqlClient;

namespace MeAd.Raml
{
    public partial class QuizController : IQuizController
    {

		/// <summary>
		/// Get top users from quiz - Top
		/// </summary>
        public IActionResult Get()
        {
            Random rand = new Random();
            string code="";
            int id = rand.Next(1, 213807);
            try
            {
                database db = new database(database.maindb);
                db.AddParam("?id", id);
                
                MySqlDataReader rd = db.ExecuteReader("select code from diseasestatistics where id=?id");
                while(rd.Read())
                {
                    code = rd.GetString("code");
                }

            }
            catch { return new ObjectResult(""); }
            // TODO: implement Get - route: quiz/top
			return new ObjectResult(code);
        }
        public IActionResult GetHard()
        {
            return new ObjectResult("");
        }
        public IActionResult GetEasy()
        {
            return new ObjectResult("");
        }
        public IActionResult Post([FromBody] string content, string questionID,string answer)
        {
           
            return new ObjectResult("");
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
