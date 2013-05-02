/**
 * オープニング画面
 */
(function(ns) {

    // ラベルのリスト
    var UI_DATA = {
        LABELS: {
            children: [{
                type: "Label",
                name: "setting_backnum",
                x: 40,
                y: 80,
                width: ns.SCREEN_WIDTH,
                fillStyle: "white",
                text: "バック数",
                fontSize: 30,
                align: "left"
            }]
        }
    };

    ns.OpeningScene = tm.createClass({
        superClass : tm.app.Scene,

        init : function(backnum, speed, speedName, questnum) {
            this.superInit();

            // ラベル表示
            //this.fromJSON(UI_DATA.LABELS);

            // コントローラーパッド
            var pad = tm.controller.Pad();
            pad.position.set(80, ns.SCREEN_HEIGHT - 80);

            // マップ
            this.map = ns.Map(pad, {x:ns.SCREEN_WIDTH/2, y:ns.SCREEN_HEIGHT/2});
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
        },

        update : function(app) {
            if (app.pointing.getPointingEnd()) {
                this.slash.gotoAndPlay("slash");

                // ダメージ数を表示
                var damaged = ns.DamagedNumber(Math.rand(1, 9999));
                damaged.effectPositionSet(ns.SCREEN_WIDTH/2 + 10, ns.SCREEN_HEIGHT/2 + 10);
                this.addChild(damaged);
            }
        }
    });

})(game);