/**
 * Golem2
 */
(function(ns) {

	ns.Golem2 = tm.createClass({
		superClass : ns.Enemy,

		init: function () {
			this.superInit("Golem2", {
				width:  180/6,
				height: 112/4,
				count:  24,
			}, 3);

			this.maxhp = 5;
			this.hp    = 5;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 1; // 攻撃力
			this._def  = 0; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 1; // 倒した時の経験値

			this.speed = 4;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemNum: 0,
					random: 2
				}
			];
		}
	});

})(game);