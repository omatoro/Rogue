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
		},

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

			return damage;
		},

		getExp: function () {
			// hpが0になったら死亡
			if (this.hp <= 0) {
				this.remove();
				return this.exp;
			}
			
			return 0;
		},

		isHit: function (point, radius) {
			// console.log(this.radius);
		},

		update: function (app) {
			this.directAnimation(app);
		}
	});

})(game);