/**
 * Player
 */
(function(ns) {

	ns.Player = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function (pad) {
			this.superInit("player");
			// プレイヤーなので操作を受け付けるように設定
			this.setInputPad(pad);
			this.isInput = true;

			// ダメージ= [[[最終ATK * スキル倍率 ] * (4000 + 除算Def) / (4000 + 除算DEF * 10)] * 種族耐性] - 減算DEF

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

		attack: function () {
			console.log("attack");
			return this.angle;
		},

		update: function (app) {
			this.inputAnimation(app);
		}
	});

})(game);