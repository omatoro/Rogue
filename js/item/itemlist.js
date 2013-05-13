/**
 * ItemList
 */
(function(ns) {

	var ITEM_LIST = {
		item: [
			// 短剣
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
				name: "ナイフ",
				type: "shortsword",
				summary: "片刃の短刀。多目的に使用する。",
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
			},

			// 長剣
			// 大剣two hand sword
			// 槍
			// 戦斧
			// 槌
			// 
			// 盾
			// 大盾

			// 服 cloths
			{
				name: "布の服",
				type: "cloths",
				summary: "布でできた服。生地は薄い。",
				dropImage: "dropWeapon",
				status: {
					str: 0,
					def: 1,
					agi: 0,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},
			// ローブ
			// 軽鎧 lightarmor スケイルアーマー(鱗状)、ラメラーアーマー(薄板を繋ぎ合わせる)、チェーンメイル、含む
			{
				name: "布の鎧",
				type: "lightarmor",
				summary: "布を厚く縫い込んだ軽鎧。",
				dropImage: "dropWeapon",
				status: {
					str: 0,
					def: 3,
					agi: -1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},{
				name: "革の鎧",
				type: "lightarmor",
				summary: "動物の革を縫い込んだ軽鎧。",
				dropImage: "dropWeapon",
				status: {
					str: 0,
					def: 5,
					agi: -1,
					luk: 0,
					vit: 0,
					dex: 0
				}
			},
			// 重鎧 heavyarmor
		]
	};

	ns.ItemList = tm.createClass({
		superClass : tm.app.CanvasElement,

		init: function () {
			this.superInit();
			// アイテムデータ
			this.fromJSON(ITEM_LIST);
		},

		get: function (item) {
			if (item !== null) {
				return this.item[item];
			}
			return null;
		}
	});

})(game);