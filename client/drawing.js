Canvas = function () {
  var self = this;
  var svg;

  var createSvg = function() {
    svg = d3.select('#canvas').append('svg')
      .attr('width', 700)
      .attr('height',500);
  };
  createSvg();

  self.clear = function() {
    d3.select('svg').remove();
    createSvg();
  };

  self.drawLine = function(line,sum) {
    
    if (sum<1) {
      self.clear();
      return;
    }
    if (svg) {
      

          // Remember to format the data properly in markPoints
        //to draw a line
        svg.selectAll('line').data(line, function(d) { return d._id; })
        .enter().append('line')
        .attr('x1', function (d) { return d.x; })
        .attr('y1', function (d) { return d.y; })
        .attr('x2', function (d) { return d.x1; })
        .attr('y2', function (d) { return d.y1; })
        .attr("stroke-width", function (d) { return d.w; })
        .attr("stroke", function (d) { return d.c; })
        .attr("stroke-linejoin", "round");



    } // end of the if(svg) statement
  };// end of the canvas.draw function

  self.drawCircle = function(circle,sum) {
    if (sum<1) {
      self.clear();
      return;
    }
    if (svg) {

        //to draw a circle      
        svg.selectAll('circle').data(circle, function(d) { return d._id; })
        .enter().append('circle')
        .attr('r', function (d) { return d.r; })
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return d.c; });

    }

  };// end of the canvas.drawCircle function

  self.drawRect = function(rect,sum) {
    if (sum<1) {
      self.clear();
      return;
    }
    if (svg) {

        svg.selectAll('rect').data(rect, function(d) { return d._id; })
        .enter().append('rect')
        .attr('width', function (d) { return d.width; })
        .attr('height', function (d) { return d.height; })
        .attr('fill', function (d) { return d.c; })
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; });
    }

  };// end of the canvas.draw function

}//end of the canvas function


Canvas2 = function () {
  var self = this;
  var svg;

  var createSvg = function() {
    svg = d3.select('#canvas2').append('svg')
      .attr('width', 700)
      .attr('height',500);
  };
  createSvg();


  self.clear = function() {
    d3.select('svg').remove();
  };


  self.drawLine = function(line,sum) {
    
    if (sum<1) {
      self.clear();
      return;
    }
    if (svg) {
      

          // Remember to format the data properly in markPoints
        //to draw a line
        svg.selectAll('line').data(line, function(d) { return d._id; })
        .enter().append('line')
        .attr('x1', function (d) { return d.x; })
        .attr('y1', function (d) { return d.y; })
        .attr('x2', function (d) { return d.x1; })
        .attr('y2', function (d) { return d.y1; })
        .attr("stroke-width", function (d) { return d.w; })
        .attr("stroke", function (d) { return d.c; })
        .attr("stroke-linejoin", "round");



    } // end of the if(svg) statement
  };// end of the canvas.draw function

  self.drawCircle = function(circle,sum) {
    if (sum<1) {
      self.clear();
      return;
    }
    if (svg) {

        //to draw a circle      
        svg.selectAll('circle').data(circle, function(d) { return d._id; })
        .enter().append('circle')
        .attr('r', function (d) { return d.r; })
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('fill', function (d) { return d.c; });

    }

  };// end of the canvas.drawCircle function

  self.drawRect = function(rect,sum) {
    if (sum<1) {
      self.clear();
      return;
    }
    if (svg) {

        svg.selectAll('rect').data(rect, function(d) { return d._id; })
        .enter().append('rect')
        .attr('width', function (d) { return d.width; })
        .attr('height', function (d) { return d.height; })
        .attr('fill', function (d) { return d.c; })
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; });
    }

  };// end of the canvas.draw function

}//end of the canvas function
