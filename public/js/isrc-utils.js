/**
 * isrcUtils
 */
// var sql = require('mssql');


console.log("isrcutils loaded")
var isrcUtils = {


    /**
     * Properties
     */
    buttons: [],
    preloadedImages: [],
    initialTimeStamp: null,
    data: {
        'uid': 0,
        'duration': 0,
        'date': null,
    },

    dbConfig: {
        user: 'vasanth009@e.ntu.edu.sg',
        password: 't^W^ih3NA8gaE8SMy',
        server: 'clicdb.database.windows.net',
        database: 'clicdb',
        options: {
            encrypt: true, // Necessary for Azure SQL
            trustServerCertificate: false // Change to true if on a local environment
        }
    },





    /**
     * Cordova: receivedEvent()
     */
    // receivedEvent: function (id) {

    //     switch (id) {
    //         case 'deviceready':
    //             this.Setup();
    //             isrcUtils.SetHandlers();
    //             break;
    //     }


    // },


    /**
     * Setup()
     */
    Setup: function () {
        // Routes setup
        var routes = document.querySelectorAll('div.route');
        for (var i = 0; i < routes.length; ++i) {
            routes[i].style.display = 'none';
        }
        var route = document.getElementById('rt-start');
        if (route) route.style.display = 'block';

        // Routes buttons setup
        var buttons = document.querySelectorAll('button[data-href]');
        for (var i = 0; i < buttons.length; ++i) {
            buttons[i].addEventListener('click', isrcUtils.ButtonGoto);
        }

        // Set counter
        if (localStorage.getItem("isrc-utils-counter") === null) {
            localStorage.setItem("isrc-utils-counter", 0);
        } else {
            var count = parseInt(localStorage.getItem("isrc-utils-counter"));
            localStorage.setItem("isrc-utils-counter", count + 1);
        }
    },

    /**
     * SetHandlers()
     */
    SetHandlers: function () {
        isrcUtils.buttons[0] = document.getElementById('btn-initial-form');
        if (isrcUtils.buttons[0]) {
            isrcUtils.buttons[0].addEventListener('click', isrcUtils.InitialFormSubmit);
        }

        isrcUtils.buttons[1] = document.getElementById('btn-app-restart');
        if (isrcUtils.buttons[1]) {
            isrcUtils.buttons[1].addEventListener('click', isrcUtils.Restart);
        }

        isrcUtils.buttons[2] = document.getElementById('stats-records');
        if (isrcUtils.buttons[2]) {
            isrcUtils.buttons[2].addEventListener('click', isrcUtils.SaveDataToFileDialog);
        }
    },

    // Other methods...


    


    /**
	 * enterPinnedMode()
	 */
	// enterPinnedMode() {
	// 	if (typeof cordova !== 'undefined') {
	// 		cordova.plugins.screenPinning.enterPinnedMode(
	// 			function () { console.log('entered pinned mode') },
	// 			function (error) { console.log('error when entering pinned mode: ' + error) },
	// 			true
	// 		);
	// 	}
	// },


    // SetupDb: async function() {
    //     try {
    //         let pool = await sql.connect(this.dbConfig);
    //         await pool.request().query('CREATE TABLE IF NOT EXISTS data (date DATETIME, uid INT, data NVARCHAR(MAX))');
    //         console.log('Created database table OK');
    //         isrcUtils.GetStats(); // Adjust or remove according to your needs
    //     } catch (error) {
    //         console.log('Error setting up the database:', error);
    //     }
    // },



    /**
     * InitialFormSubmit()
     */
    InitialFormSubmit: function () {
        var input = document.getElementById('uid-input');
        if (!input || !input.value.trim()) return;
    
        isrcUtils.data.uid = input.value.trim();
        isrcUtils.initialTimeStamp = new Date();
    
        var topbarUid = document.getElementById('user-id');
        if (topbarUid) topbarUid.innerHTML = 'User ID: ' + isrcUtils.data.uid;
    
        isrcUtils.Goto('page1');
    },
    


    /**
     * ButtonGoto()
     */
    ButtonGoto: function (evt) {
        // Using currentTarget to ensure the correct element is referenced
        var href = evt.currentTarget.getAttribute('data-href');
        
        // Checking if href is not null or undefined
        if (href) {
            isrcUtils.Goto(href);
        }
        return true;
    },
    


    /**
     * Goto()
     */
    Goto: function (href) {
        const route = document.getElementById(href);
        if (route) {
            const routes = document.querySelectorAll('div.route');
            routes.forEach(function (r) {
                r.style.display = 'none';
            });
            route.style.display = 'block';
        }
    },
    


    /**
     * GetCounter()
     */
    GetCounter: function () {
        return localStorage.getItem("isrc-utils-counter") || 0;
    },
    


    /**
     * ArrayShuffle()
     */
    ArrayShuffle: function (array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },


    /**
     * ImagesPreload()
     */
    PreloadImages: function (images) {
        let baseIndex = isrcUtils.preloadedImages.length;
        for (let i = 0; i < images.length; i++) {
            if (!isrcUtils.preloadedImages.includes(images[i])) {
                isrcUtils.preloadedImages[baseIndex + i] = new Image();
                isrcUtils.preloadedImages[baseIndex + i].src = images[i];
            }
        }
    },
    

    // modified till this line will do the rest of the modification tomorrow 

    /**
     * SaveAndEnd()
     */
    SaveAndEnd: function (stimuliData) {
        // merge data from stimuli
        isrcUtils.data = isrcUtils.ExtendObject(isrcUtils.data, stimuliData);
        isrcUtils.Goto('rt-end');
        isrcUtils.SaveData();
    },


    /**
     * Restart()
     */
    Restart: function () {
        location.reload();
    },


    /**
     * SaveData()
     */
    SaveData: function() {

        var currentTimeStamp = new Date();
        // isrcUtils.data.date = currentTimeStamp;
        isrcUtils.data.duration = (currentTimeStamp - isrcUtils.initialTimeStamp) / 1000;
       

        console.log('# Saving Data...');
        console.log(isrcUtils.data);

        isrcUtils.SaveDataToDb();

        isrcUtils.PrintDataDebug();
        
    },


     //Specific to tablet. Removed for publication
     SaveDataToDb: async function() {


        console.log("body",JSON.stringify(isrcUtils.data))
        fetch('/submit-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(isrcUtils.data),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
    },
    



    /**
     * GetStats()
     */GetStats: function () {
    fetch('/api/get-stats')  // Replace with your actual API endpoint
    .then(response => response.json())
    .then(data => {
        var records = data.records;  // Assuming 'records' is returned from the API
        var statsRecords = document.getElementById('stats-records');
        if (statsRecords) statsRecords.innerHTML = 'Records in DB: ' + records;
    })
    .catch(error => {
        console.log('Error fetching stats:', error);
    });
},


    /**
     * DebugData()
     * Debugs data from DB in js console
     */DebugData: function () {
    console.log('# Debug data');

    fetch('/api/debug-data')  // Replace with your actual API endpoint
        .then(response => response.json())
        .then(data => {
            console.log('[DEBUG] DATA FROM DB:');
            data.forEach(item => {
                console.log('#### uid: ' + item.uid + ' on date: ' + item.date + ' ####');
                console.log(item.data);  // Assuming 'data' is the property name in your response
            });
        })
        .catch(error => {
            console.log('Error fetching debug data:', error);
        });
},


    /**
     * SaveDataOnline()
     */
    // SaveDataOnline: function () {
//     fetch('/api/get-data-for-online-save')  // Replace with your actual API endpoint
//     .then(response => response.json())
//     .then(data => {
//         console.log('[ONLINE SAVE DATA]');
//         if (data.length > 0) {
//             // Assuming 'data' is an array of records
//             var records = data.map(item => ({
//                 'date': item.date,
//                 'uid': item.uid,
//                 'data': item.data  // Assuming data is already parsed JSON
//             }));

//             // Post to external server
//             isrcUtils.Post("https://isearch.raimaj.me/ogisrcUtils/savedata.php", {
//                 data: JSON.stringify(records)
//             });
//         }
//     })
//     .catch(error => {
//         console.log('Error fetching data for online save:', error);
//     });
// },



    /**
     * SaveDataToFileDialog()
     */
    SaveDataToFileDialog: function () {
        var userResponse = confirm('Do you want to export the data to a local json file?'); // Standard web confirm dialog
        if (userResponse) {
            isrcUtils.SaveDataToFile(); // Call SaveDataToFile if user confirms
        }
    },
    


    /**
     * SaveDataToFile()
     */
    SaveDataToFile: function () {
        fetch('/api/get-data-for-file')  // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                // Assuming 'data' is an array of records
                var records = data.map(item => ({
                    'date': item.date,
                    'uid': item.uid,
                    'data': item.data // Assuming data is already parsed JSON
                }));
    
                // Prepare data to write in file
                var fileData = {
                    "count": records.length,
                    "records": records
                };
    
                // Create a downloadable file
                var blob = new Blob([JSON.stringify(fileData)], { type: "application/json" });
                var url = URL.createObjectURL(blob);
    
                // Trigger file download
                var a = document.createElement("a");
                a.href = url;
                a.download = 'data.json'; // You can format the filename as needed
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.log('Error fetching data for file:', error);
            });
    },
    


    /**
     * WriteJsonToFile
     */
    WriteJsonToFile: function (filename, data) {
        // Create a Blob from the data
        var blob = new Blob([data], { type: "application/json" });
        var url = URL.createObjectURL(blob);
    
        // Trigger file download
        var a = document.createElement("a");
        a.href = url;
        a.download = filename; // Use the provided filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    


    /**
     * DestroyDb()
     */
    DestroyDb: function () {
        window.sqlitePlugin.deleteDatabase({
                name: 'data.db',
                location: 'default'
            }, function () {
                console.log('DB deleted');
            },
            function () {
                console.log('ERROR in deleting DB');
            });
    },


     /**
     * PrintDataDebug()
     */
    PrintDataDebug: function() {
        var debugOut = document.getElementById('debug-out');
        debugOut.innerHTML =
            "DATA SAVED TO DB" + "<br>" +
            "uid: " + isrcUtils.data.uid + "<br>" +
            "";
    },


    /**
     * Post()
     */
    Post: function (path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.isrcUtilsendChild(hiddenField);
            }
        }

        document.body.isrcUtilsendChild(form);
        form.submit();
    },


    /**
     * ExtendObject()
     */
    ExtendObject: function (obj, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) obj[key] = src[key];
        }
        return obj;
    },


    /**
     * RequestConfirmation()
     */
    RequestConfirmation: function (handlerFunction, evt) {
        var userConfirmed = confirm('Bist du sicher?'); // Standard web confirm dialog
        if (userConfirmed) {
            handlerFunction(evt); // Call the handler function if the user confirms
        }
    },
    

};

// Call the Setup method to set up the initial state of your application.
isrcUtils.Setup();

// Call the SetHandlers method to set up event listeners.
isrcUtils.SetHandlers();

// make a code that prints hello in to console 
// isrcUtils.SetupDb();
