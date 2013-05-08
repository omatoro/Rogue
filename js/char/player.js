/**
 * Player
 */
(function(ns) {

	ns.Player = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function (pad) {
			this.name = "player";
			this.superInit("player");
			// プレイヤーなので操作を受け付けるように設定
			this.setInputPad(pad);
			this.isInput = true;

			// ダメージ= [[[最終ATK * スキル倍率 ] * (4000 + 除算Def) / (4000 + 除算DEF * 10)] * 種族耐性] - 減算DEF

			this.level = 1;

			this.maxhp = 30;
			this.hp    = 30;
			this.maxmp = 10;
			this.mp    = 10;

			this._str = 1; // 攻撃力
			this._def = 1; // 防御力
			// this._int = 40; // 魔力
			this._agi = 1; // 素早さ
			this._luk = 1; // 運
			this._vit = 1; // 体力
			this._dex = 1; // 器用さ

			this.exp = 0; // 取得経験値
			this.nextLevelExp = 3;

			this.item = [];
		},

		getLevel: function () { return this.level; },
		getMaxHP: function () { return this.maxhp; },
		getCurrentHP: function () { return this.hp; },
		getMaxMP: function () { return this.maxmp; },
		getCurrentMP: function () { return this.mp; },
		getSTR: function () { return this._str; },
		getDEF: function () { return this._def; },
		getAGI: function () { return this._agi; },
		getLUK: function () { return this._luk; },
		getVIT: function () { return this._vit; },
		getDEX: function () { return this._dex; },
		getEXP: function () { return this.exp; },
		getNextLevel: function () { return this.nextLevelExp; },

		levelUp: function () {
			// パラメータ上昇
			this.maxhp += Math.rand(0, 10);
			this.maxmp += Math.rand(0, 5);
			this._str  += Math.rand(0, 2); // 攻撃力
			this._def  += Math.rand(0, 2); // 防御力
			// this._int = 40; // 魔力
			this._agi  += Math.rand(0, 2); // 素早さ
			this._luk  += Math.rand(0, 2); // 運
			this._vit  += Math.rand(0, 2); // 体力
			this._dex  += Math.rand(0, 2); // 器用さ
		},

		addExp: function (exp) {
			this.exp += exp;
			if (this.exp >= this.nextLevelExp) {
				++this.level;
				this.nextLevelExp = Math.ceil(this.nextLevelExp * 1.8);
				this.levelUp();
				this.addExp(0);
			}
		},

		addItem: function (item) {
			this.item.push(item);
		},

		getItem: function () {
			return this.item;
		},

		getAttackPoint: function (attack) {
			// 攻撃力を計算
			var random = Math.rand(9, 11) / 10;
			var attackpoint = ((this._str + this._dex/5 + this._luk/3) * random)|0;
			return attackpoint;
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
			// console.log("attack");
			return this.angle;
		},

		update: function (app) {
			this.inputAnimation(app);
		}
	});

})(game);