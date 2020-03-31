kWidget.embed({
  'targetId': 'kalturaPlayer',
  'wid': '_1038472',
  'uiconf_id' : '33084471',
  'entry_id' : '1_9tp4soob',
  'flashvars':{ // flashvars allows you to set runtime uiVar configuration overrides.
    'autoPlay': false
  },
  'params':{ // params allows you to set flash embed params such as wmode, allowFullScreen etc
    'wmode': 'transparent'
  }
});

kWidget.addReadyCallback( function( playerId ){
  var kdp = document.getElementById( playerId );
  console.log(kdp);
  $('#sampleActions .btn').click(function(){
    kdp.sendNotification( $(this).text() );
  });
});