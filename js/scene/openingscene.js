/**
 * オープニング画面
 */
(function(ns) {

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "statusLevel",
                x: 40,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 35,
                align: "left"
            },{
                type: "Label",
                name: "statusHP",
                x: 160,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 35,
                align: "left"
            },{
                type: "Label",
                name: "statusMP",
                x: 380,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: " ",
                fontSize: 35,
                align: "left"
            }]
        }
    };

    ns.OpeningScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(backnum, speed, speedName, questnum) {
            this.superInit();

            // コントローラーパッド
            var pad = tm.controller.Pad();
            pad.position.set(80, ns.SCREEN_HEIGHT - 80);

            // マップ
            this.map = ns.Map(pad);
            var safePosition = this.map.getRandomSafeMapChipPosition(); // マップの左上を0,0とする
            // マップの中心を0,0とするように変更
            var position = {x:0, y:0};
            position.x = this.map.width/2  + ns.SCREEN_WIDTH/2  - safePosition.x;
            position.y = this.map.height/2 + ns.SCREEN_HEIGHT/2 - safePosition.y;
            this.map.initMapPosition(position);
            this.addChild(this.map);
            this.addChild(pad);

            // プレイヤー
            this.player = ns.Player(pad);
            this.player.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            this.addChild(this.player);

            var ss = tm.app.SpriteSheet({
                image: "slash",
                frame: {
                    width: 65,
                    height: 65,
                    count: 8
                },
                animations: {
                    "slash": [0, 8]
                }
            });
            this.slash = tm.app.AnimationSprite(120, 120, ss);
            this.slash.position.set(ns.SCREEN_WIDTH/2 + 10, ns.SCREEN_HEIGHT/2 + 10);
            this.addChild(this.slash);

            // ステータス表示
            this.fromJSON(UI_DATA.LABELS);
            this.statusLevel.text = "Lv." + this.player.getLevel();
            this.statusHP.text    = "HP " + this.player.getCurrentHP() + "/" + this.player.getMaxHP();
            this.statusMP.text    = "MP " + this.player.getCurrentMP() + "/" + this.player.getMaxMP();
        },

        update : function(app) {
            if (app.pointing.getPointingEnd()) {
                this.slash.gotoAndPlay("slash");

                // ダメージ数を計算
                var attack = Math.rand(1, 100);
                var damage = this.player.damage(attack);

                // ダメージ数を表示
                var damageEffect = ns.DamagedNumber(damage);
                damageEffect.effectPositionSet(ns.SCREEN_WIDTH/2 + 10, ns.SCREEN_HEIGHT/2 + 10);
                this.addChild(damageEffect);


            }

            this.statusLevel.text = "Lv." + this.player.getLevel();
            this.statusHP.text    = "HP " + this.player.getCurrentHP() + "/" + this.player.getMaxHP();
            this.statusMP.text    = "MP " + this.player.getCurrentMP() + "/" + this.player.getMaxMP();
        }
    });

})(game);