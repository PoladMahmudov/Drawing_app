Template.wall.onRendered(function(){
  $('.color-picker').colorpicker();

  canvas = new Canvas();

  Deps.autorun( function() {  
    var line = points.find({style:"line"}).fetch();
    var circle = points.find({style:"circle"}).fetch();
    var rect = points.find({style:"rect"}).fetch();
    var sum = line.length + circle.length + rect.length;

    if (canvas) {
      canvas.drawLine(line,sum);
      canvas.drawCircle(circle,sum);
      canvas.drawRect(rect,sum);
    }

});
        
})


////////////////////////////////////////////////////////////////////////////////
//////////////////
//////////////////    MAIN JS
//////////////////
////////////////////////////////////////////////////////////////////////////////

points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=3;
var strokeColor = "black";
var style = "line";

/*Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun( function() {
    var line = points.find({style:"line"}).fetch();
    var circle = points.find({style:"circle"}).fetch();
    var rect = points.find({style:"rec"}).fetch();
    
    var sum = line.length + circle.length + rect.length;

    if (canvas) {
      canvas.drawLine(line,sum);
      canvas.drawCircle(circle,sum);
      canvas.drawRect(rect,sum);
    }

  });

});*/

Template.wall.events({

  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },


  "click button.js-rec": function (event) {
    style = "rect";
  },
  "click button.js-circle": function (event) {
    style = "circle";
  },
  "click button.js-line": function (event) {
    style = "line";
  },
  //choose a color. Initialise the last vals, otherwise a stray line will appear.

  

  "submit .demo_form": function(event){
      event.preventDefault();

      strokeColor = event.target.color.value;

      console.log(strokeColor);
      return false;
    },

  "click #js-save":function(event){
    var project = points.find().fetch();
    gallery.insert({
      title:"new file",
      project:project,
      author:Meteor.user(),
      date:new Date(),
    });
  },

  "click button.js-brush":function(){
    strokeColor="white";
  },

  "submit #sliderNum":function(event){
    event.preventDefault();
   thickness = $('#points').val();
   console.log(thickness);
  }



})


var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      points.insert({
        //this draws a point exactly where you click the mouse
      // x: (event.pageX - offset.left),
      // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
      // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
      // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,
        // We could calculate the line thickness from the distance
        // between current position and last position
        //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,
        // We can also use strokeColor, defined by a selection
        c: strokeColor,
        style: style,
        r: thickness,
        width:thickness,
        height:thickness,


      }); // end of points.insert()

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});


Template.gallery.helpers({
  titles: gallery.find({})
})

Template.header.helpers({
  titles: function(){
    var data = gallery.find({});
    if(!data){
      return "no files...";
    }
    return data;
  }
})


Accounts.ui.config({
  passwordSignupFields:'USERNAME_AND_EMAIL'
})
