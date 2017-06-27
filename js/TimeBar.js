
if ( !$.fn.TimeBar  ) 
{
  (function( $ ){

    var defaults = {
        strTimeStart            : '9:00',
        strTimeStop             : '18:00',
        intTimeSteps            : 5,
        intOffset               : 10,
        strDirection            : 'vertical',
        strTimeSelectTitle      : 'Select time:',
        strFrom                 : 'from',
        strTill                 : 'till',
        strHour                 : 'h',
        intPreventClickSelected : 1,
        strEnabledClassName     : '',
        intReadOnly             : 0,
        intZoomFactor           : 1,
        arrIndicators           : ['00'],
        arrIndicatorTexts       : ['00'],
    };

    function getOption(inst, name) 
    {
      var obj = inst.data("TimeBar");
      return (obj || defaults)[name];
    }

    function setOption(inst, name, value) 
    {
        var obj = inst.data("TimeBar");
        if (!obj) 
        {
          obj = $.extend({}, defaults);
          inst.data("TimeBar", obj);
        }
        obj[name] = value;
    }

    // to avoid trouble with timezones ..

    function getTimeFromTimeStamp ( intTimeStampIn, blnDressUp )
    {
      var strHours   = '0' + parseInt( intTimeStampIn / 3600 );
      var strMinutes = '0' + ( ( intTimeStampIn - ( parseInt(strHours) * 3600)) / 60 );
      var strTime    = strHours.substr(-2) + ':' + strMinutes.substr(-2);

      if ( ( typeof blnDressUp !== "undefined" ) && blnDressUp )
      {
        // 25:00h => 1:00h
        strHours = parseInt (( intTimeStampIn / 3600 ) % 24 );
        strTime  = strHours + ':' + strMinutes.substr(-2);
      }

      return strTime;
    }

    function getTimeStampFromTime ( strTimeIn )
    {
      var arrTimeParts = strTimeIn.split(':'); // '26:30'
      var intHours     = parseInt( arrTimeParts[0]) * 3600;
      var intMinutes   = parseInt( arrTimeParts[1]) % 3600;
      var intTimeStamp = intHours + intMinutes;
      return intTimeStamp;
    }

    function getHourFromTime ( strTimeIn, blnDressUp )
    {
      var arrTimeParts = strTimeIn.split(':'); // '26:30'
      var strHours     = '0' + arrTimeParts[0];
          strHours     = strHours.substr(-2);

      if ( ( typeof blnDressUp !== "undefined" ) && blnDressUp )
      {
        // 01:00h => 1:00h
        strHours  = parseInt(strHours);
        strHours  = strHours  % 24;
      }

      return strHours;
    }

    function getMinutesFromTime ( strTimeIn )
    {
      var arrTimeParts = strTimeIn.split(':'); // '26:30'
      var strMinutes   = '0' + arrTimeParts[1];
          strMinutes   = strMinutes.substr(-2);
      return strMinutes;
    }



    var methods = {
        init : function(options) 
               {
                 // console.log ('TimeBar::Constructor');

                 // Store the constructor parameters as privates
                 this.data("TimeBar", $.extend({}, defaults, options));

                 var arrConfig = $.extend({
                                   strTimeStart        : '0',
                                   strTimeStop         : '0',
                                   intTimeSteps        : 0,
                                   intOffset           : 10,
                                   strDirection        : 'vertical',
                                   strHour             : 'h',
                                   strEnabledClassName : '',
                                   intReadOnly         : 0,
                                   intZoomFactor       : 1,
                                   arrIndicators       : ['00'],
                                   arrIndicatorTexts   : ['00'],
                                 }, options );


                 var strHtml               = '';
                 var strSenderId           = this.attr("id");
                 var intTimeSteps          = arrConfig.intTimeSteps * 60;


                 // Horizontal / Vertical ??
                 var strDirection = 'height';
                 if ( arrConfig.strDirection == 'horizontal' )
                 {
                   strDirection = 'width';
                   $('#' + strSenderId ).addClass("bar_horizontal");
                 }
                 else
                 {
                   arrConfig.strDirection = 'vertical';
                   $('#' + strSenderId ).addClass("bar_vertical");
                 }


                 // Prepend an Offset ..
                 if ( parseInt(arrConfig.intOffset) > 0 )
                 {
                   strHtml += '<div class="offset_before" style="' + strDirection + ':' + arrConfig.intOffset + 'px;"></div>';
                 }

                 // Build a nice for .... ( getOption(this, 'intReadOnly') )
                 var intStartTimeStamp	= getTimeStampFromTime( arrConfig.strTimeStart );
                 var intEndTimeStamp    = getTimeStampFromTime( arrConfig.strTimeStop );

                 // console.log ('TimeBar::Constructor: Building bar from intStartTimeStamp:' + intStartTimeStamp + ', intEndTimeStamp:' + intEndTimeStamp );

                 // Start Looping
                 var intIndx = 0;
                 for ( var i = intStartTimeStamp; i <= intEndTimeStamp ; i += intTimeSteps  )
                 {
                    var strTime       = getTimeFromTimeStamp( i, true );
                    var arrTimeParts  = strTime.split(':');

                    // Add some Indicators
                    if ( arrConfig.arrIndicators.indexOf(arrTimeParts[1]) > -1 ) // search "15" in array
                    {
                      var strMarginLeft = '';
                      if ( arrConfig.strDirection == 'horizontal' )
                      {
                        strMarginLeft = 'style="margin-left:' + ( parseInt(arrConfig.intOffset) + ( arrConfig.intZoomFactor * intIndx * arrConfig.intTimeSteps ) ) + ';"';
                      }

                      var strIndicatorText = '';
                      if ( arrConfig.arrIndicatorTexts.indexOf(arrTimeParts[1]) > -1 )
                      {
                        strIndicatorText   = strTime + arrConfig.strHour;
                      }

                      strHtml        += '<div class="hour_indicator_' + arrConfig.strDirection + '" ' + strMarginLeft + '>' + strIndicatorText + '</div>';
                    }

                    // If this is our last one, we should add a different background class ...
                    var strExtraCss = '';
                    if ( i == intEndTimeStamp )
                    {
                      strExtraCss = ' default_background_color';

                      // Take car of our offset period's
                      if ( parseInt(arrConfig.intOffset) == 0 )
                      {
                        strExtraCss  += ' offset_after';
                      }
                    }

                    var strFullTime  = '0' + strTime;
                        strFullTime  = strFullTime.substr(-5);
                    strHtml          += '<div time="' + strFullTime + arrConfig.strHour + '" title="' + strFullTime + arrConfig.strHour + 
                                        '" id="' + strSenderId  + '_' + intIndx + '" ' + 'class="timebar_unit ' + strSenderId + '_unit' + strExtraCss + 
                                        '" style="' + strDirection + ':' + arrConfig.intZoomFactor * arrConfig.intTimeSteps + 'px;" ts="' + i + '" ></div>';

                   intIndx++;
                 }

                 // Always add 1 unit at the end to allow them to select until the Last valid time ..

                 // Append an Offset ..
                 if ( parseInt(arrConfig.intOffset) > 0 )
                 {
                   // Correct the offset with the height of the Last drawn unit
                   strHtml += '<div class="offset_after" style="' + strDirection + ':' + ( 3 + parseInt(arrConfig.intOffset) - ( arrConfig.intZoomFactor * arrConfig.intTimeSteps )) + 'px;"></div>';
                 }


                 // Also attach a hidden div to store our inputs..
                 strHtml += '<div style="display:none;" id="' + strSenderId  + '_storage"></div>';
                 this.html(strHtml);


                 // Setup OnClick
                 if ( parseInt(getOption(this, 'intReadOnly') ) == 0 )
                 {
                   // Add onclick event to any generated "timebar_unit"
                   $("." + strSenderId + "_unit").on("click", function () 
                                                              {
                                                                $('#'+ strSenderId).TimeBar('Popup', this );
                                                              });
                 }

               },
        Popup : function( objSender ) 
                {
                  var strSenderId = "#" + objSender.id;
                  var intTsStart  = $( strSenderId ).attr("ts");

                  // console.log ('TimeBar::Popup Knows strTimeStart:' + intTsStart );

                  // If this is a selected period and: intPreventClickSelected : 1, we will bail..
                  if ( $( strSenderId ).hasClass("enabled") && ( parseInt (getOption(this, 'intPreventClickSelected')) == 1 ) )
                  {
                    // console.log ('We bail, because of instruction: intPreventClickSelected = 1');
                    return;
                  }


                  $( strSenderId ).tooltipX({ 
                    autoHide:false, 
                    autoShow:true, 
                  });

                  var strParentNodeId      = $(objSender).parent().attr("id");

                  // Build a double selectbox to select hours and minutes
                  var strHtmlTimeSelection = $(objSender).parent().TimeBar("BuildTimeSelectBox", $(objSender).attr("ts") );

                  var strToolTipContent    = '<div style="text-align:center;">' + getOption(this, 'strTimeSelectTitle') + '<hr></div> ' +
'<div id="' + $(objSender).attr("id") + '_time_container">' +
'<i onclick=\'$( "' + strParentNodeId + '" ).TimeBar("DecreaseTime",this.nextElementSibling, this.nextElementSibling.nextElementSibling);\' ' +
'class="fa fa-chevron-left fa-p" aria-hidden="true"></i>&nbsp;' + strHtmlTimeSelection + '&nbsp;' +
'<i onclick=\'$( "' + strParentNodeId + '" ).TimeBar("IncreaseTime",this.previousElementSibling.previousElementSibling, this.previousElementSibling);\' ' +
'class="fa fa-chevron-right fa-p" aria-hidden="true"></i><br><br></div>' +
'<div style="text-align:center;">' + 
'<i class="fa fa-times fa-2x fa-p clr_cancel" aria-hidden="true" onclick=\'$( "' + strParentNodeId + '" ).TimeBar("ClosePopup","' + objSender.id + '");\' ></i>&nbsp;' + 
'<i class="fa fa-check fa-2x fa-p clr_ok" aria-hidden="true" onclick=\'$( "' + strParentNodeId + '" ).TimeBar("Mark","' + objSender.id + 
'",$(\"#' +  $(objSender).attr("id") + '_time_container\").find(\".select_hour\").val(),$(\"#' +  $(objSender).attr("id") + 
'_time_container\").find(\".select_minute\").val());\' ></i></div>';

                  // Pass it on ..
                  $( strSenderId ).tooltipX( "option", "content", strToolTipContent );
                  $( strSenderId ).tooltipX( "open" );

                },
        Mark: function( strUnitId, intHourIn, intMinuteIn ) 
              {
                // console.log ('TimeBar::Mark: Need to MARK unit time: ' + intHourIn + ':' + intMinuteIn + ' and close & clear Popup from unit arguments strHourIn:' + intHourIn + ', intMinuteIn:' + intMinuteIn );

                var strTimeFromAtrributes   = $('#' + strUnitId).parent().attr("strPreviousSelectedTime" ); 
                var strPreviousSelectedTime = '';

                if ( ( typeof strTimeFromAtrributes === 'undefined' ) || ( strTimeFromAtrributes == '' ) )
                {
                  $('#' + strUnitId).parent().attr("strPreviousSelectedTime", intHourIn + ':' + intMinuteIn ); 
                }
                else
                {
                  strPreviousSelectedTime = $('#' + strUnitId).parent().attr("strPreviousSelectedTime" );
                  $('#' + strUnitId).parent().attr("strPreviousSelectedTime", '' ); 
                }


                if ( strPreviousSelectedTime != '' )
                {
                  // console.log ('TimeBar::Mark: Paint + Reset');

                  // First: Close and Kill the Popup
                  $('#' + strUnitId).parent().TimeBar("ClosePopup", strUnitId );

                   // Second: Paint What we have to paint
                   $('#' + strUnitId).parent().TimeBar( "Paint", 
                                                        strPreviousSelectedTime, 
                                                        intHourIn + ':' + intMinuteIn );

                }
                else
                {
                  // Close and Kill the Popup
                  $('#' + strUnitId).parent().TimeBar("ClosePopup", strUnitId );
                }

              },
        Clear: function() 
               {
                 // console.log ('TimeBar::Clear: Need to PAINT (reset) ALL' );

                 // Bail when read-only mode is enabled ..
                 if ( parseInt(getOption(this, 'intReadOnly') ) == 1 )
                 {
                   return;
                 }

                 var strMyId = this.attr("id");

                 $('#'+ strMyId).children('.timebar_unit').each(function () {

                   if ( this.classList.contains ('enabled') )
                   {
                     // console.log ('TimeBar::Clear: Unit was Enabled:' + this.id );

                     $('#' + this.id ).attr("title", $('#' + this.id ).attr("time") );

                     // Close the ToolTip / Popup
                     $('#' + this.id ).tooltipX("close");

                     // Remove it as well
                     $('#' + this.id ).tooltipX('destroy');

                     // Walk the class list and remove any which has to do with enabled ...
                     var arrPurge = new Array();
                     for ( var i = 0; i < this.classList.length ; i++ )
                     {
                       var strClassName = this.classList[i];

                       // These are "ours" .. 'timebar_unit bar2_unit' hands off, any other WIPE em ..
                       if ( ( strClassName.indexOf( 'timebar_unit') == -1 ) && 
                            ( strClassName.indexOf( strMyId + '_') == -1 ) )
                       {
                         arrPurge.push (strClassName);
                       }
                     }

                     // Purge the "other" classes ..
                     for ( var p = 0; p < arrPurge.length ; p++ )
                     {
                       this.classList.remove( arrPurge[p] );
                     }

                   }

                   this.classList.remove('enabled');
                 });

                 // Last but not least .. whipe the storage area
                 $('#'+ this.attr("id") + '_storage').html('');
               },
        ClosePopup: function( strUnitId ) 
                    {
                      // console.log ('TimeBar::ClosePopup: Need to close & clear Popup from unit: ' + strUnitId );

                      // Close the ToolTip / Popup
                      $('#' + strUnitId ).tooltipX("close");

                      // Remove it as well
                      $('#' + strUnitId ).tooltipX('destroy');
                    },
        Load: function( strTimeFrom, strTimeEnd ) 
              {
                // console.log ('TimeBar::Load: Need to load times From:' + strTimeFrom + ', strTimeEnd:' + strTimeEnd );

                if ( strTimeFrom instanceof Array )
                {
                  // console.log ('TimeBar::Load: Input given is type ARRAY !');
                  for ( var i = 0; i < strTimeFrom.length ; i++ )
                  {
                    // Determine if we have 2 or 3 elements ( 3 elements mean, set the type as in classname )
                    var intEntryLength = strTimeFrom[i];

                    if ( intEntryLength == 2 )
                    {
                      // TimeBar::Load: Need to PAINT from From: 14:0 Till:15:0
                      $('#' + this.attr("id")).TimeBar( "Paint", 
                                                        strTimeFrom[i]["from"], 
                                                        strTimeFrom[i]["till"]);
                    }
                    else
                    {
                      // Set: strEnabledClassName
                      $('#' + this.attr("id")).TimeBar('strEnabledClassName',strTimeFrom[i]["type"]);

                      // TimeBar::Load: Need to PAINT from From: 14:0 Till:15:0
                      $('#' + this.attr("id")).TimeBar( "Paint", 
                                                        strTimeFrom[i]["from"], 
                                                        strTimeFrom[i]["till"]);
                    }
                  }
                }
                else
                {
                  // TimeBar::Load: Need to PAINT from From: 14:0 Till:15:0
                  $('#' + this.attr("id")).TimeBar( "Paint", 
                                                    strTimeFrom, 
                                                    strTimeEnd);
                }
              },
        Dump: function() 
              {
                // console.log ('TimeBar::Dump: Need to Dump all Data');
                var arrData = [];

                // Walk the Data Nodes 
                var objData = $('#'+ this.attr("id")  + '_storage').children();

                for ( var y = 0; y < objData.length ; y++ )
                {
                  var objNode         = objData[y];
                  var arrSplittedName = objNode.name.split("[");

                  var arrSplitIndex   = arrSplittedName[2].split("]");
                  var intIndex        = parseInt(arrSplitIndex[0]);

                  if ( objNode.name.indexOf("from") > 0 )
                  {
                    arrData[intIndex]         = [];
                    arrData[intIndex]['from'] = '';
                    arrData[intIndex]['till'] = '';
                    arrData[intIndex]['type'] = '';

                    arrData[intIndex]['from'] = objNode.value;
                  }
                  else if ( objNode.name.indexOf("till") > 0  )
                  {
                    arrData[intIndex]['till'] = objNode.value;
                  }
                  else if ( objNode.name.indexOf("type") > 0 )
                  {
                    arrData[intIndex]['type'] = objNode.value;
                  }
                }

                // Deliver
                return arrData;
              },
        Paint: function( strFrom, strTill ) 
               {
                 // console.log ('TimeBar::Paint: Need to PAINT From: ' + strFrom + ' Till: ' + strTill );

                 var intTimeSteps             = parseInt(getOption(this, 'intTimeSteps'));
                 var arrNodesPainted          = new Array ();
                 var strFirstTime             = '';
                 var strLastTime              = '';
                 var intTsFrom                = 0;
                 var intTsTill                = 0;
                 var blnWorking               = false;
                 var strExtraEnabledClassName = getOption(this, 'strEnabledClassName');
                 var strFixedTimeFrom         = getHourFromTime(strFrom) + ':' + getMinutesFromTime(strFrom);
                 var strFixedTimeTill         = getHourFromTime(strTill) + ':' + getMinutesFromTime(strTill);


                 // Go Scroll the Bar to figure out how they selected time .. UP | DOWN ..
                 var objBar = $('#'+ this.attr("id") ).children();
                 for ( var y = 0; y < objBar.length ; y++ )
                 {
                   var objNode = objBar[y];

                   if ( objNode.classList.contains ('timebar_unit') )
                   {
                     var strNodeStartTime = objNode.getAttribute("time").substring(0, 5);

                     if ( strNodeStartTime == strFixedTimeFrom )
                     {
                       intTsFrom = parseInt ( objNode.getAttribute("ts") );
                     }

                     if ( strNodeStartTime == strFixedTimeTill )
                     {
                       // This is the Next Unit, while we need to have the previous END .. 
                       // Therefor we substract 1 node 

                       intTsTill = parseInt ( objNode.getAttribute("ts") - ( 60 * intTimeSteps ) );
                     }
                   }
                 }

                 // Now decide in what direction they selected the 2 units ..
                 if ( intTsTill < intTsFrom )
                 {
                   // Reverse the From & Till TimeStamps..

                   var intTmp                 = intTsFrom; 
                   intTsFrom                  = intTsTill;
                   intTsTill                  = intTmp;

                   // We should also ADD       1 unit from the start & 
                   //                SUBSTRACT 1 unit from the end 
                   // times because the order is reversed 

                   intTsFrom                  = parseInt(intTsFrom) + ( 60 * intTimeSteps );
                   intTsTill                  = parseInt(intTsTill) - ( 60 * intTimeSteps );
                 }

                 // Now we do it again and collect the Units we need to paint ..
                 for ( var y = 0; y < objBar.length ; y++ )
                 {
                   var objNode = objBar[y];

                   if ( objNode.classList.contains ('timebar_unit') )
                   {
                     var intNodeStartTimeStamp = parseInt( objNode.getAttribute("ts") );

                     if ( intNodeStartTimeStamp == intTsFrom )
                     {
                       blnWorking   = true;
                       strFirstTime = getTimeFromTimeStamp( intNodeStartTimeStamp );
                     }

                     if ( blnWorking )
                     {
                       if ( !objNode.classList.contains ('enabled') )
                       {
                         arrNodesPainted.push (objNode);

                         // Save the Last painted time ..
                         strLastTime = getTimeFromTimeStamp( intNodeStartTimeStamp + ( intTimeSteps * 60 ) );

                       }
                     }

                     if ( intNodeStartTimeStamp == intTsTill )
                     {
                       blnWorking = false;
                     }
                   }
                 }

                 // console.log ('TimeBar::Paint: Paint result says strFirstTime:' + strFirstTime + ', strLastTime:' + strLastTime);

                 if ( ( strFirstTime != '' ) && ( strLastTime != '' ) )
                 {
                   // rework the values for textual purposes ..
                   strFirstTime = getHourFromTime(strFirstTime,true) + ':' + getMinutesFromTime(strFirstTime);
                   strLastTime  = getHourFromTime(strLastTime,true) + ':' + getMinutesFromTime(strLastTime);

                   // Walk the painted nodes and set their new title 
                   for ( var y = 0; y < arrNodesPainted.length ; y++ )
                   {
                     var objNode   = arrNodesPainted[y];

                     objNode.classList.remove('enabled');
                     if ( strExtraEnabledClassName != '' )
                     {
                       objNode.classList.remove(strExtraEnabledClassName);
                     }

                     objNode.classList.add('enabled');
                     if ( strExtraEnabledClassName != '' )
                     {
                       objNode.classList.add(strExtraEnabledClassName);
                     }


                     // Set the moderated title 
                     objNode.title = getOption(this, 'strFrom') + ' ' + strFirstTime + 
                                     getOption(this, 'strHour') + ' ' + getOption(this, 'strTill') + ': ' + 
                                     strLastTime + getOption(this, 'strHour');

                     // Set TootltipX ('from 10:30h till 15:45h') 
                     // console.log ('tooltipping Div with id:' + objNode.id );
                     $( '#' + objNode.id ).tooltipX({ 
                       autoHide:true, 
                       autoShow:true, 
                     });

                   }

                   // Call: UpdateStorage in order to update our data in html
                   $('#' + this.attr("id") ).TimeBar( "UpdateStorage" );
                 }
                 else
                 {
                   console.log ('OOPS: either start / end time given is outside range ..');
                 }

               },
        UpdateStorage: function() 
                       {
                         // console.log ('TimeBar::UpdateStorage: Need to update our storage, some data probably has been painted / erased');

                         // Clear the storae area
                         $('#'+ this.attr("id") + '_storage').html('');

                         var strBegin                 = '';
                         var strHtml                  = '';
                         var strMyId                  = this.attr("id");
                         var objLastNode              = null;
                         var intPeriod                = 0;
                         var blnUsesAdditionalClasses = false;
                         var strLastClassUsed         = '';

                         // Do we need to take care of addiotional added classes as indicators for type of enabled ?
                         if ( getOption(this, 'strEnabledClassName') != '' )
                         {
                           blnUsesAdditionalClasses = true;
                         }


                         // Walk the Nodes 
                         var objBar = $('#'+ this.attr("id") ).children();
                         for ( var y = 0; y < objBar.length ; y++ )
                         {
                           var objNode = objBar[y];
                           // console.log ('TimeBar::UpdateStorage: Scrolling Nodes With CurrentId:' + objNode.id);

                           // Now we should apply the trick with the classes ..

                           if ( objNode.classList.contains ('timebar_unit') )
                           {
                             // Save the last node ..
                             objLastNode = objNode;

                             if ( objNode.classList.contains ('enabled') )
                             {
                               // console.log ('TimeBar::UpdateStorage: Found Enabled Unit:' + objNode.id );
                               if ( strBegin == '' )
                               {
                                 strBegin = objNode.getAttribute("ts");

                                 if ( blnUsesAdditionalClasses )
                                 {
                                   // Save: strLastClassUsed
                                   for ( var i = 0; i < objNode.classList.length ; i++ )
                                   {
                                     var strClassName = objNode.classList[i];
                                    // These are "ours" .. 'timebar_unit bar2_unit' hands off, any other WIPE em ..
                                    if ( ( strClassName.indexOf( 'timebar_unit') == -1 ) && 
                                         ( strClassName.indexOf( 'enabled') == -1 ) && 
                                         ( strClassName.indexOf( strMyId + '_') == -1 )
                                    )
                                    {
                                      strLastClassUsed = strClassName;
                                      break;
                                    }
                                   }
                                 }
                               }
                             }
                             else // Not Selected 
                             {
                               if (strBegin != '' )
                               {
                                 var strFrom   = getTimeFromTimeStamp(strBegin, true );
                                 var strTill   = getTimeFromTimeStamp(objNode.getAttribute("ts"), true );

                                 // console.log ('TimeBar::UpdateStorage: Start DUMP: from:' + strFrom + ', till:' + strTill );

                                 strHtml += '<input type="hidden" name="arrTimeBar[' + strMyId + ']['+ intPeriod +'][from]" value="' + strFrom + '">';
                                 strHtml += '<input type="hidden" name="arrTimeBar[' + strMyId + ']['+ intPeriod +'][till]" value="' + strTill + '">';

                                 if ( strLastClassUsed != "" )
                                 {
                                   strHtml += '<input type="hidden" name="arrTimeBar[' + strMyId + ']['+ intPeriod +'][type]" value="' + strLastClassUsed + '">';
                                 }

                                 strBegin = ''; // Reset
                                 intPeriod++;
                               }
                             }
                           }
                         }

                         // Fill the storae area
                         $('#'+ this.attr("id") + '_storage').html( strHtml );
                       },
        BuildTimeSelectBox: function( intTimeStampIn ) 
                            {
                              // console.log ('BuildTimeSelectBox::BuildUnits: with arg:' + intTimeStampIn );

                              var intTimeSteps           = getOption(this, 'intTimeSteps');
                              var objDT                  = new Date ( ( intTimeStampIn * 1000 ) );

                              // Add a possible timezone correction here ..
                              var DT_StartDateTime       = '01/01/1970 00:00:00';
                              var objStartDT             = new Date( DT_StartDateTime  );
                              var intInitialTS           = objStartDT.getTime();

                              if ( intInitialTS < 0 )
                              {
                                var intTimeZoneCorrection = intInitialTS;
                                objDT                     = new Date( objDT.getTime() + intTimeZoneCorrection  );
                              }
                              else if ( intInitialTS > 0 )
                              {
                                var intTimeZoneCorrection = intInitialTS;
                                objDT                     = new Date( objDT.getTime() - intTimeZoneCorrection  );
                              }


                              var intCurrentHour         = objDT.getHours();
                              var intCurrentMinutes      = objDT.getMinutes();

                              // console.log ('BuildTimeSelectBox: start with:' + intTimeStampIn + ' and intCurrentHour:' + intCurrentHour + ', intCurrentMinutes:' + intCurrentMinutes );

                              var strHours               = '<select class="select_hour">';
                              var strMinutes             = '<select class="select_minute">';

                              for ( var h = 0 ; h < 24 ; h++ )
                              {
                                var v = h;
                                if ( h < 10 )
                                {
                                  v = '0' + h;
                                }

                                // Within Range ?? => getOption(this, 'intTimeSteps');
                                if ( 1 )
                                {
                                  if ( h == intCurrentHour )
                                  {
                                    strHours += '<option SELECTED value=' + h + '>' + v + '</option>';
                                  }
                                  else
                                  {
                                    strHours += '<option value=' + h + '>' + v + '</option>';
                                  }
                                }
                              }

                              for ( var m = 0 ; m < 60 ; m += intTimeSteps )
                              {
                                var v = m;
                                if ( m < 10 )
                                {
                                  v = '0' + m;
                                }

                                // Within Range ?? => getOption(this, 'intTimeSteps');
                                if ( 1 )
                                {
                                  if ( m == parseInt( intCurrentMinutes / intTimeSteps ) * intTimeSteps )
                                  {
                                    strMinutes += '<option SELECTED value=' + m + '>' + v + '</option>';
                                  }
                                  else
                                  {
                                    strMinutes += '<option value=' + m + '>' + v + '</option>';
                                  }
                                }
                              }

                              strHours   += '</select>';
                              strMinutes += '</select>';

                              return strHours + '&nbsp;:&nbsp;' + strMinutes;
                            },

        DecreaseTime: function( objSelectHours, objSelectMinutes ) 
                      {
                        // console.log ('TimeBar::IncreaseTime: Need to Increase time with Selected Hours: ' + objSelectHours.value + ', Minutes:' + objSelectMinutes.value );

                        // Save em so we can set it back if less then min is reached ..
                        var intCurrHourIndex  = objSelectHours.selectedIndex;
                        var intCurrMinuteIndx = objSelectMinutes.selectedIndex;

                        if ( objSelectMinutes.selectedIndex >= 1 )
                        {
                          objSelectMinutes.selectedIndex = ( objSelectMinutes.selectedIndex -1);
                        }
                        else
                        {
                          objSelectMinutes.selectedIndex = ( objSelectMinutes.length -1 );

                          // console.log ('Decreasing HOURS as a result from Minutes');

                          // Also do something with the Hours ..
                          objSelectHours.selectedIndex = ( objSelectHours.selectedIndex -1);
                        }

                        if ( objSelectHours.selectedIndex == -1 )
                        {
                          // console.log ('Minimum reached !');
                          objSelectHours.selectedIndex   = intCurrHourIndex;
                          objSelectMinutes.selectedIndex = intCurrMinuteIndx;
                          return;
                        }

                      },
        IncreaseTime: function( objSelectHours, objSelectMinutes ) 
                      {
                        // console.log ('TimeBar::IncreaseTime: Need to Increase time with Selected Hours: ' + objSelectHours.value + ', Minutes:' + objSelectMinutes.value );

                        // Save em so we can set it back if more then max is reached ..
                        var intCurrHourIndex  = objSelectHours.selectedIndex;
                        var intCurrMinuteIndx = objSelectMinutes.selectedIndex;

                        if ( objSelectMinutes.selectedIndex < ( objSelectMinutes.length -1) )
                        {
                          objSelectMinutes.selectedIndex = ( objSelectMinutes.selectedIndex +1);
                        }
                        else
                        {
                          objSelectMinutes.selectedIndex = 0;

                          // Also do something with the Hours ..
                          objSelectHours.selectedIndex = ( objSelectHours.selectedIndex +1);
                        }

                        if ( objSelectHours.selectedIndex == -1 )
                        {
                          // console.log ('Maximum reached !');
                          objSelectHours.selectedIndex   = intCurrHourIndex;
                          objSelectMinutes.selectedIndex = intCurrMinuteIndx;
                          return;
                        }
                      },
        strEnabledClassName: function( strNewValue ) 
                             {
                               if ( typeof strNewValue !== "undefined" )
                               {
                                 // console.log ('TimeBar::strEnabledClassName: Set:' + strNewValue );
                                 setOption(this, 'strEnabledClassName',strNewValue );
                               }
                               else
                               {
                                 // console.log ('TimeBar::strEnabledClassName: Get:' + getOption(this, 'strEnabledClassName') );
                                 return getOption(this, 'strEnabledClassName');
                               }
                             },
    };

    $.fn.TimeBar = function(methodOrOptions) 
    {
      if ( methods[methodOrOptions] ) 
      {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } 
      else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) 
      {
        // Default to "init"
        return methods.init.apply( this, arguments );
      } 
      else 
      {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.TimeBar' );
      }    
    };

  })( jQuery );
}
