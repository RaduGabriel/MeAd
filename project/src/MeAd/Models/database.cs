using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeAd.Models
{
    public class database
    {
        public static string maindb = "server=server.gplay.ro;database=mead;uid=mead;pwd=mead12345;maximumpoolsize=500;";

        public MySqlConnection conn;
        public MySqlCommand Command;
        public MySqlDataReader reader;
        public bool connection_opened;
        public database(string connectionstring)
        {
            conn = new MySqlConnection();
            conn.ConnectionString = connectionstring;
            conn.Open();
            connection_opened = true;
            Command = conn.CreateCommand();
            Command.Connection = conn;
        }

        public void AddParam(string param, object value)
        {
            if (Command.Parameters.Contains(param))
                Command.Parameters.Remove(param);
            Command.Parameters.AddWithValue(param, value);
        }

        public MySqlDataReader ExecuteReader(string query)
        {
            Command.CommandText = query;
            if (reader != null && !reader.IsClosed)
                reader.Close();
            //Command.Prepare();
            reader = Command.ExecuteReader();
            return reader;
        }

        public int ExecuteNonQuery(string query)
        {
            if (reader != null && !reader.IsClosed)
                reader.Close();
            Command.CommandText = query;
            Command.Prepare();
            return Command.ExecuteNonQuery();
        }

        public void Close()
        {
            if (reader != null && !reader.IsClosed)
                reader.Close();
            if (conn != null)
                conn.Close();
        }
    }
}
