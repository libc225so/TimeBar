<html>
  <head>
  <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

  <script src="js/tooltipx.js"></script>
  <script src="js/TimeBar.js"></script>
  <link rel="stylesheet" href="css/TimeBar.css">
    <style>

      body, 
      .ui-tooltip-content,
      table {
        font-family: 'Work Sans', sans-serif;
        font-size: 14px;
      }

      .fa-p { cursor: pointer; }

      #week,
      #horizon { 
        display: table;
        width: 100%;
      } 

      table {
        width: 100%;
      }

      pre {
        border: 1px solid grey;
      }

      .day,
      #app {
        display: table-cell;
        vertical-align: top;
        text-align:center;
      }

      .ta_left {
        text-align:left;
      }

      .bar .green_hor {
        background: #b4e391;
        background: -moz-linear-gradient(top, #b4e391 0%, #61c419 50%, #b4e391 100%);
        background: -webkit-linear-gradient(top, #b4e391 0%,#61c419 50%,#b4e391 100%);
        background: linear-gradient(to bottom, #b4e391 0%,#61c419 50%,#b4e391 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b4e391', endColorstr='#b4e391',GradientType=0 );
      }

      .bar .green_ver {
        background: #b4e391;
        background: -moz-linear-gradient(left, #b4e391 0%, #61c419 50%, #b4e391 100%);
        background: -webkit-linear-gradient(left, #b4e391 0%,#61c419 50%,#b4e391 100%);
        background: linear-gradient(to right, #b4e391 0%,#61c419 50%,#b4e391 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b4e391', endColorstr='#b4e391',GradientType=1 );
      }

      .bar .fitness {
        background: #b3dced;
        background: -moz-linear-gradient(left, #b3dced 0%, #29b8e5 50%, #bce0ee 100%);
        background: -webkit-linear-gradient(left, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);
        background: linear-gradient(to right, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b3dced', endColorstr='#bce0ee',GradientType=1 );
      }

      .bar .running {
        background: #fac695;
        background: -moz-linear-gradient(left, #fac695 0%, #f5ab66 33%, #ef8d31 52%, #f5ab66 69%);
        background: -webkit-linear-gradient(left, #fac695 0%,#f5ab66 33%,#ef8d31 52%,#f5ab66 69%);
        background: linear-gradient(to right, #fac695 0%,#f5ab66 33%,#ef8d31 52%,#f5ab66 69%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fac695', endColorstr='#f5ab66',GradientType=1 );
      }
    </style>
    <script>


// When Loaded ..
$(document).ready( function()
{
  $(".clear_day").tooltipX({ 
    autoHide:true, 
    autoShow:true, 
  });

  $("#bar1").TimeBar({  strTimeStart       : '9:00',
                        strTimeStop        : '18:00',
                        intTimeSteps       : 15,
                        intOffset          : 20,
                     });

  $("#bar2").TimeBar({  strTimeStart       : '21:00',
                        strTimeStop        : '26:00',
                        intTimeSteps       : 15,
                        strTemplateClick   : 'strTemplateClick',
                        intOffset          : 0,
                        intZoomFactor      : 1,
                        strEnabledClassName : 'green_ver',
                     });

  $("#bar3").TimeBar({  strTimeStart        : '9:00',
                        strTimeStop         : '18:00',
                        intTimeSteps        : 5,
                        intOffset           : 20,
                        strTimeSelectTitle  : 'Kies tijd:',
                        strFrom             : 'van',
                        strTill             : 't/m',
                        strHour             : 'u',
                        intReadOnly         : 1, 
                        strEnabledClassName : 'green_ver',
                     });

  $('#bar3').TimeBar('strEnabledClassName','fitness');
  $('#bar3').TimeBar('Load','10:0','12:30');
  $('#bar3').TimeBar('strEnabledClassName','running');
  $('#bar3').TimeBar('Load','13:0','16:00');


  $("#bar99").TimeBar({ strTimeStart            : '0:00',
                        strTimeStop             : '4:00',
                        intTimeSteps            : 5,
                        intOffset               : 20,
                        strDirection            : "horizontal",
                        strTimeSelectTitle      : 'Kies tijd:',
                        strFrom                 : 'van',
                        strTill                 : 't/m',
                        strHour                 : 'u',
                        intReadOnly             : 0,
                        intZoomFactor           : 3,
                        strEnabledClassName     : 'green_hor',
                      });

});


// Simple global helper function
function ClearDay ( intDayNo )
{
  $('#bar' + intDayNo ).TimeBar('Clear');
}

    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body style="padding:0px;margin:0px;" >
    <div id="main" style="padding:10px;">
      <h2>TimeBar</h2>
      <div style="padding: 0 30px 30px;">
        This is a jQuery plugin which enables selecting a period of time on a bar. I needed a simple component which allows the user to click a start and end time, 
        and I could not find a component that suited my needs, therefor I have build this component.<br>
        On this page you will find some documentation and examples (view source to see how it works). Data is filled inside the last node of the bar. When submitted to 
        the server you only need to grab the array which is named: "arrTimeBar[ nodeId ]".
      </div>

      <div><h3>Examples</h3><hr></div>
      <div>A morning that can be filled with some activity.</div>
      <div style="height:20px;"></div>

      <div id="horizon" >
        <div id="app" class="hours" >
          <div class="bar_title">Hours: <i class="fa fa-times fa-p clr_cancel clear_day" title="Clear Hour- Bar" aria-hidden="true" onclick='ClearDay(99);return false;' ></i></div>
          <div style="height:20px;"></div>
          <div class="bar" id="bar99"></div>
        </div>
      </div>

      <div style="height:40px;"></div>
      <div>A workweek with the days of the week, where you can assign an activities.</div>
      <div style="height:20px;"></div>

      <div id="week">
        <div id="monday" class="day">
          <div class="bar_title">Monday <i class="fa fa-times fa-p clr_cancel clear_day" title="Clear Monday" aria-hidden="true" onclick='ClearDay(1);return false;' ></i></div>
          <div class="bar" id="bar1"></div>
        </div>
        <div id="tuesday" class="day">
          <div class="bar_title">Tuesday <i class="fa fa-times fa-p clr_cancel clear_day" title="Clear Tuesday" aria-hidden="true" onclick='ClearDay(2);return false;' ></i></div>
          <div class="bar" id="bar2"></div>
        </div>
        <div id="wednesday" class="day">
          <div class="bar_title">Wednesday <i class="fa fa-times fa-p clr_cancel clear_day" title="Clear Wednesday" aria-hidden="true" onclick='ClearDay(3);return false;' ></i></div>
          <div class="bar" id="bar3"></div>
        </div>
      </div>

      <div style="height:20px;"></div>
      <div><h3>Documentation</h3><hr></div>
      <div>We will show you briefly: Setup, Options, Methods and dependencies. Furthermore you can find al this example material inside this page as well, just view the source!</div>

      <div><h4>Setup</h4></div>
      <div>
        <pre>
  $("#bar3").TimeBar({  strTimeStart        : '9:00',
                        strTimeStop         : '18:00',
                        intTimeSteps        : 5,
                        intOffset           : 20,
                        strTimeSelectTitle  : 'Kies tijd:',
                        strFrom             : 'van',
                        strTill             : 't/m',
                        strHour             : 'u',
                        intReadOnly         : 1, 
                     });

  // Do some tricks with classes to show different activities when we draw the periods:
  $('#bar3').TimeBar('strEnabledClassName','fitness');
  $('#bar3').TimeBar('Load','10:0','12:30');
  $('#bar3').TimeBar('strEnabledClassName','running');
  $('#bar3').TimeBar('Load','13:0','16:00');
        </pre>
      </div>
      <div><h4>Options</h4></div>
      <div style="height:20px;"></div>
      <div>
          <table>
            <tr>
              <td>Option</td>
              <td>Description</td>
              <td>Values</td>
              <td>Default</td>
            </tr>
            <tr>
              <td colspan="4"><hr></td>
            <tr>
            </tr>
            <tr>
              <td>strTimeStart</td>
              <td>time the bar should start</td>
              <td>"HH:MM"</td>
              <td>"9:00"</td>
            </tr>
            <tr>
              <td>strTimeStop</td>
              <td>time the bar should end</td>
              <td>"HH:MM"</td>
              <td>"18:00"</td>
            </tr>
            <tr>
              <td>intTimeSteps</td>
              <td>pixels used to step into the next period</td>
              <td>0 .. 60</td>
              <td>10</td>
            </tr>
            <tr>
              <td>intOffset</td>
              <td>offsset on begin & end in pixels</td>
              <td>0 .. x</td>
              <td>10</td>
            </tr>
            <tr>
              <td>strDirection</td>
              <td>Direction the bar is drawn</td>
              <td>"horizontal", "vertical"</td>
              <td>"vertical"</td>
            </tr>
            <tr>
              <td>strTimeSelectTitle</td>
              <td>Textual string to announce "Selection of time" in tooltip</td>
              <td>"Select your time:"</td>
              <td>"Select time:"</td>
            </tr>
            <tr>
              <td>strFrom</td>
              <td>Textual string to announce "from" (start time)</td>
              <td>"Start Time from"</td>
              <td>"from"</td>
            </tr>
            <tr>
              <td>strTill</td>
              <td>Textual string to announce "till" (end time)</td>
              <td>"End at time"</td>
              <td>"till"</td>
            </tr>
            <tr>
              <td>strHour</td>
              <td>Textual string to announce "h" (shorthand for hour)</td>
              <td>"h"</td>
              <td>"h"</td>
            </tr>
            <tr>
              <td>intReadOnly</td>
              <td>boolean value to toggle readonly On / Off (readonly means no- editing)</td>
              <td>1 / 0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>intZoomFactor</td>
              <td>Zoomfacor to enlarge / shrink the drawing of the bar</td>
              <td>< 1 || > 1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>strEnabledClassName</td>
              <td>Name of an additional class to use when drawing a period</td>
              <td>"my_fitness_class_name"</td>
              <td>""</td>
            </tr>
          </table>
      </div>

      <div style="height:20px;"></div>
      <div><h4>Methods</h4></div>
      <div>
          <table>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Get / Set</td>
              <td>return value</td>
              <td>argument 1</td>
              <td>argument 2</td>
            </tr>
            <tr>
              <td colspan="6"><hr></td>
            <tr>
            </tr>
            <tr>
              <td>Load</td>
              <td>Load a period onto the TimeBar</td>
              <td>Set</td>
              <td>void</td>
              <td>"HH:MM"</td>
              <td>"HH:MM"</td>
            </tr>
            <tr>
              <td>Clear</td>
              <td>Clear the drawing on a TimeBar</td>
              <td>Set</td>
              <td>void</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>strEnabledClassName</td>
              <td>Name of an additional class to use when drawing a period</td>
              <td>Set</td>
              <td>void</td>
              <td>"fitness"</td>
              <td></td>
            </tr>
            <tr>
              <td>strEnabledClassName</td>
              <td>What is the last Name of an additional class used drawing a period?</td>
              <td>Get</td>
              <td>the classname</td>
              <td></td>
              <td></td>
            </tr>
          </table>
      </div>


      <div style="height:40px;"></div>
      <div><h4>Dependencies</h4></div>
      <div>The TimeBar class relies on "tooltipX". This is a customized tooltip and is included in the download as well. 
      You can customize this to your needs by modifying the css from "css/TimeBar.css".</div>


    </div>
  </body>
</html>
