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
            this.fromJSON(UI_DATA.LABELS);

            // コントローラーパッド
            var pad = tm.controller.Pad();
            pad.position.set(80, ns.SCREEN_HEIGHT - 80);
            this.addChild(pad);

            // マップ
            this.map = ns.Map();
            this.map.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            this.addChild(this.map);

            // プレイヤー
            this.player = ns.Player(pad);
            this.player.position.set(ns.SCREEN_WIDTH/2, ns.SCREEN_HEIGHT/2);
            this.addChild(this.player);
        },

        update : function() {
        }
    });

})(game);