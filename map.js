/**
 * Map
 */
(function(ns) {

	ns.Map = tm.createClass({
		superClass : tm.app.Sprite,

		init: function () {
			this.superInit(ns.MAP_WIDTH, ns.MAP_HEIGHT, IMAGES["map"]["image"]);
		},

		update: function () {
			
		}

	});

})(game);