const inquirer = require('inquirer');
var mysql = require("mysql");
const { listenerCount } = require('process');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "SQLRoot2020!",
  database: "greatBay_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    init()
    .then((answer)=>{
        if(answer.bidorpost==="Post"){
            console.log("Post");
        } else {
            displayItems();
            
            bidinit()
            .then(readItem(bid.item))
            //res.bid === bid in the table is
            }
    })
  })

  function displayItems() {
    console.log("Displaying items...\n");
    connection.query("SELECT * FROM item", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    });
  }

  function createItem() {
    console.log("Inserting a new item...\n");
    var query = connection.query(
      "INSERT INTO item SET ?",
      {
        name: "Headphones",
        description: "BOSE Noise cancelling headphones",
        bid: 50
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " product inserted!\n");
      }
    );
    displayItems();
    connection.end();
  }

  function init(){
      return inquirer.prompt(bidPost);
  }

  let bidPost = [
      {
          type: "list",
          message: "Do you want to post, or bid?",
          name: "bidorpost",
          choices:[
              "Post",
              "Bid"
          ]
      },
  ]

  function bidinit(){
      return inquirer.prompt(bid)
  }

  let bid = [
    {
        type:"input",
        message:"Which item would you like to bid on?\n",
        name:"item"
    },
      {
          type:"input",
          message:"How much do you want to bid? (US dollar rounded to nearest dollar)",
          name:"newbid"
      }
  ]

  function updateBid() {
    console.log("Checking on your bid amount...\n");
    var query = connection.query(
      "UPDATE item SET ? WHERE ?",
      [
        {
            bid: 100
        },
        {
            name: "item"
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " products updated!\n");
      }
    );
  }

  function readItem(item) {
    connection.query("SELECT * FROM item WHERE ?",
    {
        name: item
    },
     function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    });
  }
