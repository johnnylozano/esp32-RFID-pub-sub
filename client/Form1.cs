using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Threading;
using System.Net;
using System.Net.Sockets;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using System.Data.Common;
using System.Security.Permissions;

/********************************************
 * CPE 4020: Device Networks
 * Group 5 lanyard Project Server on BBB
 * By: Anthony Lopez
 ********************************************/

namespace LanyardIDProject
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            getIDs(); 
            

        }

        WebClient client = new WebClient();
        string[] name;
        string[] parameters = { };
        string enteredID;

        Dictionary<string, string> IDs = new Dictionary<string, string>();


        /*
         * Retrieve a string array of names and ids 
         * function will create a dictionary to link name with id
         */
        public void getIDs()
        {
            byte[] arr = client.DownloadData("http://104.1.145.92:4020/group5/lanyard/getIDs");
            
            string resp = Encoding.UTF8.GetString(arr);
            string originalResp = resp;
            
            Console.WriteLine(resp);

            
                
                resp = resp.Replace("[", string.Empty);
                resp = resp.Replace("]", string.Empty);
                resp = resp.Replace("\"", string.Empty);

            // splitting json string into a new array string. ex. ["name1", "id1" , "name2", "id2"]
            parameters = resp.Split(',');
                
            // Adding to dictionary. key = name , value = id
            for (int i = 0; i < parameters.Length-1; i=i+2) {
                IDs.Add(parameters[i], parameters[i + 1]);
            
            }
            
           

            

        }


        // return the key of a value in a dictionary
        // in this case, the function will return the name associated with the ID
        public string returnName(string value) {
            if (IDs.ContainsValue(value))
            {
                foreach (KeyValuePair<string, string> id in IDs)
                    if (id.Value == value)
                    {
                        return id.Key;

                    }

            }
            else { 
                return null;
            }
            return null;
        
        }

        // update connections list every t seconds
        private void timer1_Tick(object sender, EventArgs e)
        {
           
            updateList(enteredID);

            WelcomeTextBox.Text = "Hello " + returnName(enteredID) + "!!!";

            Console.WriteLine("The Id entered is: " + enteredID);
        }

        // calls api to retrieve an new connections array and compares with current list of connections
        // if they dont match, update list
        // else do nothing
        public void updateList(string id) {
            try
            {
                byte[] arr3 = client.DownloadData("http://104.1.145.92:4020/group5/lanyard/" + id + "/connections");
                string newConnections = Encoding.UTF8.GetString(arr3);
                string[] names2 = newConnections.Split(',');
                if (!Enumerable.SequenceEqual(name, names2))
                {
                    textBox1.Clear();
                    listBox1.Items.Clear();
                    uploadList(id);
                }
                else
                {
                    Console.WriteLine("List is already updated!");
                }
            }
            catch (WebException ee)
            {

            }
        }
        public void uploadList(string id)
        {
            try
            {
                //api call to retrieve all the connection names the BBB has for our ID

                byte[] arr1 = client.DownloadData("http://104.1.145.92:4020/group5/lanyard/" + id + "/connections");
                string connections = Encoding.UTF8.GetString(arr1);

                // Write values.
                // name is an array of strings
                name = connections.Split(',');

                // adding each name to the listbox
                for (int i = 0; i < name.Length; i++)
                {
                    listBox1.Items.Add(name[i]);
                }

            }

            catch (WebException ee)
            {

            }
        }
        
        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
           
        }

        private void button1_Click(object sender, EventArgs e)
        {
            /* selected items is looped through the name array 
             * if the selected item is equal to a name and 
             * the "Display" button is pressed, it searches 
             * the ID dictionary with key = name
             * and returns the value = id.
             * id is concatenated with api call
             */
            for(int i = 0; i<name.Length;i++)
            if (listBox1.SelectedItem.Equals(name[i])) {
                    byte[] arr2 = client.DownloadData("http://104.1.145.92:4020/group5/lanyard/" + IDs[name[i]]+
                    "/info");
                    string info = Encoding.UTF8.GetString(arr2);

                    // info is displayed into textbox
                    textBox1.Text = info;
            
            }

        }

        private void idTextBox_TextChanged(object sender, EventArgs e)
        {

        }

        // user inputs their id and presses "Go" to pull up their connections list.
        private void button2_Click(object sender, EventArgs e)
        {
            textBox1.Clear();
            listBox1.Items.Clear();
            enteredID = idTextBox.Text; // user input
            uploadList(enteredID);
            
            //Refresh every 10s to upload connnection list in real time
            timer1.Start();

            WelcomeTextBox.Text = "Hello " + returnName(enteredID) + "!!!";

            Console.WriteLine("The Id entered is: " + enteredID);
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        
    }
}