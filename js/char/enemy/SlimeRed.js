/**
 * SlimeRed
 */
(function(ns) {

	ns.SlimeRed = tm.createClass({
		superClass : ns.Enemy,

		init: function (player, map) {
			this.superInit("SlimeRed", {
				width:  96/6,
				height: 80/4,
				count:  24,
			}, 3, player, map);

			this.maxhp = 180;
			this.hp    = 180;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 23; // 攻撃力
			this._def  = 29; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 12; // 倒した時の経験値

			this.speed = 10;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemName: "モンスターの液体",
					random: 3
				},{
					itemName: "ポーション",
					random: 9
				}
			];
		}
	});

})(game);