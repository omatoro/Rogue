/**
 * Enemy
 */
(function(ns) {

	ns.Enemy = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function (image, imageData, drawImageScaleSize, player) {
			this.superInit(image, imageData, drawImageScaleSize);
			// プレイヤーなので操作を受け付けるように設定
			this.isInput = false;
			this.isAuto  = true;

			this.maxhp = 0;
			this.hp    = 0;
			this.maxmp = 0;
			this.mp    = 0;

			this._str  = 0; // 攻撃力
			this._def  = 0; // 防御力
			// this._int = 1; // 魔力
			this._agi  = 0; // 素早さ
			this._luk  = 0; // 運
			this._vit  = 0; // 体力
			this._dex  = 0; // 器用さ

			this.exp = 0; // 倒した時の経験値

			this.speed = 0;
			this.velocity = tm.geom.Vector2(0, 0);

			this.dropItemList = [
				{
					itemNum: 0,
					random: 2
				}
			];

			this.player = player;
			this.lengthToPlayer = 0;
			this.lengthToAttack = 0; // 攻撃を開始する距離
			this.lengthToActive = 0; // プレイヤーを察知して近づき始める距離 
			this.lengthToSense = 0;  // 察知して動き始める距離
			this.modeActive = 0;     // 攻撃をし続けるモード(攻撃を受けたら切り替わる)
			this.modeSafe   = 0;     // 攻撃をせずに行動するモード
		},

		getMaxHP:     function () { return this.maxhp; },
		getCurrentHP: function () { return this.hp; },
		getMaxMP:     function () { return this.maxmp; },
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
				return this.exp;
			}
			return 0;
		},

		getDropItem: function () {
			// hpが0になったら死亡
			if (this.hp <= 0) {
				this.remove();
				for (var i = 0; i < this.dropItemList.length; ++i) {
					if (Math.rand(0, this.dropItemList[i].random) === 0) {
						return this.dropItemList[i].itemNum;
					}
				}
			}
			return null;
		},

		isHit: function (point, radius) {
			// console.log(this.radius);
		},

		update: function (app) {
            // ランダム移動
            if (this.isAuto) {
                // フレームに合わせて移動する
                if (app.frame % 10 === 0 && Math.rand(0, 10) === 0) {
                    var angle = Math.rand(0, 359);
                }
                if (angle && this.isAnimation) {
                    this.velocity.setDegree(angle, 1);
                    this.velocity.x *= -1;
                    this.speed = 4;
                    // 移動方向に対して体を向けてアニメーションする
                    this.directWatch(angle);
                }
                else {
                    //this.paused = true;
                }
                // this.position.add(tm.geom.Vector2.mul(this.velocity, this.speed));
                // console.log("x : " + this.x + " y : " + this.y);
            }
		}
	});

})(game);