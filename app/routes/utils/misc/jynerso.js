var models = require("../../../models/");
var express = require("express");
var beautify = require('js-beautify').js;
var html_beautify = require('js-beautify').html_beautify;
var router = express.Router();
var config = require("../../../config/config.json");
var Sequelize = require("sequelize");
var connections = require("../../../config/db");
var SqlString = require("sqlstring");
var sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  { dialect: "postgres" }
);

var Promise = require("bluebird");

(http = require("http")),
  (fs = require("fs")),
  (util = require("util")),
  (Busboy = require("busboy"));
(os = require("os")), (path = require("path")), (csv = require("fast-csv"));
crypto = require("crypto");
var d = new Date();

var serverdat = { name: d.toString() };

const { spawn } = require('child_process');


let pgcreateDb = function () {


  const fs = require('fs');
  const child_process = require('child_process');

  var spawn_process_cmd = 'yarn applychangesDB'
  child_process.exec(spawn_process_cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      process.exit(1);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    process.exit(0);
  });


}

router.post("/jedha", function (req, res) {


  var mainapp = req.body;
  applyMultiControls(mainapp).then(function (data) {
    res.json({ a: "a" })
  })
  // applymodel(mainapp)
  //   .then(applyApp)
  //   .then(applyroutes)
  //   .then(applyserverValidationConfig)
  //   .then(swaggerdocs)
  //   //.then(applyclientJS)
  //   .then(applyMultiControls)
  //   .then(applyhtml)
  //   .then(createdb)
  //   .then(function (data) {
  //     pgcreateDb();
  //     res.json({ a: "a" })
  //   })

});


function createdb(mainapp) {
  return new Promise((resolve, reject) => {
    var baseobj = {};
    baseobj.mname = mainapp[0].datapayloadModulename.toString().trim();
    var models = require("../../../models/index");
    models.sequelize.sync().then(function () {
      models.modname.create(baseobj).then(function () {
        resolve(mainapp)
      })

    }
    );
  })
}
function applyMultiControls(mainapp) {
  return new Promise((resolve, reject) => {
    var appsgenerator = fs.readFileSync('../ref/public/admin/js/app/app_employees.js', 'utf8');
    var based = mainapp[0].server_client
    based = based.filter(function (doctor) {
      return doctor.inputtype != "textbox"; // if truthy then keep item
    })
    console.log(based.length)
    if (based.length <= 1) {
      var currentMod = "let currentMod{modulename}=\"{modulename}\""
      var currentModId = "let currentMod{modulenameid}=\"{modulenameid}\""
      //definition
      var currentInitialization = "getcurrentMod{modulename}groupby: '/' + currentMod{modulename} + '/api/searchtypegroupby/',"
      //initialization

      //implementation
      var currentImplementation = `
    getcurrentMod{modulename}groupby: function(base) {
      ajaxbase.payload = base.datapayload
      ajaxbase.url = baseurlobj.getcurrentMod{modulename}groupby;
      return ajaxutils.basepostmethod(ajaxbase).then(function(argument) {
          ajaxbase.response = argument;
          return argument;
      })
    },`


      var a = ""
      var b = ""
      var c = ""
      var d = ""
      var e = ""
      mainapp[0].server_client.forEach(element => {
        //server_client.forEach(element => {

        if (element.inputtype != "textbox") {
          filters=filters.replace("multiselect",element.inputtype)
          multiControlsScripts=multiControlsScripts.replace("//inputType","\n //inputType \n" +filters)
          if (a == "") {
            a = currentMod.replace(/{modulename}/g, element.inputtypemod)
            b = currentModId.replace(/{modulenameid}/g, element.inputtypeID)
            c = currentInitialization.replace(/{modulename}/g, element.inputtypemod)
            d = currentImplementation.replace(/{modulename}/g, element.inputtypemod)
            d = currentImplementation.replace(/{modulename}/g, element.inputtypemod)
            e = groupbyControlsPopulate(element.inputtypemod)
            
            

          }
          else {
            a = a + "\n" + currentMod.replace(/{modulename}/g, element.inputtypemod)
            b = b + "\n" + currentModId.replace(/{modulenameid}/g, element.inputtypeID)
            c = c + "\n" + currentInitialization.replace(/{modulename}/g, element.inputtypemod)
            d = d + "\n" + currentImplementation.replace(/{modulename}/g, element.inputtypemod)
            e = e + "\n" + groupbyControlsPopulate(element.inputtypemod)
          
          }




        }

      })
      if (a != "") {
        appsgenerator = appsgenerator.replace(/definition/g, "\n" + a + "\n" + b);
        appsgenerator = appsgenerator.replace(/initialization/g, "\n" + c);
        appsgenerator = appsgenerator.replace(/implementation/g, "\n" + d);
        appsgenerator = appsgenerator.replace(/groupBySets/g, "\n" + e);
        var replaces = `let basemod_modal = {afterhtmlpopulate: function() {}}`
        
        appsgenerator = appsgenerator.replace(replaces, "\n" + multiControlsScripts);
      }
    }


    appsgenerator = appsgenerator.replace(/employees/g, mainapp[0].datapayloadModulename);
    fs.writeFile('../public/admin/js/app/app_' + mainapp[0].datapayloadModulename + '.js', (beautify(appsgenerator, { indent_size: 2 })), function (err, data) {
      resolve(mainapp)

    })
  })
}
function applyclientJS(mainapp) {
  return new Promise((resolve, reject) => {
    var appsgenerator = fs.readFileSync('../ref/public/admin/js/app/app_employees.js', 'utf8');
    appsgenerator = appsgenerator.replace(/employees/g, mainapp[0].datapayloadModulename);
    fs.writeFile('../public/admin/js/app/app_' + mainapp[0].datapayloadModulename + '.js', (beautify(appsgenerator, { indent_size: 2 })), function (err, data) {
      resolve(mainapp)

    })
  })
}
/* multi control part in process */
let groupbyControlsPopulate = function (modname) {
  let groupbyControlsPopulate = `employeesMultiKeysLoad:function(keys)
  {
      //keys="gender"
     base.datapayload=baseloadsegments.basePopulateMultiControls(keys)
     return this
     .getpaginatesearchtypegroupby(base)
     .then(function (argument) {
         return argument
     })
  },`
  groupbyControlsPopulate = groupbyControlsPopulate.replace("employees", modname)
  groupbyControlsPopulate = groupbyControlsPopulate.replace(`getpaginatesearchtypegroupby`, `getcurrentMod${modname}groupby`)
  return groupbyControlsPopulate
}
var filters=`if (element.inputtype == "multiselect") {
  //codehere
}`
var multiControlsScripts = `let basemod_modal = {
  modalpopulate: function() {
    var interset = validationmap
    let redlime = doChunk(interset, 2)
    $("#overlaycontent").empty();
    var htmlcontent = "";
    redlime.forEach(function(item) {

        htmlcontent += \`<div class=\"row\">\`
        item.forEach2(function(element) {

             //inputType
             else {
                htmlcontent += \`<div class="form-group overlaytxtalign col-md-5">
                    <div class="col-sm-15">
                    <label class="lblhide" id="lblmsg\${element.inputtextval}">
                    <i class="fa fa-bell-o"></i> Input with warning
                    </label>
                    <input type="text" data-attribute="' + element.fieldvalidatename + '" class="form-control" maxLength="\${element.fieldmaxlength}"
                    data-form-type="false" onkeyup="javascript:reqops.formvalidation(this)" id="cltrl' + element.inputtextval + '" placeholder="\${element.inputplaceholder.capitalize()}">
                    </div></div>\`;
            }

        })
        htmlcontent += \`</div>\`
    })

    var chkcontent = \`<input type="hidden" name="\${currentmoduleid}" value="0" id="cltrl\${currentmoduleid}"> <div class="form-group overlaytxtalign col-md-5">
        <div class="col-sm-offset-2 col-sm-15">
        <div>
        <label>
        \${this.baseCheckbox}
        </label>
        </div>
        </div>
        </div>\`;

    $("#overlaycontent").html(htmlcontent + chkcontent);
},
baseCheckbox:\`<div class="checkbox tablechk">
   <label>
   <input type="checkbox" id="cltrlrecordstate" onclick="javascript:tableops.onchk(this)" value=true> Remember me
   <span class="checkbox-material">
   </span> 
   </label>
   </div>\`
  ,
     afterhtmlpopulate: function() {
         $('#basetable tbody tr td:last-child').attr('onclick', 'javascript:basemod_modal.ontdedit(this)')
         $('#basetable tbody tr td:nth-child(1) input:checkbox').attr('onclick', 'javascript:basemod_modal.tablechkbox(this)')
         //$("a[href='#sales-chart'").hide()
     },
     ontdedit: function(arg) {

         var armodid = $(arg).attr('data-tbledit-type')
         ajaxbase.isedit = true;
         var interncontent = ajaxbase[currentmodulename].rows;

         interncontent = interncontent.filter(function(doctor) {
             return doctor[currentmoduleid] == armodid;
         })
         base.editrecord = interncontent;
         $('#cltrl' + currentmoduleid).val(armodid);
         var formatresponse = this.formatresponse(interncontent);

         formatresponse.forEach2(function(data) {

             if (data.inputtype == "textbox") {
                 $("#cltrl" + data.inputtextval).val(data.vals)
                 $("#cltrl" + data.inputtextval).removeAttr('data-form-type');
             }  else if (data.inputtype == "multiselect") {

                
             }
         })
         //active comma denominator
         //console.log(interncontent[0].recordstate)
         if (interncontent[0].recordstate) {
             $('#cltrlrecordstate').prop('checked', true);
             $('#cltrlrecordstate').val(true);
             base.datapayload.recordstate = true
         } else {
             $('#cltrlrecordstate').prop('checked', false);
             $('#cltrlrecordstate').val(false);
             base.datapayload.recordstate = false
         }
         $("#btnbutton").click();
     },
     tablechkbox: function(arg) {},
     formatresponse: function(data) {

         var res = this.formatserverfieldmap(data)
        
         var result = equijoin(res, validationmap, "key", "inputtextval",
             ({
                 vals
             }, {
                 inputtype,
                 inputtextval,
                 inputname
             }) => ({
                 inputtype,
                 inputtextval,
                 inputname,
                 vals
             }));

         return result;
     },
     formatserverfieldmap: function(data) {

         var applyfield = applyfields;
         var res = data.map(function(data) {
             return applyfield.map(function(da) {

                 var y = (data[da].indexOf(',') != -1 ? data[da].split(',') : data[da]);

                 return {
                     key: da,
                     vals: y
                 }
             })
         })[0]
         return res;
     },
     
 }`

function applyhtml(mainapp) {
  return new Promise((resolve, reject) => {
    var appsgenerator = fs.readFileSync('../ref/views/employees/employees.html', 'utf8');
    appsgenerator = appsgenerator.replace(/employees/g, mainapp[0].datapayloadModulename);


    var dir = '../views/' + mainapp[0].datapayloadModulename
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, function (err, data) {
        fs.writeFile(dir + '/' + mainapp[0].datapayloadModulename + '.html', (html_beautify(appsgenerator, { indent_size: 2 })), function (err, data) {
          resolve(mainapp)
        })
      })
    }
    else {
      fs.writeFile(dir + '/' + mainapp[0].datapayloadModulename + '.html', (html_beautify(appsgenerator, { indent_size: 2 })), function (err, data) {
        resolve(mainapp)
      })
    }


  })
}
function applyroutes(mainapp) {
  return new Promise((resolve, reject) => {
    var appsgenerator = fs.readFileSync('../utils/app.js', 'utf8');
    var filename = mainapp[0].datapayloadModulename

    var geti = "app.use('/" + filename + "', " + filename + ");"
    var interns = geti + '\n/*routesecondary*/';

    appsgenerator = appsgenerator.replace('/*routesecondary*/', interns);

    var secondinterns = "let " + filename + "= require(\'../routes/" + filename.trim() + "\');";
    var terinterns = secondinterns + '\n/*routeprimary*/'

    appsgenerator = appsgenerator.replace('/*routeprimary*/', terinterns);
    fs.writeFile('../utils/app.js', appsgenerator, function (err, data) {

      resolve(mainapp)
    })
  })
}
function applyApp(mainapp) {
  return new Promise((resolve, reject) => {
    var appsgenerator = fs.readFileSync('../ref/routes/employees.js', 'utf8');
    appsgenerator = appsgenerator.replace(/employees/g, mainapp[0].datapayloadModulename);
    fs.writeFile('../routes/' + mainapp[0].datapayloadModulename + '.js', (beautify(appsgenerator, { indent_size: 2 })), function (err, data) {
      resolve(mainapp)

    })
  })
}
function applymodel(mainapp) {
  return new Promise((resolve, reject) => {
    var appsgenerator = fs.readFileSync('../ref/models/employees.js', 'utf8');
    var basetemplate = ""
    mainapp[0].server_client.forEach(element => {

      if (basetemplate == "") {
        basetemplate = element.inputname + ": {type: DataTypes." + element.fieldtypename + " , allowNull: true }";
      }
      else {
        basetemplate = basetemplate + "," + element.inputname + ": {type: DataTypes." + element.fieldtypename + " , allowNull: true }";
      }

    });
    basetemplate = basetemplate + "," + mainapp[0].datapayloadModulename + "id: {" +
      "type: DataTypes.INTEGER," +
      "allowNull: false," +
      "primaryKey: true," +
      "autoIncrement: true }";
    appsgenerator = appsgenerator.replace(/plotcolumns/g, basetemplate);
    appsgenerator = appsgenerator.replace(/employees/g, mainapp[0].datapayloadModulename);
    fs.writeFile('../models/' + mainapp[0].datapayloadModulename + '.js', (beautify(appsgenerator, { indent_size: 2 })), function (err, data) {
      resolve(mainapp)

    })
  })
}
function applyserverValidationConfig(mainapp) {
  return new Promise((resolve, reject) => {
    var appsgenerator = fs.readFileSync('../ref/routes/utils/validationConfig.js', 'utf8');
    var filename = mainapp[0].server_client
    var applyFields = filename.map(function (doctor) {
      return doctor.inputname
    });

    filename = JSON.stringify(filename, null, 2).replace(/\"([^(\")"]+)\":/g, "$1:");
    applyFields = JSON.stringify(applyFields, null, 2);
    appsgenerator = appsgenerator.replace('applyfieldsMap', applyFields);
    appsgenerator = appsgenerator.replace('validationmapMap', filename)
    var dir = '../routes/utils/' + mainapp[0].datapayloadModulename
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, function (err, data) {
        fs.writeFile('../routes/utils/' + mainapp[0].datapayloadModulename + '/validationConfig.js', (beautify(appsgenerator, { indent_size: 2 })), 'utf8', function (err, data) {
          console.log(err)
          resolve(mainapp)

        })

      });
    }
    else {
      fs.writeFile('../routes/utils/' + mainapp[0].datapayloadModulename + '/validationConfig.js', (beautify(appsgenerator, { indent_size: 2 })), 'utf8', function (err, data) {
        console.log(err)
        resolve(mainapp)

      })
    }


  })
}
function swaggerdocs(mainapp) {
  return new Promise((resolve, reject) => {
    var yaml = require('js-yaml');
    var fs = require('fs');
    modname = mainapp[0].datapayloadModulename
    // Get document, or throw exception on error
    try {
      fs.readFile('../utils/docs/emp.yaml', 'utf8', function (err, contents) {
        var doc = yaml.safeLoad(contents);


        //let peopleArray = Object.keys(doc).map(i => doc[i])
        let peopleArrayString = JSON.parse(JSON.stringify(doc).replace(/employees/g, modname))
        doc = peopleArrayString
        var red = mainapp[0].swagger

        var internObj = red.map(function (doctor) {
          var keyname = doctor.fieldname
          delete doctor.fieldname;
          return {
            [keyname]: doctor
          };
        });



        //convert array to js 

        var newObj = internObj.reduce((a, b) => Object.assign(a, b), {})



        doc.paths = peopleArrayString.paths
        doc.definitions[modname]["properties"] = newObj;

        doc.definitions[modname + "Id"] = peopleArrayString.definitions[modname + "Id"]
        fs.writeFile("../utils/docs/" + modname + ".yaml", yaml.safeDump(doc), function (err, data) {
          if (err) {
            console.log(err)
          }
          else {

            resolve(mainapp)
          }
        });

      });

    } catch (e) {
      console.log(e);
    }
  })

}

module.exports = router;
