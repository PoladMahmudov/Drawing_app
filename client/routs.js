Router.configure({
	layoutTemplate:'layout'
});

Router.route('/', function(){
	this.render('wall');
});

/*Router.route('/gallery/:_id', function(){
	var id = this.params._id;
	Session.set('id',id);
	console.log(Session.get('id'));
	this.render('gallery');
});*/


Router.route('/gallery/:_id', {name: 'gallery', controller: 'PostController'});

PostController = RouteController.extend({
  action: function () {
    // set the reactive state variable "postId" with a value
    // of the id from our url
    
   /* var db = gallery.findOne({_id:this.params._id});
	var array = db['project'];
	this.state.set('project', array);*/
    this.state.set('postId', this.params._id);
    var objects = gallery.find();
    objects.forEach(function(obj){
    	var id =obj._id;
    	$("#"+id).removeClass("active");
    });
    $("#"+this.params._id).addClass("active");
    this.render();
  }
});



Template.canvas2.helpers({
		inform:function(){
			var controller = Iron.controller();
		    // reactively return the value of postId
		    var postId = controller.state.get('postId');

		   canvas2 = new Canvas2();
		   canvas2.clear();
  			Deps.autorun( function() { 
  			  	var db = gallery.findOne({_id:postId});
			  	var array = db['project'];
			   var line = array.filter(Linesort);
			    var circle = array.filter(Circlesort);
			    var rect = array.filter(Rectsort);
			    var sum = line.length + circle.length + rect.length;

			    if (canvas2) {
			      canvas2.drawLine(line,sum);
			      canvas2.drawCircle(circle,sum);
			      canvas2.drawRect(rect,sum);
			    }

			});

			var data = gallery.findOne({_id:postId});
			return data;
	},
})

Template.canvas2.onRendered(function(){
  canvas2 = new Canvas2();
  //canvas2.clear();
  Deps.autorun( function() {  

  	var controller = Iron.controller();
		    // reactively return the value of postId
    var postId = controller.state.get('postId');

  	var db = gallery.findOne({_id:postId});
  	console.log(db);
  	var array = db['project'];
  	//var array = controller.state.get('project');
  	
    var line = array.filter(Linesort);
    var circle = array.filter(Circlesort);
    var rect = array.filter(Rectsort);
    var sum = line.length + circle.length + rect.length;

    if (canvas2) {
      canvas2.drawLine(line,sum);
      canvas2.drawCircle(circle,sum);
      canvas2.drawRect(rect,sum);
    }

});
        
})

function Linesort(obj){
	if(obj['style'] === 'line'){
		return true;
	}
	return false;
}

function Circlesort(obj){
	if(obj['style'] === 'circle'){
		return true;
	}
	return false;
}

function Rectsort(obj){
	if(obj['style'] === 'rect'){
		return true;
	}
	return false;
}