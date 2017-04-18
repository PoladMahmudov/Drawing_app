points = new Meteor.Collection('pointsCollection');

Meteor.methods({
	clear:function(){
		points.remove({});
	}
});


points.allow({
	insert:function(){
		return true;
	},
	remove:function(){
		return true;
	},
	update:function(){
		return true;
	}
});


gallery.allow({
	insert:function(userId, doc){
		if(userId){
			return true;
		}
	},
	remove:function(userId,doc){
		if (userId === doc.author) {
			return true;
		}
	},
	update:function(userId,doc){
		if (userId === doc.author) {
			return true;
		}
	},
})