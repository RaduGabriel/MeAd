// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace MeAd.Raml
{
    public partial class QuizController : IQuizController
    {

		/// <summary>
		/// Get top users from quiz - Top
		/// </summary>
        public IActionResult Get()
        {
            // TODO: implement Get - route: quiz/top
			return new ObjectResult("");
        }

		/// <summary>
		/// Get a quiz with specific ID - QuizId
		/// </summary>
		/// <param name="quizID"></param>
        public IActionResult GetByQuizID(string quizID)
        {
            // TODO: implement GetByQuizID - route: quiz/{ID}
			return new ObjectResult("");
        }

    }
}
