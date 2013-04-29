/**
 * Player
 */
(function(ns) {

	ns.Player = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function (pad) {
			this.superInit("player", pad);
		}

	});

})(game);