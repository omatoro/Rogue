/**
 * Enemy
 */
(function(ns) {

	ns.Enemy = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function () {
			this.superInit("enemy1", {
				width:  180/6,
				height: 112/4,
				count:  24,
			}, 3);
			// プレイヤーなので操作を受け付けるように設定
			this.isInput = false;
			this.isAuto  = true;

			this.level = 1;

			this.maxhp = 40;
			this.hp = 40;
			this.maxmp = 40;
			this.mp = 40;

			this._str = 40; // 攻撃力
			this._def = 40; // 防御力
			// this._int = 40; // 魔力
			this._agi = 40; // 素早さ
			this._luk = 40; // 運
			this._vit = 40; // 体力
			this._dex = 40; // 器用さ

			this.speed = 4;
			this.velocity = tm.geom.Vector2(0, 0);
		},

		getLevel: function () { return this.level; },
		getMaxHP: function () { return this.maxhp; },
		getCurrentHP: function () { return this.hp; },
		getMaxMP: function () { return this.maxmp; },
		getCurrentMP: function () { return this.mp; },

		getAttackPoint: function (attack) {
			// 攻撃力を計算
			var attackpoint = (this._str + this._dex/5 + this._luk/3)|0;
		},

		damage: function (attack) {
			var damage = (attack - this._def) |0;
			damage = (damage < 0) ? 0 : damage;

			this.hp -= damage;
			this.hp = (this.hp < 0) ? 0 : this.hp;

			// hpが0になったら死亡

			return damage;
		},

		isHit: function (point, radius) {
			console.log(this.radius);
		},

		update: function (app) {
			this.directAnimation(app);
		}
	});

})(game);