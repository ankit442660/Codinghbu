
    { "version": 4, 
      "builds":[
      {
        "src":"./index.js",
        "use":"@vercel/node"
    }
  ],
  "routes":[
    {
      "src":"/(.*)",
      "dest":"/"
    }
  ]
    }    
      
