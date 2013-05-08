/**
 * ItemList
 */
(function(ns) {

	var ITEM_LIST = {
		item: [
			{
				name: "ダガー",
				type: "shortsword",
				summary: "諸刃の短刀。",
				dropImage: "dropWeapon",
				status: {
					str: 2,
					def: 0,
					agi: 0,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "ボウイナイフ",
				type: "shortsword",
				summary: "片刃の短刀。多目的に使用するナイフ。",
				dropImage: "dropWeapon",
				status: {
					str: 1,
					def: 0,
					agi: 0,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "ジャンビーヤ",
				type: "shortsword",
				summary: "刀身が湾曲しており、刀身の幅が広い。",
				dropImage: "dropWeapon",
				status: {
					str: 1,
					def: 0,
					agi: 1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			}
		]
	};

	ns.ItemList = tm.createClass({
		superClass : ns.AnimationCharactor,

		init: function () {
			this.superInit("enemy1", {
				width:  180/6,
				height: 112/4,
				count:  24,
			}, 3);

			this.speed = 4;
			this.velocity = tm.geom.Vector2(0, 0);

			// アイテムデータ
			this.fromJSON(ITEM_LIST);
		},

		isHit: function (point, radius) {
			// console.log(this.radius);
		},

		get: function (item) {
			if (item !== null) {
				return this.item[item];
			}
			return null;
		},

		update: function (app) {
			this.directAnimation(app);
		}
	});

})(game);